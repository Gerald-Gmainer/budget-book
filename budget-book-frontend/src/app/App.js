import React from 'react';
import './scss/style.scss'
import DefaultLayout from "../components/layout/DefaultLayout";
import {HashRouter, Route, Routes} from 'react-router-dom'

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route path="*" name="Home" element={<DefaultLayout/>}/>
            </Routes>
        </HashRouter>
    );
}

export default App;
