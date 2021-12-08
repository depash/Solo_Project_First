import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './albumsPage.css';
import { useHistory } from 'react-router';
import { Redirect } from 'react-router-dom';
import { getAlbums, postAlbums } from '../../store/albums';
import { PlusIcon } from "@heroicons/react/outline"

function AllAlbums() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        dispatch(getAlbums(sessionUser.username))
    }, [dispatch])
    const albums = useSelector(state => state.album)
    const list = []
    for (const album in albums) {
        if (sessionUser.id === albums[album].userId) {
            list.push(<Link to={`/albums/${albums[album].id}`}>{albums[album].title}</Link>)
        }
    }
    const onClickHandler = () => {
        history.push(`/addAlbums`);
    }
    return (
        <div>
            <div>
                <button id="addPicButton" onClick={onClickHandler}>
                    <PlusIcon className="icon Plus-Icon" />
                </button>
            </div>
            {
                list
            }
        </div>
    )
}

export default AllAlbums
