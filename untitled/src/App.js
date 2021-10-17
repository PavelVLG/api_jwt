import './App.css';
import React, {useEffect} from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {useState} from "react";
import {qwestions} from './mock';

function App() {
    const [state, setState] = useState([...qwestions])
    const [view, setView] = useState(state[state.length - 1])


    const repeat = () => {

        setView(state[Math.floor(Math.random() * state.length)])

    }
    const success = () => {



        const arr = state.filter(item => item !== view)
        setState(arr)
    }

    const log = () => {
        console.log('state', state)
        console.log('view', view)
    }

    return (
        <div className="App">
            <div>
                <Button variant="contained" color="success" onClick={() => success()}>верный ответ</Button>
                <Button variant="contained" color="secondary" onClick={() => repeat()}>на повтор</Button>
            </div>
            <div style={{marginTop: "16px"}}>
                <Button variant="contained">ответ</Button>
            </div>
            <div style={{marginTop: "34px"}}>
                <Box component="span" sx={{p: 2, border: '1px dashed grey'}}>
                    {view[0]}
                </Box>
            </div>
            <div style={{marginTop: "64px"}}>
                <Box component="span" sx={{p: 2, border: '1px dashed grey'}}>
                    {view[1]}
                </Box>

            </div>
        </div>
    );
}

export default App;
