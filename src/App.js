// import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import MyPokemon from './pages/MyPokemon'
import PokemonDetail from './pages/PokemonDetail'

function App() {
  return (
    <>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/my-pokemon'>My Pokemon</Link></li>
      </ul>
      <Switch>
        <Route exact path='/my-pokemon'>
          <MyPokemon/>
        </Route>
        <Route path='/:pokemonName'>
          <PokemonDetail/>
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>
    </>
  );
}

export default App;
