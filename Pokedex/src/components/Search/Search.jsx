import React, { useState } from "react";
import axios from "axios";
import "./Search.css";

function Search({ setSearchedPokemon }) {
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");

    const handleSearch = async () => {
        if (!query) {
            setError("Please enter a Pokémon name or ID");
            return;
        }

        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
            const data = response.data;

            setSearchedPokemon({
                id: data.id,
                name: data.name,
                image: data.sprites.other.dream_world.front_default || data.sprites.front_default,
                height: data.height,
                weight: data.weight,
                types: data.types.map((t) => t.type.name),
            });

            setError("");  // Clear error when search is successful
        } catch (err) {
            setError("Pokémon not found!");
            setSearchedPokemon(null);
        }
    };

    // Clear error when input value changes
    const handleChange = (e) => {
        setQuery(e.target.value);
        setError(""); // Remove error message when typing
    };

    return (
        <div className="search-container">
            <input
                id="search-pokemon"
                type="text"
                placeholder="Which Pokémon do you want to search?"
                value={query}
                onChange={handleChange} // Calls handleChange to reset error
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Search;
