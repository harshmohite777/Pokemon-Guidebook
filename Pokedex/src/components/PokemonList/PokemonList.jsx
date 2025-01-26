import { useEffect, useState } from 'react';
import './PokemonList.css';
import axios from 'axios';
import Pokemon from "../Pokemon/Pokemon";  // Adjusted import path

function PokemonList() {
    const Defalt_Url = "https://pokeapi.co/api/v2/pokemon";
    const [pokemonList, setPokemonList] = useState([]);
    const [pokedexurl, setpokedexurl] = useState("https://pokeapi.co/api/v2/pokemon");
    const [nexturl, setNexturl] = useState(Defalt_Url);
    const [prevurl, setPrevurl] = useState(Defalt_Url);

    async function downloadpokemon() {
        try {
            const response = await axios.get(pokedexurl ? pokedexurl : Defalt_Url);
            const pokemonResults = response.data.results;
            setNexturl(response.data.next);
            setPrevurl(response.data.previous);

            const pokemonPromise = pokemonResults.map((pokemon) =>
                axios.get(pokemon.url)
            );
            const pokemonListData = await Promise.all(pokemonPromise);

            const pokemonfinalist = pokemonListData.map((pokemonData) => {
                const pokemon = pokemonData.data;
                return {
                    id: pokemon.id, // Make sure to include id here
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

    return (
        <div className="pokemon-list-wrapper">
            <h1>Pokemon List</h1>
            <div className="page-controls">
                <button onClick={() => prevurl && setpokedexurl(prevurl)} disabled={!prevurl}>
                    Prev
                </button>
                <button onClick={() => nexturl && setpokedexurl(nexturl)} disabled={!nexturl}>
                    Next
                </button>
            </div>

            <div className="pokemon-list">
                {pokemonList.map((pokemon) => (
                    <Pokemon
                        key={pokemon.id}   // The key should be pokemon.id
                        id={pokemon.id}     // Pass id to Pokemon component
                        name={pokemon.name}
                        url={pokemon.image}
                    />
                ))}
            </div>
        </div>
    );
}

export default PokemonList;
