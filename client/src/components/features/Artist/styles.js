import styled from 'styled-components/macro';
import { theme, mixins, media, Main } from '../../../styles';

const { colors, fontSizes, spacing } = theme;

export const ArtistContainer = styled(Main)`
  ${mixins.flexCenter};
  flex-direction: column;
  height: 100%;
  text-align: center;
`;

export const Artwork = styled.div`
  ${mixins.coverShadow};
  border-radius: 100%;

  img {
    object-fit: cover;
    border-radius: 100%;
    width: 300px;
    height: 300px;

    ${media.tablet`
      width: 200px;
      height: 200px;
    `};
  }
`;

export const ArtistName = styled.h1`
  font-size: 70px;
  margin-top: ${spacing.md};

  ${media.tablet`
    font-size: 7vw;
  `};
`;

export const Stats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  margin-top: ${spacing.md};
  text-align: center;
`;

export const Stat = styled.div``;

export const Number = styled.div`
  color: ${colors.blue};
  font-weight: 700;
  font-size: ${fontSizes.lg};
  text-transform: capitalize;

  ${media.tablet`
    font-size: ${fontSizes.md};
  `};
`;

export const Genre = styled.div`
  font-size: ${fontSizes.md};
`;

export const NumLabel = styled.p`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: ${spacing.xs};
`;
