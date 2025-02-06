import { Link, useParams } from 'react-router-dom';
import './PokemonDetails.css';
import { useEffect, useState } from 'react';
import UsepokemonDetails from '../../Hooks/UsepokemonDetails';

function PokemonDetails() {
    const { id } = useParams(); // Get the Pokémon ID from the URL
    const pokemon = UsepokemonDetails(id);

    return (
        pokemon ? ( // If Pokémon data is available, render it
            <>
                <h1 className="pokemon-title">
                    <Link to="/">Home</Link>
                </h1>
                <div className="pokemon-details">
                    <h1>{pokemon.name.toUpperCase()}</h1>
                    <img src={pokemon.image} alt={pokemon.name} />
                    <div>
                        <p><strong>Height:</strong> {pokemon.height}</p>
                        <p><strong>Weight:</strong> {pokemon.weight}</p>
                    </div>
                    <div>
                        <p><strong>Type:</strong> 
                            {pokemon.types.map(t => (
                                <span key={t.type.name}>{t.type.name} </span>
                            ))}
                        </p>
                    </div>
                </div>
            </>
        ) : (
            <p>Loading Pokémon details...</p> // Show a loading message while data is being fetched
        )
    );
}

export default PokemonDetails;
