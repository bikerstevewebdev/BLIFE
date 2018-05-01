import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deprecatePhoto } from '../../ducks/userReducer';

// import { Link } from 'react-router-dom'

function PhotoCard(props) {
    return(
        <section className="photo-card">
            <Link to='/dashboard'><img  src={props.src} alt={props.alt} /></Link>
            <p>Date Added: {props.date_added.slice(0, 10)}</p>
            <button onClick={() => props.deprecatePhoto(props.photo_id)}>This photo is old, archive it</button>
        </section>
    )
}
export default connect(null, { deprecatePhoto })(PhotoCard)