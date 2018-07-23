import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'


export default class ModuleListItem
  extends React.Component {

    render() {
    return (

      <li className="list-group-item">

          <Link to={`/course/${this.props.courseId}/module/${this.props.module.id}/lesson`}>
              {this.props.module.title}
              <button className="btn float-right"><i className="fa fa-pencil"></i></button>
          </Link>


          <button className="btn float-right"
                  onClick={(e) => { if (window.confirm('Are you sure you wish to delete this module?'))
                      this.props.deleteModule(this.props.module.id)}}>
                  <i className="fa fa-trash"></i></button>
      </li>

    );
  }
}



