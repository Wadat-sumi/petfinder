import { Component } from "react";
import { Link, Navigate } from "react-router-dom";

class ErrorBoundies extends Component {
  state = { hasError: false, redirect: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to="/" />;
    } else if (this.state.hasError) {
      return (
        <h1 className="text-center white">
          There was error. Oh No !!! <br />
          <Link to="/" className="white">
            Click here
          </Link>{" "}
          to go back to home page. Or we will redirect you in 5 secs.
        </h1>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundies;
