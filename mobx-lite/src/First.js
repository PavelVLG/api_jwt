import React, {useState} from 'react'
import Counter from './store'
import {observer} from "mobx-react-lite";

const First = () => {


    return (
        <>
            <div>Counter</div>
            <h2>{`Counter : ${Counter.count}`}</h2>
            <button onClick={() => Counter.increment()}>increment</button>
            <button onClick={() => Counter.decrement()}>decrement</button>
            <button onClick={() => Counter.getApi()}>getApi</button>
            <div><button onClick={() => console.log(Counter.api.title)}>Console Log</button></div>
        </>
    )
}

export default observer(First)