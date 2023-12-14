import qs from 'qs'

import { env } from '@/env.mjs'

import { shuffle } from './utils'

/*
 * SPOTIFY WEB API AUTHORIZATION CODE FLOW
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

export const scope = [
  'user-read-private',
  'user-read-email',
  'user-read-recently-played',
  'user-top-read',
  'user-follow-read',
  'user-follow-modify',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public'
].join()

const basic = Buffer.from(
  `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
).toString('base64')

const TOKEN_ENDPOINT = `${env.SPOTIFY_ACCOUNT_URL}/api/token`

const getAccessToken = async refresh_token => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: qs.stringify({ grant_type: 'refresh_token', refresh_token })
  })

  return response.json()
}

const baseURL = env.SPOTIFY_API_URL

const fetchWithHeader = async ({ endpoint, refresh_token }) => {
  const { access_token } = await getAccessToken(refresh_token)
  return fetch(endpoint, {
    headers: { Authorization: `Bearer ${access_token}` }
  }).catch(_ => {
    throw new Error(`Failed request: ${endpoint}`)
  })
}

/**
 * Get detailed profile information about the current user. Reference:
 * https://developer.spotify.com/documentation/web-api/reference/get-current-users-profile
 */
export const getProfile = refresh_token =>
  fetchWithHeader({ endpoint: `${baseURL}/me`, refresh_token })

/**
 * Get current user's recently played tracks. Reference:
 * https://developer.spotify.com/documentation/web-api/reference/get-recently-played
 */
export const getRecentlyPlayed = refresh_token =>
  fetchWithHeader({
    endpoint: `${baseURL}/me/player/recently-played`,
    refresh_token
  })

/**
 * Get the current user's followed artists. Reference:
 * https://developer.spotify.com/documentation/web-api/reference/get-followed/
 */
export const getFollowedArtists = refresh_token =>
  fetchWithHeader({
    endpoint: `${baseURL}/me/following?type=artist`,
    refresh_token
  })

/* Get the current user's top artists. Reference:
 * https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 */
export const getTopArtists = (refresh_token, time_range = 'long_term') =>
  fetchWithHeader({
    endpoint: `${baseURL}/me/top/artists?limit=50&time_range=${time_range}`,
    refresh_token
  })

/**
 * Get Spotify catalog information for a single artist. Reference:
 * https://developer.spotify.com/documentation/web-api/reference/get-an-artist
 */
export const getArtist = (artistId, refresh_token) =>
  fetchWithHeader({ endpoint: `${baseURL}/artists/${artistId}`, refresh_token })

/* Get the current user's top artists. Reference:
 * https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
 */
export const getTopTracks = (refresh_token, time_range = 'long_term') =>
  fetchWithHeader({
    endpoint: `${baseURL}/me/top/tracks?limit=50&time_range=${time_range}`,
    refresh_token
  })

/**
 * Get Spotify catalog information for a single track. Reference:
 * https://developer.spotify.com/documentation/web-api/reference/get-track
 */
export const getTrack = (trackId, refresh_token) =>
  fetchWithHeader({ endpoint: `${baseURL}/tracks/${trackId}`, refresh_token })

/**
 * Get a low-level audio analysis for a track in the Spotify catalog. Reference:
 * https://developer.spotify.com/documentation/web-api/reference/get-audio-analysis
 */
export const getTrackAudioAnalysis = (trackId, refresh_token) =>
  fetchWithHeader({
    endpoint: `${baseURL}/audio-analysis/${trackId}`,
    refresh_token
  })

/**
 * Get audio feature information for a single track identified by its unique Spotify ID. Reference:
 * https://developer.spotify.com/documentation/web-api/reference/get-audio-features
 */
export const getTrackAudioFeatures = (trackId, refresh_token) =>
  fetchWithHeader({
    endpoint: `${baseURL}/audio-features/${trackId}`,
    refresh_token
  })

/**
 * Get a list of the playlists owned or followed by the current Spotify user. Reference:
 * https://developer.spotify.com/documentation/web-api/reference/get-a-list-of-current-users-playlists
 */
export const getPlaylists = refresh_token =>
  fetchWithHeader({ endpoint: `${baseURL}/me/playlists`, refresh_token })

/**
 * Get a playlist owned by a Spotify user. Reference:
 * https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist/
 */
export const getPlaylist = (playlistId, refresh_token) =>
  fetchWithHeader({
    endpoint: `${baseURL}/playlists/${playlistId}`,
    refresh_token
  })

/**
 * Create a playlist for a Spotify user.
 * https://developer.spotify.com/documentation/web-api/reference/create-playlist
 */
export const createPlaylist = async ({
  userId,
  playlistName,
  refresh_token
}) => {
  const { access_token } = await getAccessToken(refresh_token)
  const _playlistName = `Recommended Tracks Based on ${playlistName}`
  const name = [...new Set(_playlistName.split(' '))].join(' ')

  return fetch(`${baseURL}/users/${userId}/playlists`, {
    method: 'post',
    headers: { Authorization: `Bearer ${access_token}` },
    body: JSON.stringify({ name })
  }).catch(_ => {
    throw new Error('Failed to create playlist')
  })
}

/**
 * Add one or more items to a user's playlist.
 * https://developer.spotify.com/documentation/web-api/reference/add-tracks-to-playlist
 */

export const addTracksToPlaylist = async ({
  newPlaylistId,
  uris,
  refresh_token
}) => {
  const { access_token } = await getAccessToken(refresh_token)

  return fetch(`${baseURL}/playlists/${newPlaylistId}/tracks?uris=${uris}`, {
    method: 'post',
    headers: { Authorization: `Bearer ${access_token}` }
  }).then(_ => {
    // Follow the new playlist after adding tracks
    return fetch(`${baseURL}/playlists/${newPlaylistId}/followers`, {
      method: 'put',
      headers: { Authorization: `Bearer ${access_token}` }
    })
  })
}

/**
 * Check if user is following a specified playlist
 * https://developer.spotify.com/documentation/web-api/reference/check-if-user-follows-playlist
 */
export const getIsFollowingPlaylist = ({ playlistId, userId, refresh_token }) =>
  fetchWithHeader({
    endpoint: `${baseURL}/playlists/${playlistId}/followers/contains?ids=${userId}`,
    refresh_token
  })

/**
 * Get Recommendations based on seeds
 * https://developer.spotify.com/documentation/web-api/reference/get-recommendations
 */
export const getRecommendations = (trackIds, refresh_token) => {
  const query = qs.stringify({
    seed_tracks: shuffle(trackIds).join(','),
    seed_artists: '',
    seed_genres: ''
  })

  return fetchWithHeader({
    endpoint: `${baseURL}/recommendations?${query}`,
    refresh_token
  })
}
