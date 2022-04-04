import { Component, useContext } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./Carousel";
import ErrorBoundies from "./ErrorBoundary";
import Modal from "./Modal";
import ApiContext from "./ApiContext";
import Table from "./Table";

class Details extends Component {
  state = { loading: true, showModal: false };

  toggleModal = () => this.setState({ showModal: !this.state.showModal });

  async componentDidMount() {
    if (this.props.params.id == this.props.refHook.current.id) {
      this.setState({ loading: false, ...this.props.refHook.current });
    } else {
      this.props.client.animal
        .show(this.props.params.id)
        .then((res) => this.setState({ loading: false, ...res.data.animal }));
    }
  }

  render() {
    if (this.state.loading === true) {
      return <h1 className="text-center white">Loading ...</h1>;
    }

    const {
      species,
      breeds,
      colors,
      age,
      gender,
      size,
      description,
      name,
      photos,
      showModal,
    } = this.state;

    return (
      <div className="details">
        <Carousel images={photos} />
        <div>
          <h1>{name}</h1>
          <h2>{species}</h2>
          <p className="text-center">{description}</p>
          <Table
            data={[
              ["species", species],
              ["breed", breeds.primary],
              ["color", colors.primary],
              ["age", age],
              ["gender", gender],
              ["size", size],
              ["status", this.state.status],
            ]}
          />
          <div className="tags">
            {this.state.tags.map((tag) => (
              <div key={tag}>{tag}</div>
            ))}
          </div>
          <button onClick={this.toggleModal}>Adopt</button>
          {showModal ? (
            <Modal toggleModal={this.toggleModal}>
              <h1>Would you like to adopt {name}?</h1>
              <div className="buttons">
                <button onClick={this.toggleModal}>No</button>
                <a href={this.state.url}>Yes</a>
              </div>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

const WrapperComponent = ({ refHook }) => {
  const params = useParams();
  const client = useContext(ApiContext);
  return (
    <ErrorBoundies>
      <Details params={params} client={client} refHook={refHook} />
    </ErrorBoundies>
  );
};

export default WrapperComponent;
