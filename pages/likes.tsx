import React from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { likesAtom } from "../store/likesAtom";
const Likes = () => {
  const router = useRouter();
  const likes = useRecoilValue(likesAtom);
  const onPhotoClick = (id: any) => {
    router.push(id);
  };
  return (
    <div>
      {likes.length > 0 ? (
        <div className="product-info">
          찜 목록
          <section className="product-container">
            {likes.map((value) => (
              <div key={value.id} onClick={() => onPhotoClick(value.id)}>
                <img src={`${value.url}`} alt={`${value.name}`} />
                <div className="flex justify-between w-280 p-5">
                  <div className="product-info">
                    <span className="product-info__name">{value.name}</span>
                    <span className="product-info__price">
                      {value.likes * 1000}원
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      ) : (
        <div>찜한 상품이 없습니다.</div>
      )}
    </div>
  );
};
export default Likes;
