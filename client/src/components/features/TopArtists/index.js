import { useState } from 'react';
import { Main } from '../../../styles';
import { IconInfo } from '../../icons';
import Loader from '../Loader';
import {
  Header,
  Ranges,
  RangeButton,
  ArtistsContainer,
  Artist,
  Mask,
  ArtistArtwork,
  ArtistName
} from './styles';

import useTopArtistsQuery from './queries';

const TopArtists = () => {
  const [activeRange, setActiveRange] = useState('long');
  const { data: topArtists, isLoading } = useTopArtistsQuery(activeRange);

  return (
    <Main>
      <Header>
        <h2>Top Artists</h2>
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
      <ArtistsContainer>
        {isLoading ? (
          <Loader />
        ) : (
          topArtists.items.map(({ id, external_urls, images, name }) => (
            <Artist key={id}>
              <ArtistArtwork to={id}>
                {images.length && <img src={images[1].url} alt="Artist" />}
                <Mask>
                  <IconInfo />
                </Mask>
              </ArtistArtwork>
              <ArtistName href={external_urls.spotify} target="_blank" rel="noopener noreferrer">
                {name}
              </ArtistName>
            </Artist>
          ))
        )}
      </ArtistsContainer>
    </Main>
  );
};

export default TopArtists;
