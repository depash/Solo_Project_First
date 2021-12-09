import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import * as sessionActions from '../../store/session';
import "./SplashPage.css"


function SplashPage() {
    const dispatch = useDispatch()
    const history = useHistory()
    const onClickHandler = async () => {
        await dispatch(sessionActions.login({ credential: "demo@user.io", password: "password" }))
        history.push("/albums")
    }
    return (
        <div id="splashPage">
            <div id="boxContainer">
                <div id="splashBox">
                    <h1 id="title">Find your inspiration.</h1>
                    <h3 className="subTitle">Join the Picturocity community</h3>
                    <div id="linkContainer"><button style={{ color: 'black', fontSize: "2rem" }} onClick={onClickHandler}>Start Now</button></div>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;
