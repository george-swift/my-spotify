import styled from 'styled-components/macro';
import { theme, mixins, media } from '../../../styles';

const { colors } = theme;

export const Container = styled.nav`
  ${mixins.coverShadow};
  ${mixins.flexBetween};
  flex-direction: column;
  min-height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  width: 100px;
  background-color: ${colors.navBlack};
  text-align: center;
  z-index: 99;

  ${media.tablet`
    top: auto;
    bottom: 0;
    right: 0;
    width: 100%;
    min-height: 70px;
    height: 70px;
    flex-direction: row;
  `};

  & > * {
    width: 100%;
    ${media.tablet`
      height: 100%;
    `};
  }
`;

export const Logo = styled.div`
  color: ${colors.green};
  margin-top: 30px;
  width: 70px;
  height: 70px;
  transition: ${theme.transition};

  ${media.tablet`
    display: none;
  `};

  &:hover,
  &:focus {
    color: ${colors.offGreen};
  }
  svg {
    width: 50px;
  }
`;

export const Github = styled.div`
  color: ${colors.lightGrey};
  width: 45px;
  height: 45px;
  margin-bottom: 30px;

  ${media.tablet`
    display: none;
  `};

  a {
    &:hover,
    &:focus,
    &.active {
      color: ${colors.blue};
    }
    svg {
      width: 30px;
    }
  }
`;

export const Menu = styled.ul`
  display: flex;
  flex-direction: column;

  ${media.tablet`
    flex-direction: row;
    align-items: flex-end;
    justify-content: center;
  `};
`;

export const MenuItem = styled.li`
  color: ${colors.lightGrey};
  font-size: 11px;

  ${media.tablet`
    flex-grow: 1;
    flex-basis: 100%;
    height: 100%;
  `};

  a {
    display: block;
    padding: 15px 0;
    border-left: 5px solid transparent;
    width: 100%;
    height: 100%;

    ${media.tablet`
      ${mixins.flexCenter};
      flex-direction: column;
      padding: 0;
      border-left: 0;
      border-top: 3px solid transparent;
    `};

    &:hover,
    &:focus,
    &.active {
      color: ${colors.white};
      background-color: ${colors.black};
      border-left: 5px solid ${colors.offGreen};
      ${media.tablet`
        border-left: 0;
        border-top: 3px solid ${colors.offGreen};
      `};
    }
  }

  svg {
    width: 20px;
    height: 20px;
    margin-bottom: 7px;
  }
`;
