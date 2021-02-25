import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPokemonList } from '../store'
import { Link } from 'react-router-dom'

function Home () {
  const pokemonList = useSelector(state => state.pokemonList)
  const dispatch = useDispatch()
  console.log(pokemonList, '<<< ini isi pokemon list')

  useEffect (() => {
    dispatch(fetchPokemonList())
  }, [])

  return (
    <>
      <h1>Pokemon List</h1>
      <ol>
        {pokemonList.map((pokemon, index) => (
          <li key={index}><Link to={`/${pokemon.name}`}>{pokemon.name}</Link></li>
        ))}
      </ol>
    </>
  )
}

export default Home