import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import "./SplashPage.css"


function SplashPage() {


    return (
        <div id="splashPage">
            <div id="boxContainer">
                <div id="splashBox">
                    <h1 id="title">Find your inspiration.</h1>
                    <h3 className="subTitle">Join the Picturocity community</h3>
                    <div id="linkContainer"><Link style={{ color: 'black', fontSize: "2rem" }} to="/signup">Start Now</Link></div>
                </div>
            </div>
        </div>
    )
}

export default SplashPage;
