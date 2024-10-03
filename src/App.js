import './App.css';
// import React, { useReducer, useContext, createContext } from 'react';

// import { useState } from 'react';
// import useStore from './store-zustand';

// After creating a facade layer for the Zustand store, we can import the store functions from the facade layer instead of directly importing the Zustand store.
// import { useUser, useLoggedIn, useLogin, useLogout, useCartCount, useAddToCart } from './store-zustand';

//After Replacing Zustand with context API
import { useUser, useLoggedIn, useLogin, useLogout, useCartCount, useAddToCart, StoreContextProvider } from './store-zustand';



// Example of prop drilling
// const Container = ({ ChangeCounter }) => {
//   return <div><AddOneButton ChangeCounter={ChangeCounter} /></div>
// }

// const AddOneButton = ({ ChangeCounter }) => {
//   return <div><button onClick={() => ChangeCounter(prev => prev + 1)}>Add one!</button></div>
// }

// const ShowCounter = ({ counter }) => {
//   return <div>Counter:{counter}</div>;
// }

// function App() {
//   const [counter, setCounter] = useState(0)
//   return (
//     <div>
//       <Container ChangeCounter={setCounter} />
//       <ShowCounter counter={counter} />
//     </div>
//   );
// }

// export default App;


// Example of working with context API and useState

// export const CounterContext = createContext();

// export const CounterContextProvider = ({ children }) => {
//   const [counter, setCounter] = useState(0);
//   return (
//     <CounterContext.Provider value={{ counter, setCounter }}>
//       {children}
//     </CounterContext.Provider>
//   )
// }

// export const AddOneButton = () => {

//   const { setCounter } = useContext(CounterContext);

//   return (
//     <div>
//       <button onClick={() => setCounter(prev => prev + 1)}>Add one!</button>
//     </div>
//   )
// }

// export const Container = () => {
//   return (
//     <div>
//       <AddOneButton />
//     </div>
//   )
// }

// export const ShowCounter = () => {
//   const { counter } = useContext(CounterContext);
//   return (
//     <div>Counter:{counter}</div>
//   );
// }

// export default function App() {
//   return (
//     <CounterContextProvider>
//       <Container />
//       <ShowCounter />
//     </CounterContextProvider>
//   );
// }


// Example of working with context API and useReducer
// For complex state management or when you have multiple states that are related to each other, use useReducer

// export const CounterContext = createContext();

// export const CounterContextProvider = ({ children }) => {
//   const CounterReducer = (state, action) => {
//     switch (action.type) {
//       case 'INCREMENT':
//         return state + 1;
//       case 'DECREMENT':
//         return state - 1;
//       default:
//         return state;
//     }
//   }
//   const [counter, DispatchCounter] = useReducer(CounterReducer, 0);
//   return (
//     <CounterContext.Provider value={{ counter, DispatchCounter }}>
//       {children}
//     </CounterContext.Provider>
//   )
// }

// export const AddOneButton = () => {

//   const { DispatchCounter } = useContext(CounterContext);

//   return (
//     <div>
//       <button onClick={() => DispatchCounter({ type: 'INCREMENT' })}>Add one!</button>
//     </div>
//   )
// }

// export const SubtractOneButton = () => {
//   const { DispatchCounter } = useContext(CounterContext);
//   return (
//     <div>
//       <button onClick={() => DispatchCounter({ type: 'DECREMENT' })}>Subtract one!</button>
//     </div>
//   )
// }

// export const Container = () => {
//   return (
//     <div>
//       <AddOneButton />
//       <SubtractOneButton />
//     </div>
//   )
// }

// export const ShowCounter = () => {
//   const { counter } = useContext(CounterContext);
//   return (
//     <div>Counter:{counter}</div>
//   );
// }

// export default function App() {
//   return (
//     <CounterContextProvider>
//       <Container />
//       <ShowCounter />
//     </CounterContextProvider>
//   );
// }



//Example of working with state management library like Zustand for example

export const LoginSection = () => {
    //Before creating facade layer
    // const Login = useStore(state => state.login);
    // const Logout = useStore(state => state.logout);
    // const loggedIn = useStore(state => state.loggedIn);

    //After creating facade layer
    const Login = useLogin();
    const Logout = useLogout();
    const loggedIn = useLoggedIn();

    return (
        <div>
            <button onClick={() => {
                Login();
                if (loggedIn) alert('Already logged in')
            }}>Login</button>
            <button onClick={() => {
                Logout();
                if (!loggedIn) alert('Please login first')
            }}
            >LogOut</button>
        </div>
    )
}

export const UserSection = () => {
    //Before creating facade layer
    // const user = useStore(state => state.user);

    //After creating facade layer
    const user = useUser();

    return (
        <div>
            User: {user}
        </div >
    )
}

export const AddToCartSection = () => {
    // Before creating facade layer
    // const addToCart = useStore(state => state.addToCart);
    // const loggedIn = useStore(state => state.loggedIn);

    //After creating facade layer
    const addToCart = useAddToCart();
    const loggedIn = useLoggedIn();

    return (
        <div>
            <button onClick={() => {
                addToCart((loggedIn));
                if (!loggedIn) alert('Please login first')
            }}
            >Add To Cart</button>
        </div >
    )
}

export const CartCountSection = () => {
    // Before creating facade layer
    // const cartCount = useStore(state => state.cartCount);

    // After creating facade layer
    const cartCount = useCartCount();

    return (
        <div>
            Cart Count: {cartCount}
        </div >
    )
}

// To use zustand again, just remove context wrapper and import zustand store functions
export function ZustandPage() {
    return (
        <StoreContextProvider>
            <div>
                <LoginSection />
                <UserSection />
                <AddToCartSection />
                <CartCountSection />
            </div>
        </StoreContextProvider>
    )
}