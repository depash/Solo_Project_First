import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './picsPage.css';
import { useParams } from 'react-router';
import { getPics } from '../../store/pics';


function PicPage() {
    const params = useParams();
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPics(params.id))
    }, [dispatch])
    const pics = useSelector(state => state.pic)
    const list = []
    for (const pic in pics) {
        list.push(<Link to={`/albums/${pics[pic].id}`}>{pics[pic].title}</Link>)
    }
    return (
        <div>
            {
                list
            }
        </div>
    )
}

export default PicPage;
