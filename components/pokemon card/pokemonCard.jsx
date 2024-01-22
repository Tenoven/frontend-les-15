import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./pokemoncard.css"

function PokemonCard(props) {

    const [pokemonData, setPokemonData] = useState([])
    const [loaded, setloaded] = useState(false)

    async function getPokemon() {
        try {
            const result = await axios.get(props.endpoint);
            // console.log('result.pokemon: ', result.data)
            setPokemonData(result.data)

        } catch (e) {
            console.error(e);
            alert("Info couldn't be loaded\ntry again")
        }
        finally {
            setloaded(true)
        }
    }

    useEffect(()=> {
        getPokemon()
    },[props.endpoint])

    return (
        <>

            {loaded && (

                <div className="pokemonCard">
                    <h3>{pokemonData.name}</h3>
                    <img src={pokemonData.sprites.front_default} alt=""/>
                    <p>moves: {pokemonData.moves.length}</p>
                    <p>weight: {pokemonData.weight}</p>
                    <p>abilities:</p>
                    <ul>
                        {pokemonData.abilities.map((pokemon) => {
                            return <li key={pokemon.ability.name}> {pokemon.ability.name} </li>
                        })
                        }
                    </ul>
                </div>

            )}
        </>
    );
}

export default PokemonCard;