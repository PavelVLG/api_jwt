import './App.css';
import React, {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import {qwestions} from './mock';

function App() {
    const [state, setState] = useState([...qwestions])
    const [view, setView] = useState( state[state.length - 1])
    const [answerVisibility, setAnswerVisibility] = useState(false)

    const repeat = () => {
        setView(state[Math.floor(Math.random() * state.length)])
        console.table(state)
        console.log(view)
    }
    const success = async () => {

        if (state.length > 1) {
            setState(state.filter(item => item !== view))
            repeat()
        } else {
            setView(['ok', 'ok'])
        }
    }


    const Question = () => {
        return (
            <div style={{border: '1px solid black', maxWidth: '200px', margin: '0 auto', borderRadius: '5px', padding: '3px 3px 3px 3px'}}>
                <p>
                   <span style={{fontWeight: 'bold'}}>{state.indexOf(view) +1}</span> :   {view[0]}
                </p>
            </div>
        )
    }
    const Answer = () => {
        return !answerVisibility ? 'скрыто' : (
            <div style={{border: '1px solid black', maxWidth: '94%', margin: '0 auto', borderRadius: '5px', marginBottom: '16px', padding: '3px 3px 3px 3px'}}>
                <p>
                    {view[1]}
                </p>
            </div>)
    }

    useEffect(() => {

        setAnswerVisibility(false)
        console.table(state)
        console.log(view)
    }, [state, view])




    return (
        <div className="App">
            <div style={{width: '300px', margin: '0 auto', display: 'flex', justifyContent: "space-between" }}>
                <Button variant="contained" color="success" onClick={() => success()}>верный ответ</Button>
                <Button variant="contained" color="secondary" onClick={() => repeat()}>на повтор</Button>
            </div>
            <div style={{marginTop: "16px"}}>
                <Button variant="contained" onClick={() => setAnswerVisibility(true)}>ответ</Button>
            </div>
            <div><h2>кол-во вопросов: {state.length}</h2></div>
            <div style={{marginTop: "34px"}}>
                <Question/>
            </div>
            <div style={{marginTop: "64px"}}>
                    <Answer/>
            </div>
        </div>
    );
}

export default App;
