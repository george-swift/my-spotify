import axios from 'axios';

const getTokenTimestamp = () => localStorage.getItem('spotify_token_timestamp');
const getLocalRefreshToken = () => localStorage.getItem('spotify_refresh_token');
const getLocalAccessToken = () => localStorage.getItem('spotify_access_token');

const setTokenTimestamp = () => localStorage.setItem('spotify_token_timestamp', Date.now());
const setLocalRefreshToken = token => localStorage.setItem('spotify_refresh_token', token);
const setLocalAccessToken = token => {
  setTokenTimestamp();
  localStorage.setItem('spotify_access_token', token);
};

// Group fragment identifiers from location hash
const getHashParams = hash => {
  const fragment = hash.substring(1);
  const regex = /([^&;=]+)=?([^&;]*)/g;

  let matchResult;
  const hashParams = {};

  while ((matchResult = regex.exec(fragment))) {
    const [, identifier, value] = matchResult;
    hashParams[identifier] = decodeURIComponent(value);
  }

  return hashParams;
};

const EXPIRATION_TIME = 3600 * 1000; // 1hr is equivalent to 3_600_000 milliseconds

const refreshAccessToken = async () => {
  try {
    const { data } = await axios.get(`/refresh_token?refresh_token=${getLocalRefreshToken()}`);
    setLocalAccessToken(data.access_token);
  } catch (e) {
    console.error(e);
  }
};

export const getAccessToken = hash => {
  const { error, access_token, refresh_token } = getHashParams(hash);

  if (error) {
    console.error(error);
    refreshAccessToken();
  }

  const localRefreshToken = getLocalRefreshToken();

  if (localRefreshToken && Date.now() - getTokenTimestamp() > EXPIRATION_TIME) {
    console.warn('Access token has expired, refreshing...');
    refreshAccessToken();
  }

  const localAccessToken = getLocalAccessToken();

  if ((!localAccessToken || localAccessToken === 'undefined') && access_token) {
    setLocalAccessToken(access_token);
    setLocalRefreshToken(refresh_token);
    return access_token;
  }

  return localAccessToken;
};

export const clearTokensCache = () => {
  localStorage.removeItem('spotify_token_timestamp');
  localStorage.removeItem('spotify_access_token');
  localStorage.removeItem('spotify_refresh_token');
};

export const axiosInstance = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: { 'Content-Type': 'application/json' }
});
