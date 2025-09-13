// Middleware lấy thông tin từ system_config.json

let configCache: any = null;

export const getSystemConfig = () => {
  if (configCache) return configCache;
  return fetch('/system_config.json').then((response) => {
    if (!response.ok) throw new Error('Cannot load system config');
    configCache = response.json();
    return configCache;
  });
};