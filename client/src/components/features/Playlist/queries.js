import { useQuery } from 'react-query';
import { axiosInstance } from '../../../services';

/**
 * Get a playlist
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist/
 */

const fetchPlaylist = async ({ queryKey: [{ playlistId }] }) => {
  const { data } = await axiosInstance.get(`/playlists/${playlistId}`);
  return data;
};

export const usePlaylistQuery = playlistId =>
  useQuery({
    queryKey: [{ scope: 'playlistInfo', entity: 'playlist', playlistId }],
    queryFn: fetchPlaylist,
    refetchInterval: 1_800_000 // 30 minutes in milliseconds
  });

const getTrackIds = tracks => tracks?.map(({ track }) => track.id)?.join(',');

/**
 * Get audio features for multiple tracks
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-several-audio-features/
 */

const fetchAudioFeatures = async ({ queryKey: [{ ids }] }) => {
  const { data } = await axiosInstance.get(`/audio-features?ids=${ids}`);
  return data;
};

export const useAudioFeaturesQuery = tracks =>
  useQuery({
    queryKey: [{ scope: 'audioFeatures', ids: getTrackIds(tracks) }],
    queryFn: fetchAudioFeatures,
    enabled: !!tracks,
    refetchInterval: 1_800_000 // 30 minutes in milliseconds
  });
