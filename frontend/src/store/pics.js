import { csrfFetch } from './csrf';

const CREATE_PICS = "pics/createPics"
const LOAD_PICS = "pics/loadPics"

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

const initialState = { pic: {} };

const picReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PICS: {
            const newState = { ...state, pic: {} };
            action.picture.forEach((element) => {
                newState.pic[element.id] = element;
            });
            return newState;
        }

        case CREATE_PICS:
            const newState = {
                ...state,
                [action.id]: action.Pic
            };
            return newState
        default:
            return state
    }
}

export default picReducer;
