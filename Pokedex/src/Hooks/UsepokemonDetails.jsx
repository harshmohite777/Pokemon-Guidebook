import axios from "axios";
import { useEffect, useState } from "react";

function UsepokemonDetails(id) {
    const Pokemon_detail_url = "https://pokeapi.co/api/v2/pokemon/";

    const [pokemon, setPokemon] = useState(null); // State to store Pokémon details

    // Function to fetch Pokémon data
    async function downloadPokemon() {
        try {
            const response = await axios.get(`${Pokemon_detail_url}${id}`); // Fetch data from API
            const pokemonData = response.data;

            // Update state with the necessary details
            setPokemon({
                name: pokemonData.name,
                weight: pokemonData.weight,
                height: pokemonData.height,
                types: pokemonData.types,
                image: pokemonData.sprites.other.dream_world.front_default || pokemonData.sprites.front_default
            });
        } catch (error) {
            console.error("Error fetching Pokémon details:", error.message);
        }
    }

    // Fetch Pokémon data when the component mounts or the ID changes
    useEffect(() => {
        downloadPokemon();
    }, [id]);

    return pokemon; // Return pokemon object directly
}

export default UsepokemonDetails;
