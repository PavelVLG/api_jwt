import './App.css';
import React, {useEffect, useState} from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {qwestions} from './mock';

function App() {
    const [state, setState] = useState([...qwestions])
    const [view, setView] = useState(() => state[state.length - 1])
    const [answerVisibility, setanswerVisibility] = useState(false)

    const repeat = () => {
        setView(state[Math.floor(Math.random() * state.length)])
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
            <Box component="span" sx={{p: 2, border: '1px dashed grey'}}>
                {view[0]}
            </Box>
        )
    }
    const Answer = () => {
        return !answerVisibility ? 'скрыто' : (<Box component="span" sx={{p: 2, border: '1px dashed grey'}}>
            {view[1]}
        </Box>)

    }
    const log = () => {
        console.table(state)
    }
    useEffect(() => {
        setanswerVisibility(false)
        console.table(state)
        console.log(view)
    }, [state, view])
    return (
        <div className="App">
            <div>
                <Button variant="contained" color="success" onClick={() => success()}>верный ответ</Button>
                <Button variant="contained" color="secondary" onClick={() => repeat()}>на повтор</Button>
            </div>
            <div style={{marginTop: "16px"}}>
                <Button variant="contained" onClick={()=> setanswerVisibility(true)}>ответ</Button>
            </div>
            <div style={{marginTop: "34px"}}>
                <Question/>
            </div>
            <div style={{marginTop: "64px"}}>
                <Box component="span" sx={{p: 2, border: '1px dashed grey'}}>
                    <Answer/>
                </Box>

            </div>
        </div>
    );
}

export default App;
