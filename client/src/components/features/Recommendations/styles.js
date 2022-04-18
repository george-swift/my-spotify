import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { theme, mixins, media } from '../../../styles';

const { colors } = theme;

export const PlaylistHeading = styled.div`
  ${mixins.flexBetween};

  ${media.tablet`
    flex-direction: column;
  `};

  h2 {
    margin-bottom: 0;
  }
`;

export const SaveButton = styled.button`
  ${mixins.greenButton};
`;

export const OpenButton = styled.a`
  ${mixins.button};
`;

export const TracksContainer = styled.ul`
  margin-top: 50px;
`;

export const PlaylistLink = styled(Link)`
  &:hover,
  &:focus {
    color: ${colors.offGreen};
  }
`;
