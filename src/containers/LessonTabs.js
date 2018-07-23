import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import LessonEditor from "./LessonEditor";

export default class LessonTabs
  extends React.Component {

    constructor(props) {
        super(props);
    }

  render() { return(
      <li className="nav-item">

          <a className="nav-link active"
             href={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}/topic`}>{this.props.lesson.title}</a>
          </li>

  );}}

