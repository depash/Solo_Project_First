import React, { useEffect, useState } from 'react';
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
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([])
        const payload = {
            title,
            description,
            userId: sessionUser.id
        }
        const dispatcher = await dispatch(postAlbums(payload))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
        if (dispatcher !== undefined) {
            history.push("/albums")
        }
    }
    return (
        <div className='formBackground'>
            <form className='AlbumsForm' onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                </ul>
                <div className='InputContainers'>
                    <label>Album Title</label>
                    <input placeholder="Title"
                        onChange={(e) => { setTitle(e.target.value) }}
                        value={title}
                    ></input>
                </div>
                <div className='InputContainers'>
                    <label>Album Disctiption</label>
                    <input placeholder="Disctiption"
                        onChange={(e) => { setDisctiption(e.target.value) }}
                        value={description}
                    ></input>
                </div>
                <button className="SubmitButtons" type="submit">Add Album</button>
            </form>
        </div>
    )
}

export default AddAlbum;
