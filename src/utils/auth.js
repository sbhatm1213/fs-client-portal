export const getAccessToken = () => sessionStorage.getItem('access_token');
export const setAccessToken = (token) => sessionStorage.setItem('access_token', token);
export const clearAccessToken = () => sessionStorage.removeItem('access_token');