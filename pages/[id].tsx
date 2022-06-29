import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { likesAtom } from "../store/likesAtom";
import { api } from "../utils/myApi";
import { useRecoilState } from "recoil";
interface IDetail {
  id: string;
  likes: number;
  urls: {
    regular: string;
    thumb: string;
  };
  user: {
    first_name: string;
  };
}
const Detail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [likes, setLikes] = useRecoilState(likesAtom);
  const { data: detail } = useQuery<IDetail>(["photoDetail", id], async () => {
    return await api.get(`/photos/${id}`).then((res) => res.data);
  });

  const isLike = (id: string) => {
    for (let i = 0; i < likes.length; i++) {
      if (likes[i].id === id) {
        return true;
      }
    }
    return false;
  };

  const onLikeClick = (id: string) => {
    let newLikes;
    if (!detail) {
      return;
    } else if (isLike(id)) {
      newLikes = likes.filter((value) => value.id !== id);
    } else {
      newLikes = [
        ...likes,
        {
          id,
          url: detail.urls.thumb,
          name: detail.user.first_name,
          likes: detail.likes,
        },
      ];
    }
    setLikes(newLikes);
  };
  return (
    <div>
k      {detail && (
        <div className="product-detail-container">
          <div className="flex-col-center w-520">
            <img
              className="w-480 h-480 mb-10"
              src={`${detail?.urls.regular}`}
              alt={`${detail?.user.first_name}`}
            />
            <div className="product-detail-info">
              <span className="product-detail-info__name">
                {detail?.user.first_name}
              </span>
              <hr className="divide-line-gray my-20" />
              <div className="flex justify-between">
                <span>금액</span>
                <span className="product-detail-info__price">
                  {detail?.likes && detail.likes * 1000}
                </span>
              </div>
            </div>
            <button
              className="product-detail-button flex-center mt-20"
              onClick={() => onLikeClick(detail.id)}
            >
              {isLike(detail.id) ? "찜 취소" : "찜하기"}
            </button>
            <button className="product-detail-button flex-center mt-20">
              장바구니
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Detail;
