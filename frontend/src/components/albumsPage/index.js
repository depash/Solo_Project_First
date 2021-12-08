import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './albumsPage.css';
import { Redirect } from 'react-router-dom';
import { postAlbums } from '../../store/albums';

function AllAlbums() {
    return (
        <h2>hello</h2>
    )
}

export default AllAlbums
