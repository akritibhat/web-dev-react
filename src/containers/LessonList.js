import React, {Component} from 'react'
import LessonTabs from '../containers/LessonTabs';
import LessonService from '../services/LessonService'


export default class LessonList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moduleId: '',
            lesson: { title: '' },
            lessons: [

            ]
        };
        this.createLesson = this.createLesson.bind(this);
        this.titleChanged = this.titleChanged.bind(this);

        this.setModuleId =
            this.setModuleId.bind(this);

        this.lessonService = LessonService.instance;
    }
    setLessons(lessons) {
        this.setState({lessons: lessons})
    }
    findAllLessonsForModule(moduleID) {
        this.lessonService
            .findAllLessonsForModule(moduleID)
            .then((lessons) => {this.setLessons(lessons)});
    }

    setModuleId(moduleID) {
        this.setState({moduleID: moduleID});
    }
    componentDidMount() {
        this.setModuleId(this.props.moduleID);
    }
    componentWillReceiveProps(newProps){
        this.setModuleId(newProps.moduleID);
        this.findAllLessonsForModule(newProps.moduleID)
    }

    createLesson() {
        console.log(this.state.lesson);
        this.lessonService
            .createModule(this.props.moduleID, this.state.lesson)
    }
    titleChanged(event) {
        console.log(event.target.value);
        this.setState({module: {title: event.target.value}});
    }
    renderListOfLessons() {
        let lessons = this.state.lessons.map(function(lesson){
            return <LessonTabs lesson={lesson}
                                   key={lesson.id}/>
        });
        return lessons;
    }
    render() {
        return (
            <div>
                <h3>Module List for course: {this.state.moduleId}</h3>
                <input onChange={this.titleChanged}

                       placeholder="title"
                       className="form-control"/>
                <button onClick={this.createLesson} className="btn btn-primary btn-block">
                    <i className="fa fa-plus"></i>
                </button>
                <br/>
                <ul className="list-group">
                    {this.renderListOfLessons()}
                </ul>
            </div>
        );
    }
}
