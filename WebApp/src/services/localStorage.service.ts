class LocalStorageService {
  saveToken = (token: string) => {
    if (!token) return;
    localStorage.setItem('token', token);
  };

  saveObject = (obj: object, key: string) =>
    localStorage.setItem(key, JSON.stringify(obj));

  getObject = (key: string) => {
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
  };

  removeObject = (key: string) => localStorage.removeItem(key);

  removeToken = () => localStorage.removeItem('token');

  getToken = () => {
    const token = localStorage.getItem('token');
    if (!token || token === 'undefined') return null;
    return token;
  };
}

export default new LocalStorageService();
