import { useQuery } from 'react-query';
import { axiosInstance } from '../../../services';
import { shuffle } from '../../../utils';

/**
 * Get Recommendations based on seeds
 * https://developer.spotify.com/documentation/web-api/reference/browse/get-recommendations/
 */

const fetchRecommendations = async ({ queryKey: [{ trackIds }] }) => {
  const shuffledTrackIds = shuffle(trackIds);
  const seedTracks = shuffledTrackIds.join(',');
  const seedArtists = '';
  const seedGenres = '';

  const { data } = await axiosInstance.get(
    `/recommendations?seed_tracks=${seedTracks}&seed_artists=${seedArtists}&seed_genres=${seedGenres}`
  );

  return data;
};

export const useRecommendationsQuery = trackIds =>
  useQuery({
    queryKey: [{ scope: 'recommendations', trackIds }],
    queryFn: fetchRecommendations,
    refetchInterval: 300_000, // 5 minutes in milliseconds
    staleTime: Infinity
  });

/**
 * Check if user is following a specified playlist
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/check-if-user-follows-playlist
 */

const isFollowingPlaylist = async ({ queryKey: [{ playlistId, userId }] }) => {
  const {
    data: [isFollowing]
  } = await axiosInstance.get(`/playlists/${playlistId}/followers/contains?ids=${userId}`);

  return isFollowing;
};

export const useIsFollowingPlaylistQuery = (playlistId, userId) =>
  useQuery({
    queryKey: [{ scope: 'isFollowingPlaylist', playlistId, userId }],
    queryFn: isFollowingPlaylist,
    enabled: !!playlistId && !!userId
  });
