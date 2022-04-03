import styled from 'styled-components/macro';
import { theme, media, mixins } from '../../../styles';

const { colors, fontSizes } = theme;

export const Header = styled.header`
  ${mixins.flexBetween};

  ${media.tablet`
    display: block;
  `};

  h2 {
    margin: 0;
  }
`;

export const Ranges = styled.div`
  display: flex;
  margin-right: -11px;

  ${media.tablet`
    justify-content: space-around;
    margin: 30px 0 0;
  `};
`;

export const RangeButton = styled.button`
  background-color: transparent;
  color: ${({ isActive }) => (isActive ? colors.white : colors.lightGrey)};
  font-size: ${fontSizes.base};
  font-weight: 500;
  padding: 10px;

  ${media.bigPhone`
    font-size: ${fontSizes.sm};
  `};

  span {
    padding-bottom: 2px;
    border-bottom: 1px solid ${({ isActive }) => (isActive ? colors.white : `transparent`)};
    line-height: 1.5;
    white-space: nowrap;
  }
`;

export const TracksContainer = styled.ul`
  margin-top: 50px;
`;
