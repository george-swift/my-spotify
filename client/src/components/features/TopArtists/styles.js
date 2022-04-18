import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { theme, mixins, media } from '../../../styles';

const { colors, fontSizes, spacing } = theme;

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
    border-bottom: 1px solid ${({ isActive }) => (isActive ? colors.white : 'transparent')};
    line-height: 1.5;
    white-space: nowrap;
  }
`;

export const ArtistsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 20px;
  margin-top: 50px;

  ${media.tablet`
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  `};

  ${media.bigPhone`
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  `};
`;

export const Artist = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const Mask = styled.div`
  ${mixins.flexCenter};
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  border-radius: 100%;
  font-size: 20px;
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
  svg {
    width: 25px;
  }
`;

export const ArtistArtwork = styled(Link)`
  display: inline-block;
  position: relative;
  width: 200px;
  height: 200px;

  ${media.tablet`
    width: 150px;
    height: 150px;
  `};

  ${media.bigPhone`
    width: 120px;
    height: 120px;
  `};

  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }

  img {
    border-radius: 100%;
    object-fit: cover;
    width: 200px;
    height: 200px;

    ${media.tablet`
      width: 150px;
      height: 150px;
    `};

    ${media.bigPhone`
      width: 120px;
      height: 120px;
    `};
  }
`;

export const ArtistName = styled.a`
  margin: ${spacing.base} 0;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
  }
`;
