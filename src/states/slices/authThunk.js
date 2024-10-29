import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const signup = createAsyncThunk(
    'auth/signup',
    async (payload) => {
        try {
            const response = await axios.post('http://localhost:3000/api/signup', {
                name: payload.name,
                email: payload.email,
                password: payload.password
            })
            return response
        }
        catch (error) {
            console.log("error:", error)
        }
    })

export const login = createAsyncThunk(
    'auth/login',
    async ({ data, onSuccess }, { rejectWithValue }) => {
        console.log('payload: ', data);
        try {
            const response = await axios.post('http://localhost:3000/api/login', {
                email: data.email,
                password: data.password
            })
            if(response.status === 200 ) {
                onSuccess();
                Cookies.set("token",response.data.token);
                const token = Cookies.get('token');
                console.log('token: ', token);
                return response.data
            }
        }
        catch (error) {
            console.log("error:", error)
            return rejectWithValue(error)

        }
    })

    export const logout = createAsyncThunk(
        'data/logout' ,
        async ()=>{
          try{
             Cookies.remove('token');
          }
          catch(error){
            console.log("error", error)
          }
        }
      )