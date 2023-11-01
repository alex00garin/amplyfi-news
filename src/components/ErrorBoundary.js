// Import React and Component class from React library
import React, { Component } from 'react';

// ErrorBoundary class component definition
class ErrorBoundary extends Component {
  // Constructor initializes state and props
  constructor(props) {
    super(props);
    // Initialize state with 'hasError' flag set to false
    this.state = { hasError: false };
  }

  // Static method to capture errors in child components
  // Updates state if an error is caught
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // Render method
  render() {
    // If an error has occurred, display an error message
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    // Otherwise, render the child components passed in as props
    return this.props.children;
  }
}

// Export the ErrorBoundary component
export default ErrorBoundary;
