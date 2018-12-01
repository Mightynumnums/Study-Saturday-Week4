import React, { Component } from 'react';
import axios from 'axios';

import StudentList from './StudentList.js'
import SingleStudent from './SingleStudent.js'
import NewStudentForm from './NewStudentForm'

export default class Main extends Component {
    constructor(props) {
        super(props)
        this.state = {
            students: [],
            selectedStudent: {},
            showForm: false
        }
        this.selectStudent = this.selectStudent.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.addStudent = this.addStudent.bind(this)
    }

    componentDidMount() {
        this.getStudents()
    }

    async getStudents() {
        console.log("fetching")
        try {
            const { data } = await axios.get('/student')
            this.setState({ students: data })
            console.log('Our state in the main component:', this.state)
        }
        catch (err) {
            console.log(err)
        }
    }

    selectStudent(student) {
        return this.setState({
            selectedStudent: student
        })
    }

    async addStudent(student) {
        const { data } = await axios.post('/student', student)
        this.setState({
            students: [...this.state.students, data],
            showForm: false
        })
    }

    handleClick(event) {
        return this.setState({
            showForm: !this.state.showForm
        })
    }

    render() {
        return (
            <div>
                <h1>Students</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Tests</th>
                        </tr>
                    </thead>
                    < StudentList students={this.state.students} selectStudent={this.selectStudent} />
                </table>
                {
                    this.state.selectedStudent.id ? <SingleStudent student={this.state.selectedStudent} /> : null
                }
                <button onClick={this.handleClick}>Add Student</button>
                {
                    this.state.showForm ? <NewStudentForm addStudent={this.addStudent} /> : null
                }
            </div>
        )
    }
}