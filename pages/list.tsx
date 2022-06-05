import React from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { fetchPhotos } from "./api/fetchPhotos";
import Nav from "./nav";
import { useRouter } from "next/router";
interface IPhoto {
  id: string;
  likes: number;
  urls: {
    thumb: string;
  };
  user: {
    first_name: string;
  };
}

const List = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["photos"],
      async ({ pageParam = 1 }) => {
        return await fetchPhotos(pageParam);
      },
      {
        getNextPageParam: (lastPage) => {
          // 마지막 페이지 예외처리 필요
          return lastPage.nextPage;
        },
      }
    );
  const router = useRouter();
  const onPhotoClick = (id: string) => {
    router.push(id);
  };
  return (
    <div>
      <Nav />
      <div className="product-info">
        <section className="product-container">
          {data?.pages.map((page, i) => {
            return (
              <React.Fragment key={i}>
                {page?.data.map((photo: IPhoto) => (
                  <div key={photo.id} onClick={() => onPhotoClick(photo.id)}>
                    <img
                      src={`${photo.urls.thumb}`}
                      alt={`${photo.user.first_name}`}
                    />
                    <div className="flex justify-between w-280 p-5">
                      <div className="product-info">
                        <span className="product-info__name">
                          {photo.user.first_name}
                        </span>
                        <span className="product-info__price">
                          {photo.likes * 1000}원
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </React.Fragment>
            );
          })}
        </section>
        <button
          className="flex-center"
          type="button"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
    </div>
  );
};
export default List;
