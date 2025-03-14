import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Buffer } from "buffer";
global.process = require("process");


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
