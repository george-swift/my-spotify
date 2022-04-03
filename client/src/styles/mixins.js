import { css } from 'styled-components/macro';
import theme from './theme';

const mixins = {
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,

  flexBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,

  coverShadow: css`
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  `,

  overflowEllipsis: css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-right: 1px;
  `,

  button: css`
    display: inline-block;
    color: ${theme.colors.white};
    font-weight: 700;
    font-size: ${theme.fontSizes.xs};
    letter-spacing: 1px;
    text-transform: uppercase;
    border: 1px solid ${theme.colors.white};
    border-radius: 50px;
    padding: 11px 24px;
    cursor: pointer;
    transition: ${theme.transition};

    &:hover,
    &:focus {
      color: ${theme.colors.black};
      background: ${theme.colors.white};
      outline: 0;
    }
  `,

  greenButton: css`
    display: inline-block;
    background-color: ${theme.colors.green};
    color: ${theme.colors.white};
    font-weight: 700;
    font-size: ${theme.fontSizes.xs};
    letter-spacing: 1px;
    text-transform: uppercase;
    border-radius: 50px;
    padding: 11px 24px;
    margin: 20px 0;
    cursor: pointer;
    transition: ${theme.transition};

    &:hover,
    &:focus {
      background-color: ${theme.colors.offGreen};
      outline: 0;
    }
  `
};

export default mixins;
