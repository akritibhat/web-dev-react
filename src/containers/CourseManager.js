import React, {Component} from 'react'
import CourseCard from '../components/CourseCard'
import ModuleList from './ModuleList'
import LessonTabs from '../components/LessonTabs'
import CourseEditor from './CourseEditor'
import ModuleEditor from './ModuleEditor'
import CourseList from "./CourseList";
import LessonEditor from "./LessonEditor"
import {BrowserRouter as Router, Route} from 'react-router-dom'

export default class CourseManager
  extends Component {
  render() {
    return (
      <Router>

        <div className="container-fluid">

          <h6 align="left">Course Manager</h6>

            <a href={"/courses"} > <button type="button"  className="btn btn-primary btn-lg btn-block">Get Courses</button></a>
          <Route path="/courses"
                 component={CourseList}>
          </Route>
          <Route path="/course/:courseId"
                 component={CourseEditor}>
          </Route>
          </div>


      </Router>
    )
  }
}
