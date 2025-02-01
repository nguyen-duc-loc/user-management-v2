import React from "react";

import PaginationButton from "./PaginationButton";

const Pagination = ({
  count,
  currentLimit,
  currentPage,
}: {
  count: number;
  currentLimit: number;
  currentPage: number;
}) => {
  const totalPage =
    (count - (count % currentLimit)) / currentLimit +
    (count % currentLimit > 0 ? 1 : 0);

  return (
    <nav className="flex items-center justify-center gap-2">
      <PaginationButton page="previous" disabled={currentPage <= 1} />

      {currentPage > 2 && <PaginationButton page={1} />}
      {currentPage > 3 && <PaginationButton page="ellipsis" />}
      {currentPage > 1 && <PaginationButton page={currentPage - 1} />}

      <PaginationButton page={currentPage} isActive />

      {currentPage < totalPage && <PaginationButton page={currentPage + 1} />}
      {currentPage + 2 < totalPage && <PaginationButton page="ellipsis" />}
      {currentPage < totalPage - 1 && <PaginationButton page={totalPage} />}

      <PaginationButton page="next" disabled={currentPage >= totalPage} />
    </nav>
  );
};

export default Pagination;
