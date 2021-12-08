import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './addAlbum.css';
import { useHistory } from 'react-router-dom';
import { postAlbums } from '../../store/albums';

function AddAlbum() {
    const sessionUser = useSelector(state => state.session.user);
    const [title, setTitle] = useState('');
    const history = useHistory();
    const [description, setDisctiption] = useState("");
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            title,
            description,
            userId: sessionUser.id
        }
        history.push(`/showAlbums`);
        return dispatch(postAlbums(payload))
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Album Title</label>
                    <input placeholder="Title"
                        onChange={(e) => { setTitle(e.target.value) }}
                        value={title}
                    ></input>
                </div>
                <div>
                    <label>Album Disctiption</label>
                    <input placeholder="Disctiption"
                        onChange={(e) => { setDisctiption(e.target.value) }}
                        value={description}
                    ></input>
                </div>
                <button type="submit"></button>
            </form>
        </div>
    )
}

export default AddAlbum;
