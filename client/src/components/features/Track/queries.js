import { useQuery } from 'react-query';
import { axiosInstance } from '../../../services';

/**
 * Get Spotify catalog information for a single track
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-track/
 */
const getTrack = trackId => axiosInstance.get(`/tracks/${trackId}`);

/**
 * Get a low-level audio analysis for a track in the Spotify catalog
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-analysis/
 */
const getTrackAudioAnalysis = trackId => axiosInstance.get(`/audio-analysis/${trackId}`);

/**
 * Get audio feature information for a single track
 * https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/
 */
const getTrackAudioFeatures = trackId => axiosInstance.get(`/audio-features/${trackId}`);

const fetchTrackInfo = async ({ queryKey: [{ trackId }] }) => {
  const [{ data: track }, { data: audioAnalysis }, { data: audioFeatures }] = await Promise.all([
    getTrack(trackId),
    getTrackAudioAnalysis(trackId),
    getTrackAudioFeatures(trackId)
  ]);

  return { track, audioAnalysis, audioFeatures };
};

// Use selector function to extract relevant user info
const relevantTrackInfo = data => {
  const trackInfo = (({ track: { name, album, artists, external_urls } }) => ({
    name,
    album,
    artists,
    external_urls
  }))(data);
  return { ...data, track: trackInfo };
};

const useTrackInfoQuery = trackId =>
  useQuery({
    queryKey: [{ scope: 'trackInfo', entity: 'track', trackId }],
    queryFn: fetchTrackInfo,
    select: relevantTrackInfo,
    refetchInterval: 3_600_000 // 1hr minutes in milliseconds
  });

export default useTrackInfoQuery;
