import { Pagination, Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function AppPagination({ metaData, onPageChange }) {
  const { currentPage, totalPages } = metaData;
  const [pageNumber, setPageNumber] = useState(currentPage);

  useEffect(() => {
    setPageNumber(currentPage);
  }, [currentPage]);

  function handlePageChange(page) {
    setPageNumber(page);
    onPageChange(page);
  }

  return (
    <Box sx={{ pb: 5 }}>
      <Pagination
        color="secondary"
        size="large"
        count={totalPages}
        page={pageNumber}
        onChange={(_, page) => handlePageChange(page)}
      />
    </Box>
  );
}
