import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { theme, mixins, Main } from '../styles';

const FallBackUI = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
  min-height: 100vh;

  h1 {
    font-size: ${theme.fontSizes.xl};
  }
`;

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <FallBackUI>
          <h1>Something went wrong!</h1>
          <p>Try reloading the page</p>
        </FallBackUI>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};
