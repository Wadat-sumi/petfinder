import { Link } from "react-router-dom";

const Pet = ({ name, breed, id, images, animal, handleClick }) => {
  let hero = "https://i.imgur.com/HbaZdpd.png";

  if (images.length) {
    hero = images[0].medium;
  }

  return images.length ? (
    <Link onClick={handleClick} to={`/details/${id}`} className="pet-link">
      <div className="pet-card-container pet">
        <nav className="image-container">
          <img src={hero} alt={name} />
        </nav>
        <h2>{name}</h2>
        <h3>
          {animal}
          <br /> <span>{breed}</span>
        </h3>{" "}
      </div>
    </Link>
  ) : null;
};

export default Pet;
