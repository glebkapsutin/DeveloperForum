import { api } from "./api"

export const followApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Подписка: POST /api/Follows/subscribe
    followUser: builder.mutation<void, { followerId: number; followingId: number }>({
      query: (body) => ({
        url: "/Follows/subscribe",
        method: "POST",
        body,
      }),
    }),
    // Отписка: DELETE /api/Follows/unsubscribe
    unfollowUser: builder.mutation<void, { followerId: number; followingId: number }>({
      query: (body) => ({
        url: "/Follows/unsubscribe",
        method: "DELETE",
        body,
      }),
    }),
  }),
});

export const { useFollowUserMutation, useUnfollowUserMutation } = followApi;

export const {
  endpoints: { followUser, unfollowUser },
} = followApi;
