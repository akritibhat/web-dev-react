import React from 'react'
import ReactDOM from 'react-dom'
import HelloWorld from './hello'
import CourseManager from './containers/CourseManager'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import Hello from './components/Hello'
import Stateless from './components/Stateless'
import ModuleListItem from "./components/ModuleListItem";
import App from "./examples/App";


ReactDOM.render(
    <div className="container-fluid">
        <
        CourseManager/>
    </div>,
    document.getElementById('root')
);