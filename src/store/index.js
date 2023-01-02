import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

const initData = {
  pokemonList: [],
  myPokemon: [],
};

export function fetchPokemonList() {
  return (dispatch) => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then((res) => {
        if (!res.ok) {
          return Promise.reject('Something Wrong!');
        }
        return res.json();
      })
      .then(({ results }) => {
        dispatch({
          type: 'GET_POKEMON_LIST',
          payload: {
            data: results,
          },
        });
      })
      .catch((err) => {
        console.log(err, '<<< ini isi err');
      });
  };
}

function reducer(state = initData, action) {
  switch (action.type) {
    case 'GET_POKEMON_LIST':
      const pokemonList = action.payload.data;
      return { ...state, pokemonList };
    case 'CATCH_POKEMON':
      const myPokemonAfterCatch = state.myPokemon.concat(action.payload.data);
      return { ...state, myPokemon: myPokemonAfterCatch };
    case 'DELETE_MY_POKEMON':
      const myPokemonAfterDelete = state.myPokemon.filter((pokemon) => pokemon.name !== action.payload.data.name);
      return { ...state, myPokemon: myPokemonAfterDelete };
    default:
      return state;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
