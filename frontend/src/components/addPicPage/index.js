import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './addPic.css';

function AddPic() {
    const sessionUser = useSelector(state => state.session.user);
    return (
        <div>
            <form >
                <div>
                    <label>Picture url</label>
                    <input placeholder="url"></input>
                </div>
                <button type="submit"></button>
            </form>
        </div>
    )
}

export default AddPic;
