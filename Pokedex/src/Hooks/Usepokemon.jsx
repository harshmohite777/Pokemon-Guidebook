import './Usepokemon.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Usepokemon(Default_Url) {
    const [pokemonList, setPokemonList] = useState([]);
    const [pokedexurl, setPokedexurl] = useState("https://pokeapi.co/api/v2/pokemon");
    const [nexturl, setNexturl] = useState(null);
    const [prevurl, setPrevurl] = useState(null);

    async function downloadpokemon() {
        try {
            const response = await axios.get(pokedexurl || Default_Url);
            const pokemonResults = response.data.results;
            setNexturl(response.data.next);
            setPrevurl(response.data.previous);

            const pokemonPromises = pokemonResults.map((pokemon) =>
                axios.get(pokemon.url)
            );
            const pokemonListData = await Promise.all(pokemonPromises);

            const pokemonfinalist = pokemonListData.map((pokemonData) => {
                const pokemon = pokemonData.data;
                return {
                    id: pokemon.id, 
                    name: pokemon.name,
                    image: pokemon.sprites.other.dream_world.front_default || pokemon.sprites.front_default,
                    types: pokemon.types.map((type) => type.type.name),
                };
            });

            setPokemonList(pokemonfinalist);
        } catch (error) {
            console.error("Error fetching Pokémon data:", error);
        }
    }

    useEffect(() => {
        downloadpokemon();
    }, [pokedexurl]);

    return { pokedexurl, setPokedexurl, nexturl, prevurl, pokemonList };
}

export default Usepokemon;
