import React from 'react'

export default class TopicPills extends React.Component {

    constructor(props) {
        super(props);
    }

    render() { return(
        <li class="nav-item">

            <a class="nav-link"
               href={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${this.props.lessonId}/topic/${this.props.topic.id}/pills`}>{this.props.topic.title}</a>
        </li>

    );}}


