import axios from 'axios'


import {
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILE,PROFILE_ERROR,UPDATE_PROFILE
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

//Add Experience

export const addExperience  =(formData,navigate)=>async dispatch =>{
    try{
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.put('/api/profile/experience',formData,config);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.send
        })
        navigate('/dashboard');
    
    }
    catch(error){
        dispatch({
            type:PROFILE_ERROR,
            payload:{ msg:error.response.statusText,status:error.response.status}
        })

    }
}


export const addEducation  =(formData,navigate)=>async dispatch =>{
    try{
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const res = await axios.put('/api/profile/education',formData,config);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.send
        })
        navigate('/dashboard');
    
    }
    catch(error){
        dispatch({
            type:PROFILE_ERROR,
            payload:{ msg:error.response.statusText,status:error.response.status}
        })

    }
}

export const deleteExperience =id=>async dispatch=>{
    try {
        const res= await axios.delete(`/api/profile/experience/${id}`);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{ msg:error.response.statusText,status:error.response.status}
        })
    }
}

export const deleteEducation =id=>async dispatch=>{
    try {
        const res= await axios.delete(`/api/profile/education/${id}`);
        dispatch({
            type:UPDATE_PROFILE,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{ msg:error.response.statusText,status:error.response.status}
        })
    }
}

export const deleteAccount =()=>async dispatch=>{
    if(window.confirm('ARE YOU SURE? THIS CAN NOT BE UNDONE')){

        try {
            const res= await axios.delete('/api/profile');
            dispatch({type:CLEAR_PROFILE})
            dispatch({type:ACCOUNT_DELETED})
        } catch (error) {
            dispatch({
                type:PROFILE_ERROR,
                payload:{ msg:error.response.statusText,status:error.response.status}
            })
        }
    }

    }

   

