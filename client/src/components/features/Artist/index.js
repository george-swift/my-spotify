import { useParams } from 'react-router-dom';
import {
  ArtistContainer,
  Artwork,
  ArtistName,
  Genre,
  Stats,
  Stat,
  Number,
  NumLabel
} from './styles';
import Loader from '../Loader';
import useArtistInfoQuery from './queries';

const Artist = () => {
  const { artistId } = useParams();
  const { data: artist, isLoading } = useArtistInfoQuery(artistId);

  if (isLoading) return <Loader />;

  return (
    <ArtistContainer>
      <Artwork>
        <img src={artist.images[0].url} alt="Artist artwork" />
      </Artwork>
      <div>
        <ArtistName>{artist.name}</ArtistName>
        <Stats>
          <Stat>
            <Number>{artist.followers.total.toLocaleString()}</Number>
            <NumLabel>Followers</NumLabel>
          </Stat>
          <Stat>
            <Number>
              {artist.genres.map(genre => (
                <Genre key={genre}>{genre}</Genre>
              ))}
            </Number>
            <NumLabel>Genres</NumLabel>
          </Stat>
          <Stat>
            <Number>{artist.popularity}%</Number>
            <NumLabel>Popularity</NumLabel>
          </Stat>
        </Stats>
      </div>
    </ArtistContainer>
  );
};

export default Artist;
