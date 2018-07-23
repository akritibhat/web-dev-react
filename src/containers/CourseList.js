
import React from 'react';
import CourseRow from '../components/CourseRow'
import CourseService from '../services/CourseService';

class CourseList extends React.Component {

    constructor() {
        super();
        this.courseService = CourseService.instance;
        this.state = {
            newCourse: {},
            courses: []
        };

    }

    componentDidMount() {
        this.courseService.findAllCourses()
            .then(courses => {
                this.setState({courses: courses});
            });
    }

    formChanged = (event) => {
        console.log(event.target.value);
        this.setState({newCourse: {
                title: event.target.value
            }})
    };

    deleteCourse = (courseId) => {
        this.courseService.deleteCourse(courseId)
            .then(() => this.courseService.findAllCourses())
            .then(courses => this.setState({courses: courses}))
    };

    updateCourse = (courseId,newCourse) => {
        this.courseService.updateCourse(courseId,newCourse)
            .then(() => this.courseService.findAllCourses())
            .then(courses => this.setState({courses: courses}))
    };

    createCourse = () => {
        this.courseService.createCourse(this.state.newCourse)
            .then(course  => this.courseService.findAllCourses())
            .then(courses => this.setState({courses: courses}))
    };

    render()
    {
        return (
            <div>
                <h2>Course List</h2>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Title</th>
                    </tr>
                    <tr>
                        <th><input onChange={this.formChanged} className="form-control"/> </th>
                        <th><button onClick={this.createCourse} className="btn btn-primary">Add New Course</button> </th>
                    </tr>
                    <tr>
                        <th>Course Title</th>
                        <th>Last Update by</th>
                        <th>Modified on</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.courses.map((course, index) =>
                        <CourseRow key={index}
                                   deleteCourse={this.deleteCourse}
                                   updateCourse={this.updateCourse}
                                   course={course}/>)}
                    </tbody>
                </table>
            </div>
        )
    }
}
export default CourseList;