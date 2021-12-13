import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './albumsPage.css';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import { getAlbums, postAlbums, deleteAlbums } from '../../store/albums';
import { PlusIcon } from "@heroicons/react/outline"

function AllAlbums() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        dispatch(getAlbums(sessionUser.username))
    }, [dispatch])
    const albumsObj = useSelector(state => ({ ...state.album }))
    const album = Object.values(albumsObj)
    const onClickHandler = () => {
        history.push(`/addAlbums`);
    }
    const onClickAlbum = (e) => {
        history.push(`/albums/${e.target.id}`);
    }
    return (
        <div id="albumPageContainer">

        </div>
    )
}

export default AllAlbums
