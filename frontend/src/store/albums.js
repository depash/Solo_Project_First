import { csrfFetch } from './csrf';

const CREATE_ABLUMS = "albums/createAlbums"
const LOAD_ALBUMS = "albums/loadAlbums"
const DELETE_ALBUMS = "albums/deleteAlbums"
const EDIT_ALBUMS = "albums/editAlbums"

const createAlbums = (album) => {
    return {
        type: CREATE_ABLUMS,
        album
    }
}

const loadAlbums = (albums) => {
    return {
        type: LOAD_ALBUMS,
        albums
    }
}

const deleteAlbumsAction = (albums) => {
    return {
        type: DELETE_ALBUMS,
        albums
    }
}

const editAlbum = (album) => {
    return {
        type: EDIT_ALBUMS,
        album
    }
}

export const postAlbums = (albumInfo) => async (dispatch) => {
    const response = await csrfFetch('/api/albums', {
        method: 'POST',
        body: JSON.stringify({
            albumInfo
        })
    })
    const album = await response.json();
    dispatch(createAlbums(album));
    return response;
}

export const getAlbums = (id) => async (dispatch) => {
    const response = await csrfFetch(`api/albums/${id}`)
    const albums = await response.json()
    dispatch(loadAlbums(albums))
    return response
}

export const deleteAlbums = (albumId) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums/${albumId}`, {
        method: "DELETE"
    })
    if (response.ok) {
        const deletedAlbum = await response.json()
        dispatch(deleteAlbumsAction(deletedAlbum))
        return response;
    }
}

export const putAlbums = (albumId, albumInfo) => async (dispatch) => {
    const response = await csrfFetch(`/api/albums/${albumId}`, {
        method: "PUT",
        body: JSON.stringify({
            albumInfo
        })
    })
    const editedAlbum = await response.json()
    dispatch(editAlbum(editedAlbum))
    return response;
}

const initialState = {};

const albumReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALBUMS:
            const allAlbums = {}
            action.albums.forEach(element => {
                allAlbums[element.id] = element
            });
            return {
                ...state,
                ...allAlbums
            };
        case CREATE_ABLUMS:
            const newState = {
                ...state,
                [action.album.id]: action.album
            };
            return newState
        case DELETE_ALBUMS: {
            const newState = { ...state }
            delete newState[action.albums.id];
            return newState
        }
        case EDIT_ALBUMS: {
            const newState = {
                ...state,
                [action.album.id]: action.album
            }
            return newState;
        }
        default:
            return state
    }
}

export default albumReducer;
