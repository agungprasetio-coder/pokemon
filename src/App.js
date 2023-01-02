import { useSelector } from 'react-redux';
import { Switch, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import MyPokemon from './pages/MyPokemon';
import PokemonDetail from './pages/PokemonDetail';

import './App.css';

function App() {
  const totalMyPokemon = useSelector((state) => state.myPokemon.length);
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <img
          src="https://img.favpng.com/1/19/24/pok-mon-go-wallpaper-png-favpng-Wc253hn9mxiQM3cenUc5Ua95f_t.jpg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="pokemon logo"
        />
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/my-pokemon" className="nav-link">
              My Pokemon ({totalMyPokemon})
            </Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/my-pokemon">
          <MyPokemon />
        </Route>
        <Route path="/:pokemonName">
          <PokemonDetail />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </>
  );
}

export default App;
