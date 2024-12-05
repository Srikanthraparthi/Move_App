import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Use document.querySelector to target the element with class 'root'
const rootElement = document.querySelector('.root');

// Render the React app into the selected element
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);
