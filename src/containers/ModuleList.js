import React, {Component} from 'react'
import ModuleListItem from '../components/ModuleListItem';
import ModuleService from '../services/ModuleService'


export default class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courseId: '',
            newModule:{},
            module: { title: '' },
            modules: [

            ]
        };
        this.createModule = this.createModule.bind(this);
        this.titleChanged = this.titleChanged.bind(this);
        this.setCourseId =
            this.setCourseId.bind(this);
        this.moduleService = ModuleService.instance;
    }
    setModules(modules) {
        this.setState({modules: modules})
    }
    findAllModulesForCourse(courseId) {
        this.moduleService
            .findAllModulesForCourse(courseId)
            .then((modules) => {this.setModules(modules)});
    }

    setCourseId(courseId) {
        this.setState({courseId: courseId});
    }
    componentDidMount() {
        this.setCourseId(this.props.courseId);
    }
    componentWillReceiveProps(newProps){
        this.setCourseId(newProps.courseId);
        this.findAllModulesForCourse(newProps.courseId)
    }

    createModule() {
        console.log(this.state.module);
        this.moduleService
            .createModule(this.props.courseId, this.state.module)
            .then(module  => this.moduleService.findAllModulesForCourse(this.props.courseId))
            .then(modules => this.setState({modules: modules}))

    }

    formChanged = (event) => {
        console.log(event.target.value);
        this.setState({newModule: {
                title: event.target.value
            }})
    };

    updateModule = (moduleId,newModule) => {
        this.moduleService.updateModule(moduleId,newModule)
            .then(module  => this.moduleService.findAllModulesForCourse(this.props.courseId))
            .then(modules => this.setState({modules: modules}))
    };

    deleteModule = (moduleId) => {
        this.moduleService.deleteModule(moduleId)
            .then(module  => this.moduleService.findAllModulesForCourse(this.props.courseId))
            .then(modules => this.setState({modules: modules}))
    };


    titleChanged(event) {
        console.log(event.target.value);
        this.setState({module: {title: event.target.value}});
    }



    render() {
        return (
            <div>
            <div/>
                <br/>
            <div>
                <h4>Module List for course: {this.state.courseId}</h4>

                <input onChange={this.titleChanged}
                       placeholder="New Module"
                       className="form-control"/>

                <button onClick={this.createModule} className="btn btn-primary btn-block">
                    <i className="fa fa-plus"></i>
                </button>
                <br/>
                <ul className="list-group">
                    {this.state.modules.map((module)=>
                    <ModuleListItem module={module} courseId={this.state.courseId}
                                    deleteModule={this.deleteModule}
                                    updateModule={this.updateModule}
                    key={module.id}/>
                    )}
                </ul>
            </div>
            </div>
        );
    }
}
