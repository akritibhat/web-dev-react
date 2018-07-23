import React from 'react';
import { Link } from 'react-router-dom'


class CourseRow extends React.Component {
    render() {
        return (
            <tr>
                <td>

                    <Link to={`/course/${this.props.course.id}`}>
                        {this.props.course.title}
                    </Link>


                </td>
                <td>me</td>
                <td>
                    {this.props.course.modified}
                </td>
                <td>
                    <button className="btn btn-danger"
                            onClick={(e) => { if (window.confirm('Are you sure you wish to delete this course?')) this.props.deleteCourse(this.props.course.id) } }>
                        Delete
                    </button>
                </td>
            </tr>
        )
    }
}
export default CourseRow;
