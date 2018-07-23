import React, {Component} from 'react'
import LessonTabs from '../containers/LessonTabs';
import TopicService from '../services/TopicService'
import TopicPills from './TopicPills'
import LessonService from "../services/LessonService";

export default class TopicList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            newTopic: '',
            lessonId: '',
            topic: { title: '' ,id :''},
            topics: [

            ]
        };
        this.createTopic = this.createTopic.bind(this);
        this.deleteLesson= this.deleteLesson.bind(this);
        this.setModuleId =
            this.setModuleId.bind(this);
        this.setCourseId =
            this.setCourseId.bind(this);
        this.setLessonId =
            this.setLessonId.bind(this);
        this.lessonService = LessonService.instance;
        this.topicService = TopicService.instance;
        this.titleChanged = this.titleChanged.bind(this);
    }


    setTopics(topics) {
        this.setState({topics: topics})
    }

    findAllTopicsForLesson(lessonId) {
        this.topicService
            .findAllTopicsForLesson(lessonId)
            .then((topics) => {this.setTopics(topics)});
    }

    setLessonId(lessonId) {
        this.setState({lessonId: lessonId});
    }

    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    componentDidMount() {
        this.setLessonId(this.props.lessonId);
        this.setModuleId(this.props.moduleId);
        this.setCourseId(this.props.courseId);
        this.topicService.findAllTopicsForLesson(this.props.lessonId)
            .then(topics=>{
                this.setState({topics:topics});
            })
    }


    componentWillReceiveProps(newProps){
        this.setLessonId(newProps.lessonId);
        this.setModuleId(newProps.moduleId);
        this.setCourseId(newProps.courseId);
        this.findAllTopicsForLesson(newProps.lessonId)
    }

    createTopic() {
        console.log(this.state.topic);
        this.topicService
            .createTopic(this.props.lessonId, this.state.newTopic)
            .then(newTopic  => this.topicService.findAllTopicsForLesson(this.props.lessonId))
            .then(topics => this.setState({topics: topics}))
    }

    deleteLesson() {
        if (window.confirm('Are you sure you wish to delete this Lesson?'))
        this.lessonService
            .deleteLesson(this.props.lessonId)
            .then(window.location.replace(`/course/${this.state.courseId}/module/${this.state.moduleId}/lesson/`))
    }

    titleChanged(event) {
        console.log(event.target.value);
        this.setState({newTopic: {title: event.target.value}});
    }



    render() {
        return (
            <div>
                <div class="form-control-plaintext ">
                <button onClick={this.deleteLesson} className="btn btn-danger btn-md">
                    Delete This Lesson
                </button>
            </div>
                <div className="form-control-plaintext">
                    <h7>Topics for lesson: {this.state.lessonId}</h7>
                </div>


                <div class="form-row">
                <input onChange={this.titleChanged}
                       placeholder="Enter New Topic"
                       className="form-control col-8"/>
                <button onClick={this.createTopic} className="btn btn-primary ">
                    <i className="fa fa-plus"></i>
                </button>
                </div>

                <br/>
                <ul className="nav nav-pills red">

                    {this.state.topics.map((topic)=>
                        <TopicPills lessonId={this.state.lessonId} courseId={this.state.courseId}
                                    moduleId={this.state.moduleId}  topic={topic}
                                    key={topic.id}/>
                    )}

                </ul>

            </div>
        );
    }
}


