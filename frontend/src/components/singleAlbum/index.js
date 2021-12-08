import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import './singleAlbums.css';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { postPics } from '../../store/pics';

function SingleAlbums() {
    const sessionUser = useSelector(state => state.session.user);
    const params = useParams();
    const dispatch = useDispatch()
    const history = useHistory()
    const [url, setUrl] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            url,
            albumId: params.id,
            userId: sessionUser.id
        }
        history.push(`/albums/${params.id}/pics`);
        dispatch(postPics(payload))
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Photo</label>
                    <input placeholder="URL"
                        onChange={(e) => { setUrl(e.target.value) }}
                        value={url}
                    ></input>
                </div>
                <button type="submit"></button>
            </form>
        </div>
    )
}

export default SingleAlbums;
