import { api } from "../../utils/myApi";

export const fetchPhotoById = async (id: string) => {
  const { data } = await api.get(`/photos/${id}`);
  return data;
};
