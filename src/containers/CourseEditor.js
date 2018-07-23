import React from 'react'
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'
import CourseService from "../services/CourseService";
import ModuleEditor from "./ModuleEditor";
import {BrowserRouter as Router, Route} from 'react-router-dom'

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
            .then(alert('Course Name Updated Successfully to: '+this.state.newCourse.title))
    };


    render() { return(
        <Router>
            <div class="row">
            <div className="col-4">
            <h3>Editing course: {this.state.courseId}</h3>
                <div className="form-row">
            <input onChange={this.formChanged} placeholder='Enter New Name for Course' className="form-control col-8"/>
            <button onClick={this.updateCourse} className="btn btn-info">Update Course</button>
                </div>

            <ModuleList courseId={this.state.courseId}/>

            </div>
            <div  class="right-div" className="col-8">
                <Route path="/course/:courseId/module/:moduleId/lesson"
                       component={ModuleEditor}>
                </Route>
            </div>
            </div>
        </Router>

  );}}
