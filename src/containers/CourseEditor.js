import React from 'react'
import ModuleList from './ModuleList'
import LessonTabs from '../components/LessonTabs'
import CourseService from "../services/CourseService";
import ModuleEditor from "./ModuleEditor";
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { browserHistory } from 'react-router'

export default class CourseEditor
  extends React.Component {

  constructor(props) {
    super(props)
    this.state = {courseId: '', courseTitle:'',  newCourse: {}};
    this.selectCourse = this.selectCourse.bind(this);
      this.courseService = CourseService.instance;
  }

  componentDidMount() {
    this.selectCourse
    (this.props.match.params.courseId);
  }

  selectCourse(courseId) {
    this.setState({courseId: courseId});
  }

  componentWillReceiveProps(newProps){
        this.selectCourse(newProps.match.params.courseId);
    }

    formChanged = (event) => {
        console.log(event.target.value);
        console.log(this.state.courseId);
        this.setState({newCourse: {
                title: event.target.value
            }})
    };

    updateCourse = (newCourse) => {
        this.courseService.updateCourse(this.state.courseId,this.state.newCourse)
            .then((course)=>{alert('Course Name Updated Successfully to: ' + course.title)})

    };


    render() { return(
        <Router>
            <div className="row">
            <div className="col-4 form-control-plaintext">
            <h3>Editing course: {this.state.courseId}</h3>
                <div className="form-row">
            <input id="nameEditor" onChange={this.formChanged} placeholder='Enter New Name for Course' className="form-control col-8"/>
            <button onClick={this.updateCourse} className="btn btn-info">Update Course</button>
                </div>

            <ModuleList courseId={this.state.courseId}/>

            </div>
            <div  className="right-div col-8">
                <Route history={this.props.history} path="/course/:courseId/module/:moduleId/lesson"
                       component={ModuleEditor}>
                </Route>
            </div>
            </div>
        </Router>

  );}}
