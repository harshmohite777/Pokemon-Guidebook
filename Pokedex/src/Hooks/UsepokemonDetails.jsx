import axios from "axios";
import { useEffect, useState } from "react";

function UsepokemonDetails(id) {
    const Pokemon_detail_url = "https://pokeapi.co/api/v2/pokemon/";
    const Pokemon_type_url = "https://pokeapi.co/api/v2/type/";

    const [pokemon, setPokemon] = useState(null); // State to store Pokémon details
    const [similarPokemons, setSimilarPokemons] = useState([]); // State to store similar Pokémon by type

    // Function to fetch Pokémon data
    async function downloadPokemon() {
        try {
            const response = await axios.get(`${Pokemon_detail_url}${id}`); // Fetch data from API
            const pokemonData = response.data;

            // Update state with the necessary details for the current Pokémon
            setPokemon({
                name: pokemonData.name,
                weight: pokemonData.weight,
                height: pokemonData.height,
                types: pokemonData.types,
                image: pokemonData.sprites.other.dream_world.front_default || pokemonData.sprites.front_default
            });

            // Fetch similar Pokémon based on the current Pokémon's types
            fetchSimilarPokemons(pokemonData.types);
        } catch (error) {
            console.error("Error fetching Pokémon details:", error.message);
        }
    }

    // Function to fetch similar Pokémon based on type
    async function fetchSimilarPokemons(types) {
        try {
            const similarPokemons = [];

            // Loop through all types of the current Pokémon
            for (let type of types) {
                const typeResponse = await axios.get(`${Pokemon_type_url}${type.type.name}`); // Fetch Pokémon by type
                const typeData = typeResponse.data;

                // Log the response to see the structure
                console.log(typeData);

                for (let pokemon of typeData.pokemon) {
                    // Add only if the Pokémon is not the same as the current Pokémon
                    if (pokemon.pokemon.name !== id && !similarPokemons.some(p => p.name === pokemon.pokemon.name)) {
                        similarPokemons.push(pokemon.pokemon);
                    }
                }
            }

            // Update the state with similar Pokémon (limit to 20)
            setSimilarPokemons(similarPokemons.slice(0, 20)); // Limit to first 20
        } catch (error) {
            console.error("Error fetching similar Pokémon:", error.message);
        }
    }

    // Fetch Pokémon data when the component mounts or the ID changes
    useEffect(() => {
        downloadPokemon();
    }, [id]);

    return { pokemon, similarPokemons }; // Return both the current Pokémon and similar Pokémon list
}

export default UsepokemonDetails;
