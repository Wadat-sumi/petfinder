import ErrorBoundiesCards from "./ErrorBoundaryCards";
import Pet from "./Pet";
import Skeleton from "./Skeleton";

const Results = ({ refHook, pets }) => {
  return (
    <div>
      {!pets.length ? (
        <Skeleton />
      ) : (
        <div className="skeleton">
          {pets.map((pet) => (
            <Pet
              name={pet.name}
              url={pet.url}
              breed={pet.breeds.primary}
              animal={pet.species}
              handleClick={() => {
                refHook.current = pet;
                console.log("REF HOOK", refHook.current);
              }}
              key={pet.id}
              images={pet.photos}
              id={pet.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const WrapperComponent = (props) => {
  return (
    <ErrorBoundiesCards>
      {" "}
      <Results refHook={props.refHook} pets={props.pets} />{" "}
    </ErrorBoundiesCards>
  );
};

export default WrapperComponent;
