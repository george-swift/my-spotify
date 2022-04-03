import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { theme, media, mixins } from '../../../styles';

const { colors, fontSizes, spacing } = theme;

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

export const TrackContainer = styled(Link)`
  display: grid;
  grid-template-columns: auto 1fr;
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

export const TrackArtwork = styled.div`
  display: inline-block;
  position: relative;
  width: 50px;
  min-width: 50px;
  margin-right: ${spacing.base};
`;

export const TrackMeta = styled.div`
  display: grid;
  grid-template-columns: 1fr max-content;
  grid-gap: 10px;
`;

export const TrackLeft = styled.span`
  ${mixins.overflowEllipsis};
`;

export const TrackRight = styled.span``;

export const TrackName = styled.span`
  margin-bottom: 5px;
  border-bottom: 1px solid transparent;

  &:hover,
  &:focus {
    border-bottom: 1px solid ${colors.white};
  }
`;

export const TrackAlbum = styled.div`
  ${mixins.overflowEllipsis};
  color: ${colors.lightGrey};
  font-size: ${fontSizes.sm};
  margin-top: 3px;
`;

export const TrackDuration = styled.span`
  color: ${colors.lightGrey};
  font-size: ${fontSizes.sm};
`;
