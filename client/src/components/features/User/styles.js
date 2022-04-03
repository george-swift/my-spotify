import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { theme, mixins, media } from '../../../styles';

const { colors, fontSizes, spacing } = theme;

export const Header = styled.header`
  ${mixins.flexCenter};
  flex-direction: column;
  position: relative;
`;

export const Avatar = styled.div`
  width: 150px;
  height: 150px;
  img {
    border-radius: 100%;
  }
`;

export const NoAvatar = styled.div`
  border: 2px solid currentColor;
  border-radius: 100%;
  padding: ${spacing.md};
`;

export const UserName = styled.a`
  &:hover,
  &:focus {
    color: ${colors.offGreen};
  }
`;

export const Name = styled.h1`
  font-size: 50px;
  font-weight: 700;
  margin: 20px 0 0;

  ${media.tablet`
    font-size: 40px;
  `};

  ${media.bigPhone`
    font-size: 8vw;
  `};
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin-top: ${spacing.base};
`;

export const Stat = styled.div`
  text-align: center;
`;

export const Number = styled.div`
  color: ${colors.green};
  font-weight: 700;
  font-size: ${fontSizes.md};
`;
export const NumLabel = styled.p`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${spacing.xs};
`;

export const LogoutButton = styled.a`
  background-color: transparent;
  color: ${colors.white};
  border: 1px solid ${colors.white};
  border-radius: 30px;
  margin-top: 30px;
  padding: 12px 30px;
  font-size: ${fontSizes.xs};
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;

  &:hover,
  &:focus {
    background-color: ${colors.white};
    color: ${colors.black};
  }
`;

export const Preview = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 70px;
  width: 100%;
  margin-top: 100px;

  ${media.tablet`
    display: block;
    margin-top: 70px;
  `};
`;

export const Tracklist = styled.div`
  ${media.tablet`
    &:last-of-type {
      margin-top: 50px;
    }
  `};
`;

export const TracklistHeading = styled.div`
  ${mixins.flexBetween};
  margin-bottom: 40px;
  h3 {
    display: inline-block;
    margin: 0;
  }
`;
export const MoreButton = styled(Link)`
  ${mixins.button};

  text-align: center;
  white-space: nowrap;

  ${media.bigPhone`
    padding: 11px 20px;
    font-sizes: ${fontSizes.xs};
  `};
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
  color: ${colors.white};
  opacity: 0;
  transition: ${theme.transition};
  svg {
    width: 25px;
  }
`;

export const Artist = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: ${spacing.md};

  ${media.tablet`
    margin-bottom: ${spacing.base};
  `};

  &:hover,
  &:focus {
    ${Mask} {
      opacity: 1;
    }
  }
`;

export const ArtistArtwork = styled(Link)`
  display: inline-block;
  position: relative;
  width: 50px;
  min-width: 50px;
  margin-right: ${spacing.base};
  img {
    width: 50px;
    min-width: 50px;
    height: 50px;
    margin-right: ${spacing.base};
    border-radius: 100%;
  }
`;

export const ArtistName = styled(Link)`
  flex-grow: 1;
  span {
    border-bottom: 1px solid transparent;
    &:hover,
    &:focus {
      border-bottom: 1px solid ${colors.white};
    }
  }
`;
