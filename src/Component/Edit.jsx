import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import React, { useEffect,useState } from 'react'
import { useFormik } from 'formik'
import axios from 'axios'

function Edit() {

    const formik=useFormik({
        initialValues:{
          task:"",
          date:"",
          priority:"",
          },
        validate:(values)=>{
          let error ={};
         
          return error
        },
        onSubmit : async(values)=>{
            if(values.task===value1.data.task){
                alert("Nothing Changed")
              }else{
                await axios.put(`https://63ad6ce33e4651691659b7ff.mockapi.io/todo/${params.id}`,values)
                alert("updated successfully")
                navigate("/todo")
              }
        
        
        } });
    const[value1,setValue]=useState({})
        useEffect(()=>{
          loadUser()
        },[])
        const navigate =useNavigate()
        const params = useParams()
      
        let loadUser=async()=>{
          try{
            let user = await axios.get(`https://63ad6ce33e4651691659b7ff.mockapi.io/todo/${params.id}`)
            setValue(user)
            console.log(user.data.task)
            formik.setValues({
                task:user.data.task,
                priority:user.data.priority,
                date:user.data.data,
               
              })
          }
          catch(error){}
        }
    
    
    
    
  return (
    <div className='container'>
    <form onSubmit={formik.handleSubmit}>
      <div className='row'>
        <div className='col-lg-6'>
          <label>Task</label>
          <input className='form-control' type={"text"}
          value={formik.values.task}
          onChange={formik.handleChange}
          name="task"
          ></input>


        </div>
        <div className='col-lg-6'>
          <label>Date</label>
          <input className="form-control" type={"date"}
          value={formik.values.date}
          onChange={formik.handleChange}
          name="date"></input>
        </div>


        <div className='col-lg-6'>
          <label>Priority</label>
          <input className='form-control' type={"text"}
          value={formik.values.priority}
          onChange={formik.handleChange}
          name="priority"></input>
        </div>


        <div className='col-lg-6'>    
          <input className='btn btn-primary mt-2' type={"submit"} disabled={!formik.isValid} value="submit"></input>
        </div>

      </div>
    </form>
    </div>
  )
}

export default Edit