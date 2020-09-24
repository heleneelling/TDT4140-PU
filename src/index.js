import React from 'react';
import ReactDOM from 'react-dom';
import './shopstop_main.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(<Router><App isTest = {false} /></Router>, 
    document.getElementById('root'));

