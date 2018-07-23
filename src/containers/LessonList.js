import React, {Component} from 'react'
import LessonTabs from '../components/LessonTabs';
import LessonService from '../services/LessonService'


export default class LessonList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            moduleId: '',
            newLesson:'',
            lesson: { title: '' ,id :''},
            lessons: [

            ]
        };
        this.createLesson = this.createLesson.bind(this);
        this.setModuleId =
            this.setModuleId.bind(this);
        this.lessonService = LessonService.instance;
        this.titleChanged = this.titleChanged.bind(this);
    }

    setLessons(lessons) {
        this.setState({lessons: lessons})
    }

    findAllLessonsForModule(courseId,moduleId) {
        this.lessonService
            .findAllLessonsForModule(courseId,moduleId)
            .then((lessons) => {this.setLessons(lessons)});
    }


    setModuleId(moduleId) {
        this.setState({moduleId: moduleId});
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }

    componentDidMount() {
        this.setModuleId(this.props.moduleId);
        this.setCourseId(this.props.courseId);
        this.lessonService.findAllLessonsForModule(this.props.courseId,this.props.moduleId)
            .then(lessons=>{
                this.setState({lessons:lessons});
            })
        this.setState({newLesson: {  title: '' ,id :''

            }})
    }
    componentWillReceiveProps(newProps){
        this.setModuleId(newProps.moduleId);
        this.setCourseId(newProps.courseId);
        this.findAllLessonsForModule(newProps.courseId,newProps.moduleId)
    }

    createLesson() {
        this.lessonService
            .createLesson(this.props.courseId,this.props.moduleId, this.state.newLesson)
            .then(newLesson  => this.lessonService.findAllLessonsForModule(this.props.courseId, this.props.moduleId))
            .then(lessons => this.setState({lessons: lessons}))
    }


    renderListOfLessons() {
        let lessons = this.state.lessons.map(function(lesson){
            return <LessonTabs lesson={lesson}
                               key={lesson.id}/>
        });
        return lessons;
    }

    titleChanged(event) {
        console.log(event.target.value);
        this.setState({newLesson: {title: event.target.value}});
    }

    render() {
        return (
            <div>

                <div className="form-row">
                <input onChange={this.titleChanged}
                       placeholder="Add New Lesson Here!!"
                       className="form-control col-4"/>

                <button onClick={this.createLesson} className="btn btn-dark">
                    <i className="fa fa-plus"></i>
                </button>
                </div>
                <br/>
                <ul className="nav nav-tabs font-weight-bold">
                    {this.state.lessons.map((lesson)=>
                        <LessonTabs lesson={lesson} courseId={this.state.courseId}
                                        moduleId={this.state.moduleId}

                                        key={lesson.id}/>
                    )}

                </ul>
            </div>
        );
    }
}
