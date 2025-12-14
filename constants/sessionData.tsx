export const sessionData = {
    
    setUserToken: (data:string) => {
        localStorage.setItem('spe_admin_token', data);
    },
    getUserToken: () => {
        return localStorage.getItem('spe_admin_token');
    },
    removeUserToken: () => {
        localStorage.removeItem('spe_admin_token');
    },
    setUserEmail: (data:string) => {
        localStorage.setItem('spe_admin_userEmail', data);
    },
    getUserEmail: () => {
        return localStorage.getItem('spe_admin_userEmail');
    },
    removeUserEmail: () => {
        localStorage.removeItem('spe_admin_userEmail');
    },
    setUserId: (data:string) => {
        localStorage.setItem('spe_admin_userId', data);
    },
    getUserId: () => {
        return localStorage.getItem('spe_admin_userId');
    },
    removeUserId: () => {
        localStorage.removeItem('spe_admin_userId');
    },
}