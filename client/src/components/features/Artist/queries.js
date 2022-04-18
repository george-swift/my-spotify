import { useQuery } from 'react-query';
import { axiosInstance } from '../../../services';

/**
 * Get Spotify catalog information for a single artist
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/get-an-artist
 */

const fetchArtist = async ({ queryKey: [{ artistId }] }) => {
  const { data } = await axiosInstance.get(`/artists/${artistId}`);
  return data;
};

const relevantArtistInfo = ({ name, popularity, images, genres, followers }) => ({
  name,
  popularity,
  images,
  genres,
  followers
});

const useArtistInfoQuery = artistId =>
  useQuery({
    queryKey: [{ scope: 'artistInfo', entity: 'artist', artistId }],
    queryFn: fetchArtist,
    select: relevantArtistInfo,
    refetchInterval: 3_600_000 // 1hr in milliseconds
  });

export default useArtistInfoQuery;
