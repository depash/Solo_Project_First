import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './editAlbumsPage.css';
import { useHistory } from 'react-router-dom';
import { putAlbums, getAlbums } from '../../store/albums';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function EditAlbumsPage() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAlbums(sessionUser.username))
    }, [dispatch])
    const albumsObj = useSelector(state => ({ ...state.album }))
    const parm = useParams()
    const [title, setTitle] = useState(albumsObj[parm.id].title);
    const history = useHistory();
    const [description, setDisctiption] = useState(albumsObj[parm.id].description);
    const [errors, setErrors] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            title,
            description,
            userId: sessionUser.id
        }
        const dispatcher = await dispatch(putAlbums(parm.id, payload))
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
                <button className="SubmitButtons" type="submit">Edit Album</button>
            </form>
        </div>
    )
}

export default EditAlbumsPage
