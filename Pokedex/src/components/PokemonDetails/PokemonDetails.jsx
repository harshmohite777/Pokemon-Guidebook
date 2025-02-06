import { Link, useParams } from 'react-router-dom';
import './PokemonDetails.css';
import { useEffect, useState } from 'react';
import UsepokemonDetails from '../../Hooks/UsepokemonDetails';

function PokemonDetails() {
    const { id } = useParams(); // Get the Pokémon ID from the URL
    const { pokemon, similarPokemons } = UsepokemonDetails(id); // Get the current Pokémon and similar Pokémon

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

                {/* Display similar Pokémon */}
                <div className="similar-pokemon">
                    <h2>Similar Pokémon:</h2>
                    {similarPokemons.length > 0 ? (
                        <div className="pokemon-list-similar">
                            {similarPokemons.map((similar) => (
                                <div className="pokemon-similar" key={similar.name}>
                                    <img 
    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${similar.url.split("/")[6]}.png`} 
    alt={similar.name} 
    onError={(e) => e.target.src = "https://via.placeholder.com/150"} 
/>

                                    <p>{similar.name}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No similar Pokémon found</p>
                    )}
                </div>
            </>
        ) : (
            <p>Loading Pokémon details...</p> // Show a loading message while data is being fetched
        )
    );
}

export default PokemonDetails;
