import "./albumsbar.css"
import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import { getPics } from '../../store/pics';
import { getAlbums, postAlbums, deleteAlbums } from '../../store/albums';

import { PlusIcon } from "@heroicons/react/outline"
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function AlbumBar() {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const location = useLocation();
    useEffect(() => {
        dispatch(getAlbums(sessionUser.username))
    }, [dispatch, location])
    const albumsObj = useSelector(state => ({ ...state.album }))
    const album = Object.values(albumsObj)
    const onClickHandler = () => {
        history.push(`/addAlbums`);
    }
    return (
        <ul className="Bar">
            <button id="addAlbumButton" onClick={onClickHandler}>
                <PlusIcon className="icon Plus-Icon" />
            </button>
            {
                album.map(({ id, title, userId }, i) => (
                    sessionUser.id == userId && <li className="Albums" key={i}>
                        <Link className="AlbumTitle" to={`/albums/${id}`}>{title}</Link>
                        <div className="AlbumButtons">
                            <button className='imageButtons' onClick={(() => dispatch(deleteAlbums(id)))}>Delete</button>
                            <NavLink to={`/albums/${id}/edit`}><button className='imageButtons'>Edit</button></NavLink>
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default AlbumBar;
