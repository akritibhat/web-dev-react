import React from 'react'

import LessonTabs from './LessonTabs'
import TopicList from "./TopicList";
import LessonService from "../services/LessonService";
import TopicEditor from './TopicEditor';
import {BrowserRouter as Router, Route} from 'react-router-dom'

export default class LessonEditor
    extends React.Component {

    constructor(props) {
        super(props)
        this.state = {moduleId: '', courseId: '', lessonId:'', topicId:'', lessonTitle:'',  newLesson: {}};
        this.selectCourse = this.selectCourse.bind(this);
        this.selectModule = this.selectModule.bind(this);
        this.lessonService= LessonService.instance;
    }


    componentDidMount() {
        this.selectModule
        (this.props.match.params.moduleId);
        this.selectCourse
        (this.props.match.params.courseId);
        this.selectLesson
        (this.props.match.params.lessonId);
    }

    selectModule(moduleId) {
        this.setState({moduleId: moduleId});
    }

    selectCourse(courseId){
        this.setState({courseId: courseId});
    }

    selectLesson(lessonId) {
        this.setState({lessonId: lessonId});
    }

    componentWillReceiveProps(newProps){
        this.selectModule(newProps.match.params.moduleId);
        this.selectCourse(newProps.match.params.courseId);
        this.selectLesson(newProps.match.params.lessonId);
    }

    formChanged = (event) => {
        console.log(event.target.value);
        console.log(this.state.lessonId);
        this.setState({newLesson: {
                title: event.target.value
            }})
    };

    updateLesson = (newModule) => {
        this.lessonService.updateLesson(this.state.lessonId,this.state.newLesson)
            .then(alert('Lesson Name Updated Successfully to: '+this.state.newLesson.title))
            .then(window.location.reload());
    };


    render() { return(
        <div>
            <div class="form-control-plaintext">
            <h6>Welcome to Lesson: {this.state.lessonId}</h6>
            </div>
            <div class="form-row">
                <input onChange={this.formChanged} placeholder='Change Lesson Name' className="form-control col-4"/>
                <button onClick={this.updateLesson} className="btn btn-primary">
                    <i className="fa fa-check-circle"></i>
                </button>
            </div>
            <div className="row">

                   <TopicList courseId={this.props.match.params.courseId}
                               moduleId={this.props.match.params.moduleId}
                               lessonId={this.props.match.params.lessonId}/>


            </div>
            <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId/topic/:topicId/pills"
                   component={TopicEditor}>
            </Route>
        </div>
    );}}
