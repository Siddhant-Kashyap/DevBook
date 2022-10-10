import axios from 'axios'


import {
    GET_PROFILE,PROFILE_ERROR
} from './types'


//GET curret userr profile

export const getCurrentProfile =() =>async dispatch =>{
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{ msg:error.response.statusText,status:error.response.status}
        })
    }
}
//create or update profile
export const createProfile = (formData,navigate,edit = false)=>async dispatch  =>{
    try{
        const config = {
            header: {
                'Content-Type':'application/json'
            }
        }
        const res =await axios.post('/api/profile',formData,config);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
        
        if(!edit){
            navigate('/dashboard')
        }
    }catch(error){
        dispatch({
            type:PROFILE_ERROR,
            payload:{ msg:error.response.statusText,status:error.response.status}
        })
    }
}