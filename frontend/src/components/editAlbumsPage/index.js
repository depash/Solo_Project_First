import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './editAlbumsPage.css';
import { useHistory } from 'react-router-dom';
import { putAlbums } from '../../store/albums';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function EditAlbumsPage() {
    const sessionUser = useSelector(state => state.session.user);
    const parm = useParams()
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
        history.push(`/albums`);
        return dispatch(putAlbums(parm.id, payload))
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
                <button type="submit">Edit Album</button>
            </form>
        </div>
    )
}

export default EditAlbumsPage
