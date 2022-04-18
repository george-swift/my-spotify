const { CLIENT_ID, CLIENT_SECRET, PORT = 8888 } = process.env;
let { REDIRECT_URI, FRONTEND_URI } = process.env;

if (process.env.NODE_ENV !== 'production') {
  REDIRECT_URI = 'http://localhost:8888/callback';
  FRONTEND_URI = 'http://localhost:3000';
}

export const baseURL = 'https://accounts.spotify.com';

export const token = `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`;

const scope =
  'user-read-private user-read-email user-read-recently-played user-top-read user-follow-read ' +
  'user-follow-modify playlist-read-private playlist-read-collaborative playlist-modify-public';

const stateKey = 'spotify_auth_state';

export const config = {
  stateKey,
  scope,
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  frontend_uri: FRONTEND_URI,
  PORT
};
