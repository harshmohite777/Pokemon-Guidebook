import { useState } from 'react';
import PokemonList from '../PokemonList/PokemonList';
import Search from '../Search/Search';
import './Pokedex.css';

function Pokedex() {
    const [searchedPokemon, setSearchedPokemon] = useState(null);

    return (
        <div className='pokedex-wrapper'>
            <h1>POKEDEX</h1>
            <Search setSearchedPokemon={setSearchedPokemon} />

            {/* Show searched Pokémon details if available, otherwise show full list */}
            {searchedPokemon ? (
                <div className="pokemon-details">
                    <h2>{searchedPokemon.name.toUpperCase()}</h2>
                    <img src={searchedPokemon.image} alt={searchedPokemon.name} />
                    <p><strong>ID:</strong> {searchedPokemon.id}</p>
                    <p><strong>Height:</strong> {searchedPokemon.height}</p>
                    <p><strong>Weight:</strong> {searchedPokemon.weight}</p>
                    <p><strong>Type:</strong> {searchedPokemon.types.join(", ")}</p>
                    <button className="back-button" onClick={() => setSearchedPokemon(null)}>Back</button>

                </div>
            ) : (
                <PokemonList />
            )}
        </div>
    );
}

export default Pokedex;
