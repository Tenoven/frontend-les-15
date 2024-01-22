import './App.css'
import axios from "axios";
import React, {useEffect, useState} from 'react';
import PokemonCard from "../components/pokemon card/pokemonCard.jsx";


function App() {
    const [pokemonData, setPokemonData] = useState([])
    const [loaded, setloaded] = useState(false)
    const [apiLink, setApiLink] = useState(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=0`)

    useEffect(() => {
        getPokemon()
    async function getPokemon() {
            try {
                const result = await axios.get(apiLink);
                console.log('result.data: ', result.data)
                setPokemonData(result.data)

            } catch (e) {
                console.error(e);
                alert("Info couldn't be loaded\ntry again")
            }
            finally {
                setloaded(true)
            }
    }

    }, [apiLink])


    useEffect(() => {
        console.log(pokemonData);
    }, [pokemonData]);

    return (
        <>
            <h1>peter</h1>
            <button type="button"
                    disabled={!pokemonData.previous}
                    onClick={() => {
                setApiLink(pokemonData.previous);
                console.log(pokemonData)
            }}>
                previous
            </button>

            <button type="button"
                    disabled={!pokemonData.next}
                    onClick={() => {
                setApiLink(pokemonData.next);
                console.log(pokemonData)}}>
                next
            </button>

            {loaded && (

                <section>
                    {pokemonData.results.map((pokemon) => (
                    <PokemonCard endpoint={pokemon.url}></PokemonCard>
                         ))}
                </section>

            )}
        </>
    );

}

export default App
