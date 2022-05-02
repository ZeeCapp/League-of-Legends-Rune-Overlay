import React from "react";
import ReactDOM from "react-dom";
import App from "./App"
import "../static/styles/fonts.css"


ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.querySelector("#root")
);

if ((module as any).hot) {
    (module as any).hot.accept();
  }