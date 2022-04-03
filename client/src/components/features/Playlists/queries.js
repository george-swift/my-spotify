import { useQuery } from 'react-query';
import { axiosInstance } from '../../../services';

/**
 * Get a list of the current user's playlists
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-a-list-of-current-users-playlists/
 */

const fetchUserPlaylists = async () => {
  const { data } = await axiosInstance.get('/me/playlists');
  return data;
};

const useCurrentUserPlaylistsQuery = () =>
  useQuery({
    queryKey: [{ scope: 'currentUserPlaylists' }],
    queryFn: fetchUserPlaylists,
    refetchInterval: 600_000 // 10 minutes in milliseconds
  });

export default useCurrentUserPlaylistsQuery;
