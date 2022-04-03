import { Link } from 'react-router-dom';
import useUserInfoQuery from './queries';
import { EventBus } from '../../../utils';
import { Main } from '../../../styles';
import { IconUser, IconInfo } from '../../icons';
import Loader from '../Loader';
import TrackItem from '../TrackItem';
import {
  Header,
  Avatar,
  NoAvatar,
  UserName,
  Name,
  Stats,
  Stat,
  Number,
  NumLabel,
  Preview,
  Tracklist,
  TracklistHeading,
  MoreButton,
  Mask,
  Artist,
  ArtistArtwork,
  ArtistName,
  LogoutButton
} from './styles';

const User = () => {
  const { data, isLoading } = useUserInfoQuery();

  if (isLoading) return <Loader />;

  const { user, followedArtists, playlists, topArtists, topTracks } = data;

  const logout = () => EventBus.emit('logout');

  return (
    <Main>
      <Header>
        <Avatar>
          {user.images.length ? (
            <img src={user.images[0].url} alt="avatar" />
          ) : (
            <NoAvatar>
              <IconUser />
            </NoAvatar>
          )}
        </Avatar>
        <UserName href={user.external_urls.spotify} target="_blank" rel="noopener noreferrer">
          <Name>{user.display_name}</Name>
        </UserName>
        <Stats>
          <Stat>
            <Number>{user.followers.total}</Number>
            <NumLabel>Followers</NumLabel>
          </Stat>
          {followedArtists && (
            <Stat>
              <Number>{followedArtists.artists.items.length}</Number>
              <NumLabel>Following</NumLabel>
            </Stat>
          )}
          {playlists && (
            <Stat>
              <Link to="playlists">
                <Number>{playlists.total}</Number>
                <NumLabel>Playlists</NumLabel>
              </Link>
            </Stat>
          )}
        </Stats>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </Header>
      <Preview>
        <Tracklist>
          <TracklistHeading>
            <h3>Top Artists of All Time</h3>
            <MoreButton to="artists">See More</MoreButton>
          </TracklistHeading>
          <div>
            <ul>
              {topArtists.items.slice(0, 10).map(artist => (
                <Artist key={artist.id}>
                  <ArtistArtwork to={`artists/${artist.id}`}>
                    {artist.images.length && <img src={artist.images[2].url} alt="Artist" />}
                    <Mask>
                      <IconInfo />
                    </Mask>
                  </ArtistArtwork>
                  <ArtistName to={`artists/${artist.id}`}>
                    <span>{artist.name}</span>
                  </ArtistName>
                </Artist>
              ))}
            </ul>
          </div>
        </Tracklist>
        <Tracklist>
          <TracklistHeading>
            <h3>Top Tracks of All Time</h3>
            <MoreButton to="tracks">See More</MoreButton>
          </TracklistHeading>
          <ul>
            {topTracks.items.slice(0, 10).map(track => (
              <TrackItem track={track} key={track.id} />
            ))}
          </ul>
        </Tracklist>
      </Preview>
    </Main>
  );
};

export default User;
