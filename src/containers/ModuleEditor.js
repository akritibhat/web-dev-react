import React from 'react'
import ModuleList from './ModuleList'
import LessonTabs from './LessonTabs'
import LessonList from "./LessonList";


export default class ModuleEditor
    extends React.Component {

    constructor(props) {
        super(props)
        this.state = {moduleId: ''};
        this.selectModule = this.selectModule.bind(this);
    }

    componentDidMount() {
        this.selectModule
        (this.props.match.params.moduleID);
    }

    selectModule(moduleId) {
        this.setState({moduleId: moduleId});
    }

    render() { return(
        <div>
            <h2>Editing module: {this.state.moduleId}</h2>
            <div className="row">
                <div className="col-4">

                </div>
            </div>
        </div>
    );}}
