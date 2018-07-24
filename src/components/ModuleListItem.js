import React from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'


export default class ModuleListItem
  extends React.Component {

    highlight(event){
       var p= event.target.parentNode ;
       p.style.backgroundColor="cyan";
       var list= document.getElementsByClassName('highlightclass');
       for(var i=0;i<list.length;i++){
           list[i].style.backgroundColor="white";
       }
        p.style.backgroundColor="cyan";
    }
    render() {
    return (

      <li className="list-group-item highlightclass">

          <Link  onClick={this.highlight} to={`/course/${this.props.courseId}/module/${this.props.module.id}/lesson`}>
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



