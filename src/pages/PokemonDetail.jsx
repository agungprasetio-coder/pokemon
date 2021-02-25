import ReactDom from 'react-dom'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function PokemonDetail (props) {
  const { pokemonName } = useParams()
  const myPokemon = useSelector(state => state.myPokemon)
  const dispatch = useDispatch()
  const [image, setImage] = useState('')
  const [moves, setMoves] = useState([])
  const [types, setTypes] = useState([])
  const [nick, setNick] = useState('')
  const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName

  console.log(myPokemon, '<<< isi my pokemon di detail')

  function handleNickname(e) {
    setNick(e.target.value)
    console.log(e.target.value, '<<< isi target value')
    console.log(nick, '<<< isi nick')
  }

  function handleSubmit(e) {
    e.preventDefault()
    const data = {
      name: pokemonName,
      nick
    }
    console.log(data, '<<< isi data di handlesubmit')
    dispatch({
      type: 'CATCH_POKEMON',
      payload: {
        data
      }
    })
  }

  const successCatch = (
    <div>
      <p>Horrayy!! Pokemon catched!! Give a nickname:</p>
      <p>nick: {nick}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleNickname}/>
        <input type="submit" value="Add Nickname"/>
      </form>
    </div>
  )
  const alreadyCatch = (
    <p>Already catched!</p>
  )
  const failCatch = (
    <p>Try again!</p>
  )

  function catchPokemon () {
    let checkPokemon = myPokemon.filter(pokemon => pokemon.name === pokemonName)
    if (checkPokemon.length === 0  && Math.random() < 0.5) {
      ReactDom.render(successCatch, document.getElementById('render'))
    } else if (checkPokemon.length === 1) {
      ReactDom.render(alreadyCatch, document.getElementById('render'))
    } else {
      ReactDom.render(failCatch, document.getElementById('render'))
    }
    checkPokemon = []
  }

  useEffect (() => {
    fetch(url)
    .then(res => {
      if (!res.ok) {
        return Promise.reject('Something Wrong!')
      }
      return res.json()
    })
    .then(({sprites, moves, types}) => {
      //console.log(data, '<<< ini data')
      setImage(sprites.front_default)
      setMoves(moves)
      setTypes(types)
    })
    .catch(err => {
      console.log(err, '<<< ini err')
    })
  }, [])
  return (
    <>
      <h1>About {pokemonName}</h1>
      <img src={image} alt={pokemonName} style={{height:100}}/>
      <h6>Moves</h6>
      <p>{moves.map(({move}, index) => move.name).join(', ')}</p>
      <h6>Types</h6>
      <p>{types.map(({type}, index) => type.name).join(', ')}</p>
      <p>
        {JSON.stringify(myPokemon.filter(pokemon => pokemon.name !== pokemonName))}
      </p>
      <button id="btn1" onClick={catchPokemon}>Catch</button>
      <br/>
      <div id="render"></div>
    </>
  )
}

export default PokemonDetail