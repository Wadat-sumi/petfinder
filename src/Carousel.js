import { Component } from "react";

class Carousel extends Component {
  state = { active: 0 };

  static defaultProps = {
    images: [
      {
        full: "https://i.imgur.com/A3nMtqc.png",
        medium: "https://i.imgur.com/A3nMtqc.png",
      },
    ],
  };

  handleIndexClick = (event) => {
    this.setState({
      active: parseInt(event.target.dataset.index),
    });
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;
    let carImages = [];

    if (images.length === 0) {
      carImages = Carousel.defaultProps.images;
    } else {
      carImages = images;
    }

    return (
      <div className="carousel">
        <img src={carImages[active].full} alt="pet" />
        <div className="carousel-smaller">
          {carImages.map((photo, index) => (
            //eslint-disable-next-line
            <img
              key={photo.medium}
              src={photo.medium}
              className={index === active ? "active" : ""}
              data-index={index}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
