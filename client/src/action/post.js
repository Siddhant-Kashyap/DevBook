import axios from 'axios'
import {
    DELETE_POST,
    GET_POSTS,POST_ERROR, UPDATE_LIKES,ADD_POST,GET_POST
} from './types'

//GET ALL thePOST
export const getPosts=()=> async dispatch =>{
    try {
        const res = await axios.get('api/posts')
        dispatch({
            type:GET_POSTS,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{ msg:error.response.statusText,status:error.response.status}
        })
        
    }
}

//Add Like
export const addLike=(id)=> async dispatch =>{
    try {
        const res = await axios.put(`/api/posts/like/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:res.data}
        })
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{ msg:error.response.statusText,status:error.response.status}
        })
        
    }
}
//remove Like
export const removeLike=id=> async dispatch =>{
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`)
        dispatch({
            type:UPDATE_LIKES,
            payload:{id,likes:res.data}
        })
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{ msg:error.response.statusText,status:error.response.status}
        })
        
    }
}

export const deletePost=id=> async dispatch =>{
    try {
       await axios.delete(`/api/posts/${id}`)
        dispatch({
            type:DELETE_POST,
            payload:id
        })
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{ msg:error.response.statusText,status:error.response.status}
        })
        
    }
}

export const addPost=formData=> async dispatch =>{
    const config ={
        headers:{
            'Content-Type':'application/json'
        }
    }
    try {
        const res = await axios.post(`/api/posts/`,formData,config)
        dispatch({
            type:ADD_POST,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{ msg:error.response.statusText,status:error.response.status}
        })
        
    }
}

export const getPost=id=> async dispatch =>{
    try {
        const res = await axios.get(`api/posts/${id}`)
        dispatch({
            type:GET_POST,
            payload:res.data
        })
    } catch (error) {
        dispatch({
            type:POST_ERROR,
            payload:{ msg:error.response.statusText,status:error.response.status}
        })
        
    }
}