import { Link, useParams } from 'react-router-dom';
import './PokemonDetails.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

function PokemonDetails() {
    const { id } = useParams(); // Get the Pokémon ID from the URL
    console.log(id);
    
    const Pokemon_detail_url = "https://pokeapi.co/api/v2/pokemon/";

    const [pokemon, setPokemon] = useState(null); // State to store Pokémon details

    // Function to fetch Pokémon data
    async function downloadPokemon() {
        try {
            const response = await axios.get(`${Pokemon_detail_url}${id}`); // Fetch data from API
            const pokemon = response.data;

            // Update state with the necessary details
            setPokemon({
                name: pokemon.name,
                weight: pokemon.weight,
                height: pokemon.height,
                types: pokemon.types,
                image: pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default
            });
        } catch (error) {
            console.error("Error fetching Pokémon details:", error.message);
        }
    }

    // Fetch Pokémon data when the component mounts or the ID changes
    useEffect(() => {
        downloadPokemon();
    }, [id]);

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
