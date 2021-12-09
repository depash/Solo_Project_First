import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import './singleAlbums.css';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { postPics } from '../../store/pics';

function AddPicsPage() {
    const sessionUser = useSelector(state => state.session.user);
    const params = useParams();
    const dispatch = useDispatch()
    const history = useHistory()
    const [picture, setPicture] = useState("");
    const [errors, setErrors] = useState(false)
    useEffect(() => {
        if (picture === "") {
            setErrors(true)
        }
        else {
            setErrors(false)
        }
    }, [picture])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            picture,
            albumId: params.id,
            userId: sessionUser.id
        }
        if (!errors) {
            await dispatch(postPics(payload))
            history.push(`/albums/${params.id}`);
        }
    }
    return (
        <div>
            {errors && <h3>please Enter a url</h3>}
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
