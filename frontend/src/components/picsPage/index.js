import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './picsPage.css';
import { useHistory, useParams } from 'react-router';
import { deletePics, getPics } from '../../store/pics';
import { PlusIcon } from "@heroicons/react/outline"

function PicPage() {
    const sessionUser = useSelector((state) => state.session.user);
    const params = useParams();
    const dispatch = useDispatch()
    const history = useHistory();
    useEffect(async () => {
        await dispatch(getPics(params.id))
    }, [dispatch])
    const picsObj = useSelector(state => ({ ...state.pic }))
    console.log(picsObj)
    const pics = Object.values(picsObj)

    const onClickHandler = () => {
        history.push(`/albums/${params.id}/newPic`);
    }
    return (
        <div id="PicsPage">

            <div>
                <button id="addPicButton" onClick={onClickHandler}>
                    <PlusIcon className="icon Plus-Icon" />
                </button>
            </div>
            {
                pics.map(({ picture, id }, i) => (
                    <div key={i} class="picContainer"><img className="Pics" src={picture}></img>{<button id={id} onClick={() => { dispatch(deletePics(id)) }}>Delete</button>}</div>
                ))
            }
        </div>
    )
}

export default PicPage;
