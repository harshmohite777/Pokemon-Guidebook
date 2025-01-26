import React from 'react';
import './Pokemon.css';
import { Link } from 'react-router-dom';

function Pokemon({ id, name, url }) {
    return (
        <Link to={`/pokemon/${id}`} className="pokemon-wrapper">
            <div className="pokemon-card">
                <div className="pokemon-name">{name}</div>
                <div className="pokemon-image">
                    <img src={url} alt={name} />
                </div>
            </div>
        </Link>
    );
}

export default Pokemon;
