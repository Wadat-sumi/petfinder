import { useRef, useState, useEffect, useContext } from "react";
import useBreedList from "./useBreedList";
import Results from "./Results";
import ApiContext from "./ApiContext";
import AnimalButtons from "./AnimalButtons";
import ErrorBoundiesCards from "./ErrorBoundaryCards";

const animalCache = {};

const SearchParamsNew = ({ refHook }) => {
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const breeds = useBreedList(animal);
  const client = useContext(ApiContext);
  const breedInput = useRef(null);
  const abortCtr = useRef(false);

  useEffect(() => {
    requestPets();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  async function requestPets() {
    abortCtr.current = [animal, breed];
    if (!breed && animalCache[animal]) {
      if (abortCtr.current[0] === animal && abortCtr.current[1] === breed) {
        setPets(animalCache[animal]);
      }
      return;
    }

    if (abortCtr.current[0] === animal && abortCtr.current[1] === breed) {
      setPets([]);
    }

    client.animal
      .search({
        type: `${animal}`,
        breed: `${breed}`,
        page: 1,
        limit: 100,
      })
      .then((res) => {
        console.log("api.animal", res);
        if (!breed) animalCache[animal] = res.data.animals;
        if (abortCtr.current[0] === animal && abortCtr.current[1] === breed) {
          setPets(res.data.animals);
        }
      })
      .catch((err) => {
        console.error("api.animal", err);
      });
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.warn("form submit kar diya");
          requestPets();
        }}
      >
        <AnimalButtons
          breedInput={breedInput}
          animal={animal}
          setAnimal={setAnimal}
        />
        {console.log("from serach params", client)}
        <select
          multiple={false}
          id="breed"
          value={breed}
          ref={breedInput}
          onChange={(e) => {
            setBreed(e.target.value);
          }}
          disabled={breeds.length === 0}
          onBlur={(e) => {
            setBreed(e.target.value);
          }}
        >
          <option value="">All breeds</option>
          {console.log("breed list shit", breeds)}
          {breeds.map((item) => (
            <option key={item.name} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <button>Submit</button>
      </form>
      <ErrorBoundiesCards>
        <Results refHook={refHook} pets={pets} />
      </ErrorBoundiesCards>
    </div>
  );
};

export default SearchParamsNew;
