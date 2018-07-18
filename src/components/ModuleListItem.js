import React from 'react';
import CourseEditor from "../containers/CourseEditor";
import ModuleEditor from "../containers/ModuleEditor";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'


export default class ModuleListItem
  extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Router>
            <li className="list-group-item">

          <Link to={`/module/lessons/${this.props.module.id}`}>
              {this.props.module.title}
          </Link>
          <Route path="/module/lessons/:moduleId"
                 component={ModuleEditor}>
          </Route>
        <span className="float-right">

          <i className="fa fa-trash"></i>
          <i className="fa fa-pencil"></i>
        </span>
         </li>
        </Router>
    );
  }
}
