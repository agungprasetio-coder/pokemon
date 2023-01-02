import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function PokemonDetail() {
  const { pokemonName } = useParams();
  const myPokemon = useSelector((state) => state.myPokemon);
  const dispatch = useDispatch();
  const history = useHistory();
  const [image, setImage] = useState('');
  const [moves, setMoves] = useState([]);
  const [types, setTypes] = useState([]);
  const [nick, setNick] = useState('');
  const [result, setResult] = useState(null);

  function handleNickname(e) {
    setNick(e.target.value);
  }

  function handleSubmit() {
    const data = {
      name: pokemonName,
      nick,
    };
    dispatch({
      type: 'CATCH_POKEMON',
      payload: {
        data,
      },
    });
    history.push('/my-pokemon');
  }

  const successCatch = (
    <div>
      <p>Horrayy!! Pokemon catched!! Give a nickname:</p>
      <div className="row">
        <div className="col">
          <input
            type="text"
            onChange={handleNickname}
            className="form-control"
            placeholder="Nickname"
            aria-label="Nickname"
            aria-describedby="basic-addon1"
          />
        </div>
        <div className="col">
          <button className="btn btn-info" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
  const alreadyCatch = <p>Already catched!</p>;
  const failCatch = <p>Try again!</p>;

  function catchPokemon() {
    let checkPokemon = myPokemon.filter((pokemon) => pokemon.name === pokemonName);
    if (checkPokemon.length === 0 && Math.random() < 0.5) {
      setResult(1);
    } else if (checkPokemon.length === 1) {
      setResult(2);
    } else {
      setResult(0);
    }
  }

  function renderResult() {
    if (result === 0) return failCatch;
    if (result === 1) return successCatch;
    if (result === 2) return alreadyCatch;
    return null;
  }

  useEffect(() => {
    const url = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          return Promise.reject('Something Wrong!');
        }
        return res.json();
      })
      .then(({ sprites, moves, types }) => {
        setImage(sprites.front_default);
        setMoves(moves);
        setTypes(types);
      })
      .catch((err) => {
        console.log(err, '<<< ini err');
      });
  }, [pokemonName]);
  return (
    <>
      <img
        className="rounded rounded-circle border ml-4 mr-4 mb-3"
        src={image}
        alt={pokemonName}
        style={{ height: 100 }}
      />
      {pokemonName}
      <div className="row custom-row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-header">Moves</div>
            <div className="card-body custom-card-body">
              <blockquote className="blockquote mb-0">
                <p className="small">{moves.map(({ move }, index) => move.name).join(', ')}</p>
              </blockquote>
            </div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="card">
            <div className="card-header">Types</div>
            <div className="card-body">
              <blockquote className="blockquote mb-0">
                <p className="small">{types.map(({ type }, index) => type.name).join(', ')}</p>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-primary ml-4 mb-4" onClick={() => catchPokemon()}>
        Catch
      </button>
      {result !== null && <div className="ml-4 mb-4 mr-4">{renderResult()}</div>}
    </>
  );
}

export default PokemonDetail;
