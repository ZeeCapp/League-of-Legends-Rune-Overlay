import React from 'react';
import ReactDOM from 'react-dom';
import RuneOverlayApp from './RuneOverlayApp';
import {BrowserRouter, Routes, Route,} from "react-router-dom"
import Settings from "./Settings"

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/settings' element={ <Settings/> } />
        <Route path='/'  element={ <RuneOverlayApp /> } />       
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

if ((module as any).hot) {
  (module as any).hot.accept();
}