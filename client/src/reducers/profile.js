import { GET_PROFILE,PROFILE_ERROR } from "../action/types";

const initialState ={
    pofile :null,
    profiles:[],
    repos:[],
    loading :true,
    error:{}
}

export default function foo(state = initialState,action){
    const {type,payload}=action;


    switch(type){
        case GET_PROFILE:
            return {
                ...state,
                profile:payload,
                loading:false
            }
        case PROFILE_ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            }
        default:
            return state;
    }
}