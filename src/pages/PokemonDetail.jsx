import ReactDom from 'react-dom'
import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

function PokemonDetail (props) {
  const { pokemonName } = useParams()
  const myPokemon = useSelector(state => state.myPokemon)
  const dispatch = useDispatch()
  const history = useHistory()
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
    history.push('/my-pokemon')
  }

  const successCatch = (
    <div>
      <p>Horrayy!! Pokemon catched!! Give a nickname:</p>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <input type="text" onChange={handleNickname} className="form-control" placeholder="Nickname" aria-label="Nickname" aria-describedby="basic-addon1"/>
          </div>
          <div className="col">
            <button className="btn btn-info" type="submit">Add Nickname</button>
          </div>
        </div>
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
      <img className="rounded rounded-circle border ml-4 mr-4 mb-3" src={image} alt={pokemonName} style={{height:100}}/>{pokemonName}
      <div className="row custom-row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-header">
              Moves
            </div>
            <div className="card-body custom-card-body">
              <blockquote className="blockquote mb-0">
                <p className="small">{moves.map(({move}, index) => move.name).join(', ')}</p>
              </blockquote>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-header">
              Types
            </div>
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <p className="small">{types.map(({type}, index) => type.name).join(', ')}</p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-primary ml-4 mb-4" onClick={catchPokemon}>Catch</button>
      <div id="render" className="ml-4 mb-4 mr-4"></div>
    </>
  )
}

export default PokemonDetail