import { useQuery } from 'react-query';
import { axiosInstance } from '../../../services';

/**
 * Get detailed profile information about the current user
 * https://developer.spotify.com/documentation/web-api/reference/users-profile/get-current-users-profile/
 */
const getUser = () => axiosInstance.get('/me');

/**
 * Get the current user's followed artists
 * https://developer.spotify.com/documentation/web-api/reference/follow/get-followed/
 */
const getFollowing = () => axiosInstance.get('/me/following?type=artist');

/**
 * Get a list of the playlists owned or followed by the current Spotify user
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/
 */
const getPlaylists = () => axiosInstance.get('/me/playlists');

/**
 * Get the current user's top artists
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
const getTopArtistsLong = () => axiosInstance.get('/me/top/artists?limit=50&time_range=long_term');

/**
 * Get the current user's top tracks
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
const getTopTracksLong = () => axiosInstance.get('/me/top/tracks?limit=50&time_range=long_term');

// Make a concurrent request
const fetchUserInfo = async () => {
  const [
    { data: user },
    { data: followedArtists },
    { data: playlists },
    { data: topArtists },
    { data: topTracks }
  ] = await Promise.all([
    getUser(),
    getFollowing(),
    getPlaylists(),
    getTopArtistsLong(),
    getTopTracksLong()
  ]);

  return { user, followedArtists, playlists, topArtists, topTracks };
};

// Use selector function to extract relevant user info
const relevantUserInfo = data => {
  const personalInfo = (({ user: { display_name, followers, images, external_urls } }) => ({
    display_name,
    followers,
    images,
    external_urls
  }))(data);
  return { ...data, user: personalInfo };
};

// Custom query hooks for user
const useUserInfoQuery = () =>
  useQuery({
    queryKey: [{ scope: 'currentUserInfo' }],
    queryFn: fetchUserInfo,
    select: relevantUserInfo,
    cacheTime: 1_800_000,
    refetchInterval: 1_800_000 // 30 minutes in milliseconds
  });

export default useUserInfoQuery;
