import React, {Component} from 'react'
import LessonTabs from '../components/LessonTabs';
import TopicService from '../services/TopicService'
import TopicPills from '../components/TopicPills'
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
        this.setState({newTopic: {  title: '' ,id :''

            }})
    }


    componentWillReceiveProps(newProps){
        this.setLessonId(newProps.lessonId);
        this.setModuleId(newProps.moduleId);
        this.setCourseId(newProps.courseId);
        this.findAllTopicsForLesson(newProps.lessonId)
    }

    createTopic() {
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
                <div className="form-control-plaintext ">

            </div>

                <div className="container-fluid form-row form-control-plaintext">
                    <button onClick={this.deleteLesson} className="btn btn-danger btn-md col-5">
                        Delete This Lesson
                    </button>
                <input onChange={this.titleChanged}
                       placeholder="Add a New Topic"
                       className="form-control col-5"/>
                <button onClick={this.createTopic} className="btn btn-primary ">
                    <i className="fa fa-plus"></i>
                </button>
                </div>

                <ul className="nav nav-pills " role="tablist">

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


