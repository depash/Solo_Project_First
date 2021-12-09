import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './picsPage.css';
import { useHistory, useParams } from 'react-router';
import { getPics } from '../../store/pics';
import { PlusIcon } from "@heroicons/react/outline"

function PicPage() {
    const sessionUser = useSelector((state) => state.session.user);

    const params = useParams();
    const dispatch = useDispatch()
    const history = useHistory();
    useEffect(() => {
        dispatch(getPics(params.id))
    }, [dispatch])
    const pics = useSelector(state => state.pic.pic)
    // console.log(pics)
    const list = []

    for (const pic in pics) {
        let loggedIn = false
        if (pics[pic].userId === sessionUser.id) {
            loggedIn = true
        }
        list.push(<div class="picContainer"><img className="Pics" src={pics[pic].picture}></img>{loggedIn && <button>Delete</button>}</div>)
    }
    useEffect(() => {

    }, [pics])
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
                list

            }
        </div>
    )
}

export default PicPage;
