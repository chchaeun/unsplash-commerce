import React from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { fetchPhotos } from "./api/fetchPhotos";
import { useRouter } from "next/router";
export interface IPhoto {
  id: string;
  likes: number;
  urls: {
    thumb: string;
  };
  user: {
    first_name: string;
  };
}
interface IPage {
  data: IPhoto[];
  nextPage: number;
}
interface IProps {
  pageParams: number[];
  pages: IPage[];
}

const List = (props: IProps) => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      ["photos"],
      async ({ pageParam = 1 }) => {
        return await fetchPhotos(pageParam);
      },
      {
        initialData: props,
        getNextPageParam: (lastPage) => {
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
      <div className="product-info">
        <section className="product-container">
          {data?.pages.map((page, i) => {
            return (
              <React.Fragment key={i}>
                {page?.data.map((photo: IPhoto) => (
                  <div key={photo.id} onClick={() => onPhotoClick(photo.id)}>
                    <img
                      className="product-img"
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

export async function getStaticProps() {
  const data = await fetchPhotos(1);
  const pages = [data];
  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }
  if (data.data.length === 0) {
    return { notFound: true };
  }
  return {
    props: {
      pages,
      pageParams: 1,
    },
    revalidate: 3600,
  };
}

export default List;
