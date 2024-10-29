import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createTask = createAsyncThunk(
    'data/createTask',
    async ({addTask}) => {
        try{
            console.log(typeof addTask,"payload")
            const response = await axios.post('http://localhost:3000/api/addTask', { task: addTask });
            console.log('response: ', response);
            return response.data;
       }
        catch(error){
          console.log("error", error);
        }
   
  });

  export const getAllTasks = createAsyncThunk(
    'data/getAllTasks',
    async()=>{
       const { data } = await axios.get('http://localhost:3000/api/getTasks')
       console.log('all taskssssss: ', data);
       return data;
    }
  )
  export const deleteAllTasks = createAsyncThunk(
  'data/deleteAllTask',
  async ()=>{
    try{
        const removeAll = await axios.delete('http://localhost:3000/api/deleteAllTasks')
        return removeAll;
    }
    catch(error){
      console.log(error,"errrrrrrrrrrrrrrrrrrrrrrrrrrorrrrrrrrrrrr")
    }
  })

  export const deleteByID = createAsyncThunk(
    'data/deleteByID' ,
    async (id)=>{
        try {
            const response = await axios.delete(`http://localhost:3000/api/deleteTaskByID/${id}`)
            console.log("deleteddd");
            return response
        }
        catch(error){
            console.log(error,"errrrrrrrrrrrrrrrrrrrrrrrrrrorrrrrrrrrrrr")
        }
    }
  )
  export const updateTask = createAsyncThunk(
    'data/updateByID' ,
    async ({id , editedTask})=>{
        try {
            const response = await axios.put(`http://localhost:3000/api/updateTask/${id}`, { task: editedTask })
            console.log("updated");
            return response
        }
        catch(error){
            console.log(error,"errrrrrrrrrrrrrrrrrrrrrrrrrrorrrrrrrrrrrr")
        }
    }
  )

  