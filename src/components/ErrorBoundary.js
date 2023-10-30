import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // This method captures errors in components below it in the component tree.
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    // If an error occurred, display an error message.
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    // Otherwise, render the child components.
    return this.props.children;
  }
}

export default ErrorBoundary;
