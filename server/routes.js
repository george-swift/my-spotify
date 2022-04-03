import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import qs from 'qs';
import axios from 'axios';
import { config, baseURL, token } from './config.js';
import { generateRandomString, generateAuthOptions } from './utils.js';

// Build absolute path in ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

// Needed for Spotify authorization flow
const { stateKey, scope, client_id, redirect_uri, frontend_uri } = config;

const router = express.Router();

router.get('/', (req, res) => {
  res.render(path.resolve(__dirname, '../client/build/index.html'));
});

router.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // Your application requests authorization
  const authQuery = qs.stringify({
    response_type: 'code',
    client_id,
    scope,
    redirect_uri,
    state
  });

  res.redirect(`${baseURL}/authorize?${authQuery}`);
});

router.get('/callback', async (req, res) => {
  // Your application requests refresh and access tokens after checking the state parameter
  const { code = null, state = null } = req.query;
  const storedState = req.cookies?.[stateKey] ?? null;

  if (state === null || state !== storedState) {
    res.redirect(`/#${qs.stringify({ error: 'state_mismatch' })}`);
  } else {
    res.clearCookie(stateKey);
    const query = qs.stringify({
      code,
      redirect_uri,
      grant_type: 'authorization_code'
    });
    const authOptions = generateAuthOptions({ query, baseURL, token });
    try {
      const {
        data: { access_token, refresh_token }
      } = await axios(authOptions);
      const tokenQuery = qs.stringify({ access_token, refresh_token });
      // We pass the token to the browser to make requests from there
      res.redirect(`${frontend_uri}/#${tokenQuery}`);
    } catch (e) {
      res.redirect(`/#${qs.stringify({ error: 'invalid_token' })}`);
    }
  }
});

router.get('/refresh_token', async (req, res) => {
  // Requesting access token from refresh token
  const query = qs.stringify({
    grant_type: 'refresh_token',
    refresh_token: req.query.refresh_token
  });
  const authOptions = generateAuthOptions({ query, baseURL, token });
  try {
    const {
      data: { access_token }
    } = await axios(authOptions);
    res.send({ access_token });
  } catch (e) {
    console.error('Error', e);
  }
});

// All other requests return the React app, so it can handle routing
router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/public', 'index.html'));
});

export default router;
