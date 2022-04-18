import { useQuery } from 'react-query';
import { axiosInstance } from '../../../services';

/**
 * Get current user's recently played tracks
 * https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/
 */

const fetchRecentlyPlayed = async () => {
  const { data } = await axiosInstance.get('/me/player/recently-played');
  return data;
};

const useRecentlyPlayedQuery = () =>
  useQuery({
    queryKey: [{ scope: 'recentlyPlayed' }],
    queryFn: fetchRecentlyPlayed,
    refetchInterval: 180_000 // 3 minutes in milliseconds
  });

export default useRecentlyPlayedQuery;
