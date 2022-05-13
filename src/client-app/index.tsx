import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
import "../../assets/icon.png"

ReactDOM.render(
  <App></App>,
  document.getElementById('root')
);

if ((module as any).hot) {
  (module as any).hot.accept();
}