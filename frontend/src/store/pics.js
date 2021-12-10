import { csrfFetch } from './csrf';

const CREATE_PICS = "pics/createPics"
const LOAD_PICS = "pics/loadPics"
const DELETE_PICS = "pics/deletePics"
const EDIT_PICS = "pics/editPics"

const createPic = (picture) => {
    return {
        type: CREATE_PICS,
        picture
    }
}
const loadPics = (picture) => {
    return {
        type: LOAD_PICS,
        picture
    }
}

const DeletePics = (picture) => {
    return {
        type: DELETE_PICS,
        picture
    }
}

const editPic = (picture) => {
    return {
        type: EDIT_PICS,
        picture
    }
}

export const postPics = (PicInfo) => async (dispatch) => {
    const response = await csrfFetch('/api/pics', {
        method: 'POST',
        body: JSON.stringify({
            PicInfo
        })
    })
    const pic = await response.json();
    dispatch(createPic(pic));
    return response;
}

export const getPics = (albumId) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums/${albumId}/pics`)
    const pics = await response.json()
    dispatch(loadPics(pics))
    return response
}

export const deletePics = (picId) => async (dispatch) => {
    const response = await csrfFetch(`/api/pics/${picId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const deletedPic = await response.json()
        dispatch(DeletePics(deletedPic))
        return response;
    }
}

export const putPics = (picId, PicInfo) => async (dispatch) => {
    const response = await csrfFetch(`/api/pics/${picId}`, {
        method: "PUT",
        body: JSON.stringify({
            PicInfo
        })
    })
    const editedPic = await response.json()
    dispatch(editPic(editedPic))
    return response;
}

const initialState = {};

const picReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PICS: {
            const newState = { ...state };
            action.picture.forEach((element) => {
                newState[element.id] = element;
            });
            return newState;
        }

        case CREATE_PICS:
            const newState = {
                ...state,
                [action.picture.id]: action.picture
            };
            return newState
        case DELETE_PICS: {
            const newState = { ...state }
            delete newState[action.picture.id];
            return newState
        }
        case EDIT_PICS: {
            const newState = {
                ...state,
                [action.picture.id]: action.picture
            }
            return newState;
        }
        default:
            return state
    }
}

export default picReducer;
