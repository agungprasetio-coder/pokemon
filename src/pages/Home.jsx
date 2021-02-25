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
      <div className="row custom-row">
        {pokemonList.map((pokemon, index) => (
          <div className="col-sm-3" key={index}>
            <div className="card">
              <div className="card-body custom-card-body-height">
                <h5 className="card-title">{pokemon.name}</h5>
                <p className="card-text">{pokemon.url}</p>
              </div>
              <Link to={`/${pokemon.name}`} className="custom-btn btn-info">See Detail</Link>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Home