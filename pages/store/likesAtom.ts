import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

interface ILikes {
  id: string;
  url: string;
  name: string;
  likes: number;
}

export const likesAtom = atom<ILikes[]>({
  key: "likes",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
