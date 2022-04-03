import styled from 'styled-components/macro';
import { theme, mixins, media } from '../../../styles';

const { colors, fontSizes } = theme;

export const TrackContainer = styled.div`
  display: flex;
  margin-bottom: 70px;

  ${media.bigPhone`
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;
  `};
`;

export const Artwork = styled.div`
  ${mixins.coverShadow};
  max-width: 250px;
  margin-right: 40px;
  ${media.tablet`
    max-width: 200px;
  `};
  ${media.bigPhone`
    margin: 0 auto;
  `};
`;

export const Info = styled.div`
  flex-grow: 1;
  ${media.bigPhone`
    text-align: center;
    margin-top: 30px;
  `};
`;

export const PlayTrackButton = styled.a`
  ${mixins.greenButton};
`;

export const Title = styled.h1`
  font-size: 42px;
  margin: 0 0 5px;

  ${media.tablet`
    font-size: 30px;
  `};
`;

export const ArtistName = styled.h2`
  color: ${colors.lightestGrey};
  font-weight: 700;
  text-align: left !important;

  ${media.tablet`
    font-size: 20px;
  `};

  ${media.bigPhone`
    text-align: center !important;
  `};
`;

export const Album = styled.h3`
  color: ${colors.lightGrey};
  font-weight: 400;
  font-size: 16px;
`;

export const AudioFeatures = styled.div`
  ${mixins.flexCenter};
  flex-direction: column;
`;

export const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(5, minmax(100px, 1fr));
  width: 100%;
  margin-bottom: 50px;
  text-align: center;
  border-top: 1px solid ${colors.grey};
  border-left: 1px solid ${colors.grey};

  ${media.phablet`
    grid-template-columns: repeat(2, minmax(100px, 1fr));
  `};

  ${media.bigPhone`
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  `};
`;

export const Feature = styled.div`
  padding: 15px 10px;
  border-bottom: 1px solid ${colors.grey};
  border-right: 1px solid ${colors.grey};
`;

export const FeatureText = styled.h4`
  color: ${colors.lightestGrey};
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 0;

  ${media.tablet`
    font-size: 24px;
  `};
`;

export const FeatureLabel = styled.p`
  color: ${colors.lightestGrey};
  font-size: ${fontSizes.xs};
  margin-bottom: 0;
`;

export const DescriptionLink = styled.a`
  color: ${colors.lightestGrey};
  margin: 20px auto 0;
  border-bottom: 1px solid transparent;
  &:hover,
  &:focus {
    color: ${colors.white};
    border-bottom: 1px solid ${colors.white};
  }
`;
