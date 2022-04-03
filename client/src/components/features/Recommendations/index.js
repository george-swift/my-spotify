import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { useRecommendationsQuery, useIsFollowingPlaylistQuery } from './queries';
import { useCreatePlaylistMutation, useAddTracksToPlaylistMutation } from './mutations';

import { Main } from '../../../styles';
import { PlaylistHeading, PlaylistLink, OpenButton, SaveButton, TracksContainer } from './styles';
import TrackItem from '../TrackItem';
import Loader from '../Loader';

const Recommendations = () => {
  const queryClient = useQueryClient();
  const { playlistId } = useParams();
  const [recPlaylistId, setRecPlaylistId] = useState('');

  const {
    user: { id: userId }
  } = queryClient.getQueryData([{ scope: 'currentUserInfo' }]);

  const playlist = queryClient.getQueryData([
    { scope: 'playlistInfo', entity: 'playlist', playlistId }
  ]);

  const topFourTrackIds = playlist.tracks.items.slice(0, 4).map(({ track }) => track.id);

  const { data: recommendations, isLoading: isRecommendationLoading } =
    useRecommendationsQuery(topFourTrackIds);

  const { data: isFollowing, isLoading: isFollowingLoading } = useIsFollowingPlaylistQuery(
    recPlaylistId,
    userId
  );

  const createPlaylistMutation = useCreatePlaylistMutation();
  const addToPlaylistMutation = useAddTracksToPlaylistMutation();

  const addPlaylist = async () => {
    const {
      data: { id: newPlaylistId }
    } = await createPlaylistMutation.mutateAsync({
      userId,
      playlistName: playlist.name
    });
    const uris = recommendations.tracks.map(({ uri }) => uri).join(',');
    addToPlaylistMutation.mutate({ newPlaylistId, uris, userId });
    setRecPlaylistId(newPlaylistId);
  };

  if (isFollowingLoading || createPlaylistMutation.isLoading) return <Loader />;

  return (
    <Main>
      <PlaylistHeading>
        <h2>
          Recommended Tracks Based On{' '}
          <PlaylistLink to={`/playlists/${playlist.id}`}>Current Playlist</PlaylistLink>
        </h2>
        {isFollowing ? (
          <OpenButton
            href={`https://open.spotify.com/playlist/${recPlaylistId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in Spotify
          </OpenButton>
        ) : (
          <SaveButton onClick={addPlaylist}>Save to Spotify</SaveButton>
        )}
      </PlaylistHeading>
      <TracksContainer>
        {isRecommendationLoading ? (
          <Loader />
        ) : (
          recommendations?.tracks.map(track => <TrackItem key={track.id} track={track} />)
        )}
      </TracksContainer>
    </Main>
  );
};

export default Recommendations;
