const trimSlashes = (value: string) => value.replace(/^\/+/, "");

export const publicAsset = (path: string) => {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const encodedPath = trimSlashes(path)
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");

  return `${base}${encodedPath}`;
};
