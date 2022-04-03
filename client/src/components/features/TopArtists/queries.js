import { useQuery } from 'react-query';
import { axiosInstance } from '../../../services';

/**
 * Get the current user's top artists
 * https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */

const fetchTopArtists = async ({ queryKey: [{ activeRange }] }) => {
  const { data } = await axiosInstance.get(
    `/me/top/artists?limit=50&time_range=${activeRange}_term`
  );
  return data;
};

const useTopArtistsQuery = activeRange =>
  useQuery({
    queryKey: [{ scope: 'topArtists', activeRange }],
    queryFn: fetchTopArtists,
    refetchInterval: 3_600_000 // 1hr in milliseconds
  });

export default useTopArtistsQuery;
