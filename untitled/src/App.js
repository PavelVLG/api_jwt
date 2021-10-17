import './App.css';
import React, {useEffect} from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {useState} from "react";
import {qwestions} from './mock';

function App() {
    const [state, setState] = useState([...qwestions])
    const [index, setIndex] = useState(state.length - 1)
    const [view, setView] = useState(state[index])

    const repeat = () => {
        const value = Math.floor(Math.random() * state.length)
        setIndex(value)
    }
    const success = () => {
        const value = [...state.slice(0, index), ...state.slice(index + 1, state.length)]
        setState(value)
        repeat()
    }


    useEffect(() => {
        if (state[0] != null) {
            setView(state[index])
        } else {
            setView('Success!!')
        }
    }, [state, index])

    return (
        <div className="App">
            <div>
                <Button variant="contained" color="success" onClick={() => success()}>верный ответ</Button>
                <Button variant="contained" color="secondary" onClick={() => repeat()}>на повтор</Button>
            </div>
            <div style={{marginTop: "16px"}}>
                <Button variant="contained" >ответ</Button>
            </div>
            <div style={{marginTop: "34px"}}>
                <Box component="span" sx={{p: 2, border: '1px dashed grey'}}>
                    {view[0]}
                </Box>
            </div>
            <div style={{marginTop: "34px"}}>
                <Box component="span" sx={{p: 2, border: '1px dashed grey'}}>
                    {view[1] ? view[1] : 'ответ'}
                </Box>

            </div>
        </div>
    );
}

export default App;
