import { Routes, Route } from 'react-router-dom';

import styled from 'styled-components/macro';
import { media } from '../styles';

import Nav from './features/Nav';
import User from './features/User';
import RecentlyPlayed from './features/RecentlyPlayed';
import TopTracks from './features/TopTracks';
import Playlists from './features/Playlists';
import Artist from './features/Artist';
import TopArtists from './features/TopArtists';
import Playlist from './features/Playlist';
import Track from './features/Track';
import Recommendations from './features/Recommendations';

const MainWrapper = styled.div`
  padding-left: 100px;

  ${media.tablet`
    padding-left: 0;
    padding-bottom: 50px;
  `};
`;

const Profile = () => (
  <MainWrapper>
    <Nav />
    <Routes>
      <Route index element={<User />} />
      <Route path="recent" element={<RecentlyPlayed />} />
      <Route path="tracks" element={<TopTracks />} />
      <Route path="tracks/:trackId" element={<Track />} />
      <Route path="playlists" element={<Playlists />} />
      <Route path="playlists/:playlistId" element={<Playlist />} />
      <Route path="recommendations/:playlistId" element={<Recommendations />} />
      <Route path="artists" element={<TopArtists />} />
      <Route path="artists/:artistId" element={<Artist />} />
    </Routes>
  </MainWrapper>
);

export default Profile;
