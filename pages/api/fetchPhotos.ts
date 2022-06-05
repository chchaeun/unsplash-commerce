import { api } from "../utils/myApi";

export const fetchPhotos = async (pageParams: number) => {
  const { data } = await api.get(`/photos?page=${pageParams}`);
  return {
    data,
    nextPage: pageParams + 1,
  };
};
