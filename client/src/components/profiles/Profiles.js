import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import LoadingScreen from '../Layout/LoadingScreen'
import {getProfiles} from '../../action/profile'
import ProfileItem from './ProfileItem'


const Profiles = ({getProfiles,profile:{profiles,loading}}) => {
    useEffect(() => {
        getProfiles();
    }, [])
    return (
        <section className="container">
          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              <h1 className="large text-primary">Developers</h1>
              <p className="lead">
                <i className="fab fa-connectdevelop" /> Browse and connect with
                developers
              </p>
              <div className="profiles">
                {profiles.length > 0 ? (
                  profiles.map((profile) => (
                    <ProfileItem key={profile._id} profile={profile} />
                  ))
                ) : (
                  <h4>No profiles found...</h4>
                )}
              </div>
            </>
          )}
        </section>
      );
    
  
  
}

Profiles.propTypes = {
    getProfiles:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired
}
const mapStateToProps =state =>({
    profile:state.profile
})
export default connect(mapStateToProps,{getProfiles}) (Profiles)