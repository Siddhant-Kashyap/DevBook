import React ,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import LoadingScreen from '../Layout/LoadingScreen'
import { getPost } from '../../action/post'
import { useParams } from 'react-router-dom'


const Post =({ getPost, post: { post, loading },match }) => {
    const {id} =useParams();
    useEffect(()=>{
        getPost(id)
    },[getPost,id])
  return (
    <div>Post</div>
  )
}

Post.propTypes = {
 getPost:PropTypes.func.isRequired,
 post:PropTypes.object.isRequired
}
const mapStateToProp=state =>({
    post:state.post
})

export default connect(mapStateToProp,{getPost}) (Post)