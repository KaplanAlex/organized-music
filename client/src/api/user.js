import axios from "axios";

/**
 * Remove jwt stored in HTTP only cookie.
 */
export const logout = () => {
  return axios(`${process.env.API_URL}/user/logout`, {
    method: "POST",
    withCredentials: true
  }).then(() => {
    window.location.reload(false);
  });
};
