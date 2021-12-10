import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import './editPicsPage.css';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { putPics, getPics } from '../../store/pics';

function EditPicsPage() {
    const sessionUser = useSelector(state => state.session.user);
    const params = useParams();
    const { albumId, PictureId } = params;
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(async () => {
        await dispatch(getPics(params.id))
    }, [dispatch])
    const picsObj = useSelector(state => ({ ...state.pic }))
    const [picture, setPicture] = useState(picsObj[PictureId].picture);
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
            albumId,
            userId: sessionUser.id
        }
        if (!errors) {
            await dispatch(putPics(PictureId, payload))
            history.push(`/albums/${albumId}`);
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
                <button type="submit">Edit Picture</button>
            </form>
        </div>
    )
}

export default EditPicsPage;
