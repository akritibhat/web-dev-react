import React from 'react'

import LessonTabs from './LessonTabs'
import LessonList from "./LessonList";
import ModuleService from "../services/ModuleService";
import LessonEditor from "./LessonEditor";
import {BrowserRouter as Router, Route} from 'react-router-dom'

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
            .then(alert('Module Name Updated Successfully to: '+this.state.newModule.title))
            .then(window.location.reload());
    };


    componentWillReceiveProps(newProps){
        this.selectModule(newProps.match.params.moduleId);
        this.selectCourse(newProps.match.params.courseId);
    }

    render() { return(
        <div >
            <h5>Editing module: {this.state.moduleId}</h5>
            <div className="form-row">
                <input onChange={this.formChanged} placeholder='Enter New Name for Module' className="form-control col-4"/>
                <button onClick={this.updateModule} className="btn btn-primary">Update Module Name</button>
            </div>
            <br/>
            <div>
                    <LessonList courseId={this.props.match.params.courseId} moduleId={this.props.match.params.moduleId}/>
                </div>
                <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId/topic"
                       component={LessonEditor}>
                </Route>
            </div>

    );}}



