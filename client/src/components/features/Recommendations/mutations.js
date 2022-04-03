import { useMutation, useQueryClient } from 'react-query';
import { axiosInstance } from '../../../services';
import { makeUnique } from '../../../utils';

/**
 * Create a playlist for a user
 * https://developer.spotify.com/documentation/web-api/reference/#/operations/create-playlist
 */

const createPlaylist = ({ userId, playlistName }) => {
  const name = makeUnique(`Recommended Tracks Based on ${playlistName}`);
  const data = JSON.stringify({ name });
  return axiosInstance.post(`/users/${userId}/playlists`, data);
};

export const useCreatePlaylistMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(createPlaylist, {
    onSuccess: ({ data: newPlaylist }) => {
      queryClient.setQueryData([{ scope: 'currentUserPlaylists' }], previousData => ({
        ...previousData,
        items: [...previousData.items, newPlaylist]
      }));
    }
  });
};

/**
 * Follow a playlist
 * https://developer.spotify.com/documentation/web-api/reference/follow/follow-playlist/
 */
const followPlaylist = ({ newPlaylistId }) =>
  axiosInstance.put(`/playlists/${newPlaylistId}/followers`);

export const useFollowPlaylistMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(followPlaylist, {
    onSuccess: (_, { newPlaylistId, userId }) => {
      queryClient.setQueryData([{ scope: 'isFollowingPlaylist', newPlaylistId, userId }], [true]);
    }
  });
};

/**
 * Add tracks to a playlist
 * https://developer.spotify.com/documentation/web-api/reference/playlists/add-tracks-to-playlist/
 */

const addTracksToPlaylist = ({ newPlaylistId, uris }) =>
  axiosInstance.post(`/playlists/${newPlaylistId}/tracks?uris=${uris}`);

export const useAddTracksToPlaylistMutation = () => {
  const followPlaylistMutation = useFollowPlaylistMutation();
  return useMutation(addTracksToPlaylist, {
    onSuccess: (_, { newPlaylistId, userId }) =>
      followPlaylistMutation.mutate({ newPlaylistId, userId })
  });
};
