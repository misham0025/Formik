import React, { useState, useEffect} from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Link } from "react-router-dom";





function Todo() {



    const url = 'https://63ad6ce33e4651691659b7ff.mockapi.io/todo';

    const [data, setData] = useState([])
    const [displays, setDisplay] = useState('block')
    
    let loadData = async () => {
        let res = await axios.get(url)
        let response = res.data
        setData(response)
    }

    const [columnDefs] = useState([
        { field: 'task' },
        { field: 'date' },
        { field: 'priority' },
        {
            headerName: 'Action', field: 'action', cellRendererFramework: (params) =>
                <div>
                    <Link className='ediBtn' to={`/todo/edit/${params.data.id}`}>Edit</Link>
                    <button className='dltBtn' onClick={() => { deleteData(params) }} >Delete</button>
                </div>
        }
    ])

    useEffect(() => {
        loadData()
    }, [])

    let deleteData = async (props) => {
        let ask123 = window.confirm("Are you sure")
        if (ask123) {
            await axios.delete(`https://63ad6ce33e4651691659b7ff.mockapi.io/todo/${props.data.id}`)
        }
        loadData()
    }

    const formik = useFormik({
        initialValues: {
            task: '',
            date: '',
            priority: ''

        },
        validationSchema: Yup.object({
            task: Yup.string().required('Required'),

            date: Yup.string().required('Required'),

            priority: Yup.string().required('Required')

        }),
        onSubmit: async (values, { resetForm }) => {
            // let res = JSON.stringify(values, null, 2);
            // console.log(res)
            await axios.post(url, values)
            resetForm({ values: '' })
            loadData()
        },
    });


    return (

        <div className="wrapper2">
            <div><div className='logout'><Link to='/' className='link'>LOGOUT</Link></div>
                <div className="first">
                    <div className="formik">

                        <form onSubmit={formik.handleSubmit}>
                            <div className="heading">
                                <h2>TODO LIST</h2>
                            </div>
                            <div className="task">
                                <TextField fullWidth
                                    label="Task"
                                    type="text"
                                    name="task"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.task}

                                />
                                <br /></div>
                            <div className="date">
                                <TextField fullWidth
                                    type="date"
                                    name="date"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.date}
                                />
                                <br />
                            </div>
                            <div className="priority">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Priority</InputLabel>
                                    <Select
                                        id="priority"
                                        name="priority"
                                        type="dropdown"
                                        label='Priority'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.priority}
                                    >
                                        <MenuItem value="priority_1">Priority 1</MenuItem>
                                        <MenuItem value='priority_2'>Priority 2</MenuItem>
                                        <MenuItem value='priority_3'>Priority 3</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="submit">
                                <Button variant="contained" type='submit' size="large" disabled={!(formik.isValid && formik.dirty)}>
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="second">
                    {
                        data.length === 0 ? (
                            <div><h1>"No Data To Show"</h1></div>
                        ) : (
                            <div className="ag-theme-alpine" style={{ height: 370, width: 800, display: displays }}>
                                <AgGridReact
                                    rowData={data}
                                    columnDefs={columnDefs}>
                                </AgGridReact>
                            </div>
                        )
                    }

                </div>
            </div>
           
        </div>
    )
}

export default Todo

