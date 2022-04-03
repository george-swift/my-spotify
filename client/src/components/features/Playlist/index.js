import { useParams } from 'react-router-dom';
import TrackItem from '../TrackItem';
import { usePlaylistQuery, useAudioFeaturesQuery } from './queries';
import { Main } from '../../../styles';
import {
  PlaylistContainer,
  PlaylistCover,
  Left,
  Right,
  Name,
  Description,
  RecommendButton,
  Owner,
  TotalTracks
} from './styles';
import Loader from '../Loader';
import FeatureChart from '../Visualiser';

const Playlist = () => {
  const { playlistId } = useParams();
  const { data: playlist, isLoading } = usePlaylistQuery(playlistId);
  const { data: audioFeatures, isSuccess } = useAudioFeaturesQuery(playlist?.tracks.items);

  if (isLoading) return <Loader />;

  return (
    <Main>
      <PlaylistContainer>
        <Left>
          {playlist.images.length && (
            <PlaylistCover>
              <img src={playlist.images[0].url} alt="Playlist Album Art" />
            </PlaylistCover>
          )}
          <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer">
            <Name>{playlist.name}</Name>
          </a>
          <Owner>By {playlist.owner.display_name}</Owner>
          {playlist.description && (
            <Description dangerouslySetInnerHTML={{ __html: playlist.description }} />
          )}
          <TotalTracks>{playlist.tracks.total} Tracks</TotalTracks>
          <RecommendButton to={`/recommendations/${playlist.id}`}>
            Get Recommendations
          </RecommendButton>
          {isSuccess && <FeatureChart audioFeatures={audioFeatures.audio_features} axis="y" />}
        </Left>
        <Right>
          <ul>
            {playlist.tracks.items.map(({ track }) => (
              <TrackItem key={track.id} track={track} />
            ))}
          </ul>
        </Right>
      </PlaylistContainer>
    </Main>
  );
};

export default Playlist;
