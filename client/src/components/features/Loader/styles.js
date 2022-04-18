import styled, { keyframes } from 'styled-components/macro';
import { theme, mixins } from '../../../styles';

const { colors } = theme;

export const Container = styled.div`
  ${mixins.flexCenter};

  width: 100%;
  height: 90vh;
`;

export const rhythm = keyframes`
  from {
    height: 10px;
  }
  to {
    height: 100%;
  }
`;

export const Bars = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow: hidden;
  width: 100px;
  min-width: 100px;
  height: 50px;
  margin: 0 auto;
  z-index: 2;
  position: relative;
  left: 0;
  right: 0;
`;

export const Bar = styled.div`
  width: 10px;
  height: 5px;
  margin: 0 2px;
  background-color: ${colors.grey};
  animation-name: ${rhythm};
  animation-duration: 400ms;
  animation-play-state: running;
  animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: ${({ delay }) => delay || '0ms'};
`;
