import { useState, useRef, useEffect, useDebugValue } from "react";
import { useContext } from "react";
import ApiContext from "./ApiContext";

const localCache = {};

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const abortCtr = useRef(null);
  const client = useContext(ApiContext);

  useDebugValue(
    "numbers of values in cache: " + Object.keys(localCache).length
  );

  useEffect(() => {
    abortCtr.current = animal;
    requestBreedlist().catch((e) => console.warn(e));
  }, [animal]);

  async function requestBreedlist() {
    if (abortCtr.current === animal) setBreedList([]);

    if (localCache[animal]) {
      if (abortCtr.current === animal) setBreedList(localCache[animal]);
    } else {
      const res = await client.animalData.breeds(animal);
      localCache[animal] = res.data.breeds || [];
      if (abortCtr.current === animal) setBreedList(localCache[animal]);
    }
    console.log("breed list from hook", localCache[animal]);
  }

  return breedList;
}
