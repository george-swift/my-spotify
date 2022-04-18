/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

export const generateRandomString = length => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

/**
 * Generates an object containing axios configuration options
 * @param  {string} query Query params in url-encoded format
 * @param  {string} baseURL Spotify account endpoint
 * @param  {string} token Authorization header
 * @return {object} The generated axios options object
 */

export const generateAuthOptions = ({ query, baseURL, token }) => ({
  method: 'post',
  url: '/api/token',
  baseURL,
  data: query,
  headers: {
    Authorization: token,
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  responseType: 'json'
});
