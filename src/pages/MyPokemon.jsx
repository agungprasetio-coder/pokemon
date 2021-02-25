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
      <div className="row custom-row">
        {myPokemon.map((pokemon, index) => (
          <div className="col-sm-3" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{pokemon.name}</h5>
              </div>
              <button className="custom-btn btn-danger" onClick={(() => deleteMyPokemon(pokemon.name))}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default MyPokemon