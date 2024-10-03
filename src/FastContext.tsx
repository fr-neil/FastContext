import React, {
    createContext,
    useContext,
    useRef,
    useCallback,
    useSyncExternalStore,
} from 'react';
import './Form-context.css';

type Store = { first: string; last: string };

function useStoreData(): {
    get: () => Store;
    set: (value: Partial<Store>) => void;
    subscribe: (callback: () => void) => () => void;
} {
    const store = useRef({
        first: '',
        last: '',
    });

    const get = useCallback(() => store.current, []);

    const subscribers = useRef(new Set<() => void>());

    const set = useCallback((value: Partial<Store>) => {
        store.current = { ...store.current, ...value };
        subscribers.current.forEach((callback) => callback());
    }, []);
    const subscribe = useCallback((callback: () => void) => {
        subscribers.current.add(callback);
        return () => {
            subscribers.current.delete(callback);
        };
    }, []);

    return {
        get,
        set,
        subscribe,
    };
}

type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

export const StoreContext = createContext<UseStoreDataReturnType | null>(null);

export const Provider = ({ children }) => {
    return (
        <StoreContext.Provider value={useStoreData()}>
            {children}
        </StoreContext.Provider>
    );
};

function useStore<SelectorOutput>(
    selector: (store: Store) => SelectorOutput,
): [SelectorOutput, (value: Partial<Store>) => void] {
    const store = useContext(StoreContext);
    if (!store) {
        throw new Error('Store not found');
    }

    const state = useSyncExternalStore(store.subscribe, () =>
        selector(store.get()),
    );

    return [state, store.set];
}

export const TextInput = ({ value }) => {
    const [fieldValue, setStore] = useStore((store) => store[value]);

    return (
        <div className='field'>
            {value}: {''}{' '}
            <input
                value={fieldValue}
                onChange={(e) => setStore({ [value]: e.target.value })}
            />
        </div>
    );
};

export const Display = ({ value }) => {
    const [fieldValue] = useStore((store) => store[value]);

    return (
        <div className='field'>
            {value}: {fieldValue}
        </div>
    );
};

export const FormContainer = () => {
    return (
        <div className='container'>
            <h5>Form Container</h5>
            <TextInput value='first' />
            <TextInput value='last' />
        </div>
    );
};

export const DisplayContainer = () => {
    return (
        <div className='container'>
            <h5>Display Container</h5>
            <Display value='first' />
            <Display value='last' />
        </div>
    );
};

export const ContentContainer = () => {
    return (
        <div className='container'>
            <h5>Content Container</h5>
            <FormContainer />
            <DisplayContainer />
        </div>
    );
};

const FastContext = () => {
    return (
        <Provider>
            <div className='container'>
                <h5>FastContext</h5>
                <ContentContainer />
            </div>
        </Provider>
    );
};

export default FastContext;
