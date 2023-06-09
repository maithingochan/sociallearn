import React from "react";

const LoadMoreBtn = ({ load, handleLoadMore, page, result }) => {
  return (
    <>
      {result < 3 * (page - 1)
        ? ""
        : !load && (
            <button
              className="btn btn-dark mx-auto d-block"
              onClick={handleLoadMore}
            >
              Load more
            </button>
          )}
    </>
  );
};

export default LoadMoreBtn;
