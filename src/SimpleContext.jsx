import React, { useState, createContext, useContext, memo } from 'react'
import './Form-context.css'


// Simple old not so efficient context API usage example
export const StoreContext = createContext(null)


export const TextInput = ({ value }) => {
    const [store, setStore] = useContext(StoreContext)
    return (
        <div className='field'>
            {value}: <input value={store[value]} onChange={(e) => setStore({ ...store, [value]: e.target.value })
            } />
        </div>
    )
}

export const Display = ({ value }) => {
    const [store] = useContext(StoreContext)
    return (
        <div className='value'>
            {value}: {store[value]}
        </div>
    )
}

export const FormContainer = React.memo(() => {
    return (
        <div className='container'>
            <h5>Form Container</h5>
            <TextInput value='first' />
            <TextInput value='last' />
        </div>
    )
});

export const DisplayContainer = React.memo(() => {
    return (
        <div className='container'>
            <h5>Display Container</h5>
            <Display value='first' />
            <Display value='last' />
        </div>
    )
});

export const ContentContainer = React.memo(() => {
    return (
        <div className='container'>
            <h5>Content Container</h5>
            <FormContainer />
            <DisplayContainer />
        </div>
    )
});

const FormContext = () => {
    const store = useState({
        first: "",
        last: ""
    })

    return (
        <StoreContext.Provider value={store}>
            <div className='container'>
                <h5>App</h5>
                <ContentContainer />
            </div>
        </StoreContext.Provider>
    )
}

export default FormContext





