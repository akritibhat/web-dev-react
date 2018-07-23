import React from 'react'

import LessonTabs from './LessonTabs'
import TopicList from "./TopicList";
import TopicService from "../services/TopicService";

export default class TopicEditor
    extends React.Component {

    constructor(props) {
        super(props)
        this.state = {moduleId: '', courseId: '', lessonId:'', topicId:'',  newTopic: {}};
        this.selectCourse = this.selectCourse.bind(this);
        this.selectModule = this.selectModule.bind(this);
        this.selectLesson = this.selectLesson.bind(this);
        this.selectTopic = this.selectTopic.bind(this);
        this.topicService= TopicService.instance;
    }


    componentDidMount() {
        this.selectModule
        (this.props.match.params.moduleId);
        this.selectCourse
        (this.props.match.params.courseId);
        this.selectLesson
        (this.props.match.params.lessonId);
        this.selectTopic
        (this.props.match.params.topicId);
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

    selectTopic(topicId) {
        this.setState({topicId: topicId});
    }

    componentWillReceiveProps(newProps){
        this.selectModule(newProps.match.params.moduleId);
        this.selectCourse(newProps.match.params.courseId);
        this.selectLesson(newProps.match.params.lessonId);
        this.selectTopic(newProps.match.params.topicId);
    }

    formChanged = (event) => {
        console.log(event.target.value);
        console.log(this.state.topicId);
        this.setState({newTopic: {
                title: event.target.value
            }})
    };

    updateTopic = (newTopic) => {
        this.topicService.updateTopic(this.state.topicId,this.state.newTopic)
            .then(alert('Topic Name Updated Successfully to: '+this.state.newTopic.title))
            .then(window.location.reload());
    };

    deleteTopic = (event) => {
        if (window.confirm('Are you sure you wish to delete this Topic?'))
        this.topicService.deleteTopic(this.state.topicId)
            .then(window.location.replace(`/course/${this.state.courseId}/module/${this.state.moduleId}/lesson/${this.state.lessonId}/topic`))
    };


    render() { return(
        <div>
            <h6>Editing Topic: {this.state.topicId}</h6>
            <div class="form-row">
                <input onChange={this.formChanged} placeholder='Topic Name' className="form-control col-2"/>
                <button onClick={this.updateTopic} className="btn btn-primary">Update Topic</button>
                <button onClick={this.deleteTopic} className="btn btn-danger">Delete Topic</button>
            </div>

        </div>
    );}}
