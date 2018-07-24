import React from 'react'

export default class TopicPills extends React.Component {

    constructor(props) {
        super(props);
    }

    highlight(event){
        var p= event.target.parentNode ;
        p.style.color="red";
        var list= document.getElementsByClassName('highlightclass3');
        for(var i=0;i<list.length;i++){
            list[i].style.backgroundColor="white";
        }
        p.style.color="red";
    }

    render() { return(
        <li className="nav-item">

            <a className="nav-link highlightclass3" data-toggle="pill"
               onClick={this.highlight}
               href={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topic.id}/pills`}>{this.props.topic.title}</a>
        </li>

    );}}


