import React from 'react';
import ReactDOM from 'react-dom';
import RuneOverlayApp from './RuneOverlayApp';

ReactDOM.render(
  <React.StrictMode>
    <RuneOverlayApp />
  </React.StrictMode>,
  document.getElementById('root')
);

if ((module as any).hot) {
  (module as any).hot.accept();
}