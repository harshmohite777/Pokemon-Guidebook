import { useEffect, useState } from 'react';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";  // Adjusted import path
import Usepokemon from '../../Hooks/Usepokemon';

function PokemonList() {
    const Default_Url = "https://pokeapi.co/api/v2/pokemon";

    const { pokedexurl, setPokedexurl, nexturl, prevurl, pokemonList } = Usepokemon(Default_Url);

    return (
        <div className="pokemon-list-wrapper">
            <h1>Pokemon List</h1>
            <div className="page-controls">
                <button onClick={() => prevurl && setPokedexurl(prevurl)} disabled={!prevurl}>
                    Prev
                </button>
                <button onClick={() => nexturl && setPokedexurl(nexturl)} disabled={!nexturl}>
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
