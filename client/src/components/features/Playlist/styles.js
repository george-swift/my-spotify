import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { theme, mixins, media } from '../../../styles';

const { colors, fontSizes, spacing } = theme;

export const PlaylistContainer = styled.div`
  display: flex;
  ${media.tablet`
    display: block;
  `};
`;

export const Left = styled.div`
  width: 30%;
  text-align: center;
  min-width: 200px;

  ${media.tablet`
    width: 100%;
    min-width: auto;
  `};
`;

export const Right = styled.div`
  flex-grow: 1;
  margin-left: 50px;

  ${media.tablet`
    margin: 50px 0 0;
  `};
`;

export const PlaylistCover = styled.div`
  ${mixins.coverShadow};
  width: 100%;
  max-width: 300px;
  margin: 0 auto;

  ${media.tablet`
    display: none;
  `};
`;

export const Name = styled.h3`
  font-weight: 700;
  font-size: ${fontSizes.xl};
  margin-top: 20px;
`;

export const Description = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.lightGrey};
  a {
    color: ${colors.white};
    border-bottom: 1px solid transparent;
    &:hover,
    &:focus {
      border-bottom: 1px solid ${colors.white};
    }
  }
`;

export const RecommendButton = styled(Link)`
  ${mixins.greenButton};
  margin-bottom: ${spacing.lg};
`;

export const Owner = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.lightGrey};
`;

export const TotalTracks = styled.p`
  font-size: ${fontSizes.sm};
  color: ${colors.white};
  margin-top: 20px;
`;
