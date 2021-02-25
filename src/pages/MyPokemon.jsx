import { useSelector, useDispatch } from 'react-redux'

function MyPokemon () {
  const myPokemon = useSelector(state => state.myPokemon)
  const dispatch = useDispatch()

  function deleteMyPokemon (name) {
    dispatch({
      type: 'DELETE_MY_POKEMON',
      payload: {
        data: {name}
      }
    })  
  }

  return (
    <>
      <h1>My Pokemon List</h1>
      <ol>
        {myPokemon.map((pokemon, index) => (
          <li key={index}>{pokemon.name} <button onClick={(() => deleteMyPokemon(pokemon.name))}>Delete</button></li>
        ))}
      </ol>
    </>
  )
}

export default MyPokemon