import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import './singleAlbums.css';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { postPics } from '../../store/pics';

function AddPicsPage() {
    const sessionUser = useSelector(state => state.session.user);
    const params = useParams();
    const dispatch = useDispatch()
    const history = useHistory()
    const [picture, setPicture] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            picture,
            albumId: params.id,
            userId: sessionUser.id
        }
        history.push(`/albums/${params.id}`);
        dispatch(postPics(payload))
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Photo</label>
                    <input placeholder="URL"
                        onChange={(e) => { setPicture(e.target.value) }}
                        value={picture}
                    ></input>
                </div>
                <button type="submit"></button>
            </form>
        </div>
    )
}

export default AddPicsPage;
