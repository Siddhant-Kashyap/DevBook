import axios from 'axios'


import {
    ACCOUNT_DELETED,
    CLEAR_PROFILE,
    GET_PROFILE,GET_PROFILES,GET_REPOS,PROFILE_ERROR,UPDATE_PROFILE
} from './types'


//GET curret userr profile

export const getCurrentProfile =() =>async (dispatch) =>{
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


//Get All the users

export const getProfiles =() =>async dispatch =>{
    dispatch({type:CLEAR_PROFILE})
    try {
        const res = await axios.get('/api/profile');
        dispatch({
            type:GET_PROFILES,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:PROFILE_ERROR,
            payload:{ msg:error.response.statusText,status:error.response.status}
        })
    }
}

//Get profile by id
export const getProfileById =userId =>async dispatch =>{
   
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
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

//get the github repos

export const getGithubRepos =username=>async dispatch =>{

    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        dispatch({
            type:GET_REPOS,
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



   

