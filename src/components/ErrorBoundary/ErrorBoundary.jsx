import React, { Component } from 'react';
import './ErrorBoundary.css';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    const { hasError } = this.state;
    if (hasError) {
      return (
        <div className="error">
            Что-то пошло не так, но наши инженеры уже чинят это...
        </div>
      );
    }

    // eslint-disable-next-line react/prop-types
    const { children } = this.props;
    return children;
  }
}
