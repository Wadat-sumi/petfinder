import { Component } from "react";

class ErrorBoundiesCards extends Component {
  state = { hasError: false };

  static ref = 0;

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.warn(error, info);
  }

  render() {
    if (this.state.hasError) {
      console.log(this.ref);
      return (
        <h2 className="text-center white">
          Request took too long. <br /> Please Refreash the Page & Try Again.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundiesCards;
