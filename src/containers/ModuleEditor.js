import React from 'react'

import LessonTabs from '../components/LessonTabs'
import LessonList from "./LessonList";
import ModuleService from "../services/ModuleService";
import LessonEditor from "./LessonEditor";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { History } from "react-router"

export default class ModuleEditor
    extends React.Component {

    constructor(props) {
        super(props)
        this.state = {moduleId: '', courseId: '', moduleTitle:'',  newModule: {}};
        this.selectCourse = this.selectCourse.bind(this);
        this.selectModule = this.selectModule.bind(this);
        this.moduleService = ModuleService.instance;
    }

    componentDidMount() {
        this.selectModule
        (this.props.match.params.moduleId);
        this.selectCourse
        (this.props.match.params.courseId);
    }

    selectModule(moduleId) {
        this.setState({moduleId: moduleId});
    }

    selectCourse(courseId){
        this.setState({courseId: courseId});
    }



    formChanged = (event) => {
        console.log(event.target.value);
        console.log(this.state.moduleId);
        this.setState({newModule: {
                title: event.target.value
            }})
    };

    updateModule = (newModule) => {
        this.moduleService.updateModule(this.state.moduleId,this.state.newModule)
            .then(window.location.replace(`/course/${this.state.courseId}/module/${this.state.moduleId}
            /lesson`))
    };


    componentWillReceiveProps(newProps){
        this.selectModule(newProps.match.params.moduleId);
        this.selectCourse(newProps.match.params.courseId);

    }

    render() { return(

        <div className="form-control-plaintext">

            <h5>Selected module: {this.state.moduleId}</h5>
            <div className="form-row">
                <input onChange={this.formChanged} placeholder='Enter New Name for Module' className="form-control col-4"/>
                <button onClick={this.updateModule} className="btn btn-primary">Update Module Name</button>
            </div>
            <div className="form-control-plaintext">
                    <LessonList courseId={this.props.match.params.courseId} moduleId={this.props.match.params.moduleId}/>
                </div>
                <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId/topic"
                       component={LessonEditor}>
                </Route>
            </div>

    );}}



