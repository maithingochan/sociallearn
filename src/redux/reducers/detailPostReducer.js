import { EditData } from '../actions/globalType';
import { POST_TYPES } from '../actions/postAction'

const detailPostReducer = (state = [], action) => {
    switch (action.type){
        case POST_TYPES.GET_POST:
            return [...state, action.payload]
        case POST_TYPES.EDIT_POST: 
        return EditData(state, action.payload._id, action.payload)
        default:
            return state;
    }
}


export default detailPostReducer