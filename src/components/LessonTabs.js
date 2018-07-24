import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import LessonEditor from "../containers/LessonEditor";

export default class LessonTabs
  extends React.Component {

    constructor(props) {
        super(props);
        this.highlight = this.highlight.bind(this);
    }



    highlight(event){
        var p= event.target.parentNode ;
        event.target.style.color="Red";
    }

  render() { return(
      <li className="nav-item font-weight-bold">

          <a className="nav-link active highlightclass" onClick={this.highlight}
             href={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lesson.id}/topic`}>{this.props.lesson.title}</a>
          </li>

  );}}

