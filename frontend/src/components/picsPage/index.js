import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './picsPage.css';
import { useHistory, useParams } from 'react-router';
import { deletePics, getPics } from '../../store/pics';
import { PlusIcon } from "@heroicons/react/outline"
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';

function PicPage() {
    const sessionUser = useSelector((state) => state.session.user);
    const params = useParams();
    const dispatch = useDispatch()
    const history = useHistory();
    useEffect(async () => {
        await dispatch(getPics(params.id))
    }, [dispatch])
    const picsObj = useSelector(state => ({ ...state.pic }))
    const pics = Object.values(picsObj)

    const onClickHandler = () => {
        history.push(`/albums/${params.id}/newPic`);
    }
    const onClickEditHandler = (e) => {

    }
    return (
        <div id="PicsPage">

            <div>
                <button id="addPicButton" onClick={onClickHandler}>
                    <PlusIcon className="icon Plus-Icon" />
                </button>
            </div>
            {
                pics.map(({ picture, id, albumId }, i) => (
                    params.id == albumId && <div key={i} class="picContainer">
                        <img className="Pics" src={picture}></img>
                        {<button id={id} onClick={() => { dispatch(deletePics(id)) }}>Delete</button>}
                        <NavLink to={`/albums/${albumId}/pics/${id}/edit`}><button id={id} onClick={onClickEditHandler}>Edit</button></NavLink>
                    </div>
                ))
            }
        </div>
    )
}

export default PicPage;
