import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './albumsPage.css';
import { Redirect } from 'react-router-dom';
import { getAlbums, postAlbums } from '../../store/albums';

function AllAlbums() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAlbums(sessionUser.username))
    }, [dispatch])
    const albums = useSelector(state => state.album)
    const list = []
    for (const album in albums) {
        list.push(<Link to={`/albums/${albums[album].id}`}>{albums[album].title}</Link>)
    }
    return (
        <div>
            {
                list
            }
        </div>
    )
}

export default AllAlbums
