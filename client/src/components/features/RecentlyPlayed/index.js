import styled from 'styled-components/macro';
import { Main } from '../../../styles';
import Loader from '../Loader';
import TrackItem from '../TrackItem';

import useRecentlyPlayedQuery from './queries';

const TracksContainer = styled.ul`
  margin-top: 50px;
`;

const RecentlyPlayed = () => {
  const { data: recentlyPlayed, isLoading } = useRecentlyPlayedQuery();

  if (isLoading) return <Loader />;

  return (
    <Main>
      <h2>Recently Played Tracks</h2>
      <TracksContainer>
        {recentlyPlayed.items.map(({ track }) => (
          <TrackItem key={track.id} track={track} />
        ))}
      </TracksContainer>
    </Main>
  );
};

export default RecentlyPlayed;
