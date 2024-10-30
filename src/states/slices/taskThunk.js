import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { setTasks } from "./task.Slice";

const isAuthenticated = Cookies.get('token');

export const createTask = createAsyncThunk(
  'data/createTask',
  async ({ addTask }) => {
    try {
      if (isAuthenticated) {
        const response = await axios.post('http://localhost:3000/api/addTask', 
          { task: addTask },
          { withCredentials: true }
        );
        console.log('response: ', response);
        return response.data;
      } else {
        // Check the current number of tasks in local storage
        let tasks = JSON.parse(localStorage.getItem('task')) || [];
        if (tasks.length < 5) {
          tasks.push(addTask);
          localStorage.setItem('task', JSON.stringify(tasks));
        } else {
          console.warn("Task limit reached. Please log in to add more tasks.");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  }
);


export const getAllTasks = createAsyncThunk(
  'data/getAllTasks',
  async () => {
        if(isAuthenticated)
          {const { data } = await axios.get('http://localhost:3000/api/getTasks'
          ,
          {
            withCredentials: true
          }
        )
        console.log('all taskssssss: ', data);
        return data;}
        else{
          const tasks = JSON.parse(localStorage.getItem('task')) || [];
          dispatchEvent(setTasks(tasks));
          return tasks;
        }
  }
)
export const deleteAllTasks = createAsyncThunk(
  'data/deleteAllTask',
  async () => {
    try {
      const removeAll = await axios.delete('http://localhost:3000/api/deleteAllTasks')
      return removeAll;
    }
    catch (error) {
      console.log(error, "errrrrrrrrrrrrrrrrrrrrrrrrrrorrrrrrrrrrrr")
    }
  })

export const deleteByID = createAsyncThunk(
  'data/deleteByID',
  async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/deleteTaskByID/${id}`)
      console.log("deleteddd");
      return response
    }
    catch (error) {
      console.log(error, "errrrrrrrrrrrrrrrrrrrrrrrrrrorrrrrrrrrrrr")
    }
  }
)
export const updateTask = createAsyncThunk(
  'data/updateByID',
  async ({ id, editedTask }) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/updateTask/${id}`, { task: editedTask })
      console.log("updated");
      return response
    }
    catch (error) {
      console.log(error, "errrrrrrrrrrrrrrrrrrrrrrrrrrorrrrrrrrrrrr")
    }
  }
)

