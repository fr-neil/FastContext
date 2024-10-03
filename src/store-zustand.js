// Zustand Store(stores)
import { create } from 'zustand'
import { useState, createContext, useContext, useMemo, useCallback } from 'react'

// const useStore = create(set => ({
//     user: null,
//     cartCount: 0,
//     loggedIn: false,
//     login: () => set(() => ({ user: 'Neil', cartCount: 0, loggedIn: true })),
//     logout: () => set(() => ({ user: null, cartCount: 0, loggedIn: false })),
//     addToCart: (loggedIn) => set(state =>
//         loggedIn
//             ? { cartCount: state.cartCount + 1, loggedIn: true }
//             : { cartCount: state.cartCount, loggedIn: false }),
// }))

// This is good, but when we want to migrate from zustand to some other state management library, we have to change all the components that use the store. Hence creating a facade for the store is a good idea.
// 1> A facade layer helps abstract the details of the Zustand store from the components. It encapsulates the store's implementation, making it easier to change the underlying state management without affecting the components.
// 2> The facade layer separates the state management logic from the UI components, adhering to the principle of separation of concerns.

// export const useLogin = () => useStore(state => state.login)
// export const useLogout = () => useStore(state => state.logout)
// export const useUser = () => useStore(state => state.user)
// export const useCartCount = () => useStore(state => state.cartCount)
// export const useLoggedIn = () => useStore(state => state.loggedIn)
// export const useAddToCart = () => useStore(state => state.addToCart)


// Replacing zustand with context API 

// const useStore = () => {
//     const [user, setUser] = useState(null);
//     const [cartCount, setCartCount] = useState(0);
//     const [loggedIn, setLoggedIn] = useState(false);

//     return ({
//         user,
//         cartCount,
//         loggedIn,
//         login: () => {
//             setUser('Neil');
//             setCartCount(0);
//             setLoggedIn(true);
//         },
//         logout: () => {
//             setUser(null);
//             setCartCount(0);
//             setLoggedIn(false);
//         },
//         addToCart: (loggedIn) => {
//             if (loggedIn) {
//                 setCartCount(prev => prev + 1);
//                 setLoggedIn(true);
//             } else {
//                 setCartCount(prev => prev);
//                 setLoggedIn(false);
//             }
//         },
//     })

// }

// const StoreContext = createContext(null);

// export const StoreContextProvider = ({ children }) => {
//     return (
//         <StoreContext.Provider value={useStore()}>
//             {children}
//         </StoreContext.Provider>
//     )
// }

// export const useLogin = () => useContext(StoreContext().login)
// export const useLogout = () => useContext(StoreContext().logout)
// export const useUser = () => useContext(StoreContext().user)
// export const useCartCount = () => useContext(StoreContext().cartCount)
// export const useLoggedIn = () => useContext(StoreContext().loggedIn)
// export const useAddToCart = () => useContext(StoreContext().addToCart)




// Optimized version of the above code using callback and memo

const StoreContext = createContext(null);

const useStore = () => {
    const [user, setUser] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [loggedIn, setLoggedIn] = useState(false);

    const login = useCallback(() => {
        setUser('Neil');
        setCartCount(0);
        setLoggedIn(true);
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setCartCount(0);
        setLoggedIn(false);
    }, []);

    const addToCart = useCallback((loggedIn) => {
        if (loggedIn) {
            setCartCount(prev => prev + 1);
        }
    }, []);

    return useMemo(() => ({
        user,
        cartCount,
        loggedIn,
        login,
        logout,
        addToCart
    }), [user, cartCount, loggedIn, login, logout, addToCart])
}

export const StoreContextProvider = ({ children }) => {
    const store = useStore();
    return (
        <StoreContext.Provider value={store}>
            {children}
        </StoreContext.Provider>
    )
}

export const useStoreContext = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStoreContext must be used within a StoreContextProvider');
    }
    return context;
}

export const useLogin = () => useStoreContext().login;
export const useLogout = () => useStoreContext().logout;
export const useUser = () => useStoreContext().user;
export const useCartCount = () => useStoreContext().cartCount;
export const useLoggedIn = () => useStoreContext().loggedIn;
export const useAddToCart = () => useStoreContext().addToCart;