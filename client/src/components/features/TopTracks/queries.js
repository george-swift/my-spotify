import { useQuery } from 'react-query';
import { axiosInstance } from '../../../services';

/**
 * Get the current user's top tracks
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */

const fetchTopTracks = async ({ queryKey: [{ activeRange }] }) => {
  const { data } = await axiosInstance.get(
    `/me/top/tracks?limit=50&time_range=${activeRange}_term`
  );
  return data;
};

const useTopTracksQuery = activeRange =>
  useQuery({
    queryKey: [{ scope: 'topTracks', activeRange }],
    queryFn: fetchTopTracks,
    refetchInterval: 1_800_000 // 30 minutes in milliseconds
  });

export default useTopTracksQuery;
