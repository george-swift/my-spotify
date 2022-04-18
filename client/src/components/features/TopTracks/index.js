import { useState } from 'react';
import { Main } from '../../../styles';
import { Header, Ranges, RangeButton, TracksContainer } from './styles';
import Loader from '../Loader';
import TrackItem from '../TrackItem';

import useTopTracksQuery from './queries';

const TopTracks = () => {
  const [activeRange, setActiveRange] = useState('long');
  const { data: topTracks, isLoading } = useTopTracksQuery(activeRange);

  return (
    <Main>
      <Header>
        <h2>Top Tracks</h2>
        <Ranges>
          <RangeButton isActive={activeRange === 'long'} onClick={() => setActiveRange('long')}>
            <span>All Time</span>
          </RangeButton>
          <RangeButton isActive={activeRange === 'medium'} onClick={() => setActiveRange('medium')}>
            <span>Last 6 Months</span>
          </RangeButton>
          <RangeButton isActive={activeRange === 'short'} onClick={() => setActiveRange('short')}>
            <span>Last 4 Weeks</span>
          </RangeButton>
        </Ranges>
      </Header>
      <TracksContainer>
        {isLoading ? (
          <Loader />
        ) : (
          topTracks.items.map(track => <TrackItem key={track.id} track={track} />)
        )}
      </TracksContainer>
    </Main>
  );
};

export default TopTracks;
