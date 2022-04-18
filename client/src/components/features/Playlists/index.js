import useCurrentUserPlaylistsQuery from './queries';
import Loader from '../Loader';
import { IconMusic } from '../../icons';
import { Main } from '../../../styles';
import {
  Wrapper,
  PlaylistsContainer,
  Playlist,
  PlaylistMask,
  PlaylistImage,
  PlaylistCover,
  PlaceholderArtwork,
  PlaceholderContent,
  PlaylistName,
  TotalTracks
} from './styles';

const Playlists = () => {
  const { data: playlists, isLoading } = useCurrentUserPlaylistsQuery();

  if (isLoading) return <Loader />;

  return (
    <Main>
      <h2>Your Playlists</h2>
      <Wrapper>
        <PlaylistsContainer>
          {playlists.items.map(({ id, images, name, tracks }) => (
            <Playlist key={id}>
              <PlaylistCover to={id}>
                {images.length ? (
                  <PlaylistImage src={images[0].url} alt="Album Art" />
                ) : (
                  <PlaceholderArtwork>
                    <PlaceholderContent>
                      <IconMusic />
                    </PlaceholderContent>
                  </PlaceholderArtwork>
                )}
                <PlaylistMask>
                  <i className="fas fa-info-circle" />
                </PlaylistMask>
              </PlaylistCover>
              <div>
                <PlaylistName to={id}>{name}</PlaylistName>
                <TotalTracks>{tracks.total} Tracks</TotalTracks>
              </div>
            </Playlist>
          ))}
        </PlaylistsContainer>
      </Wrapper>
    </Main>
  );
};

export default Playlists;
