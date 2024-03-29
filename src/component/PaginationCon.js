import * as React from "react";

import { Link, useParams } from "react-router-dom";
import { Pagination, PaginationItem, Stack } from "@mui/material";

import { AppContext } from "../context/appContext";
import { useContext } from "react";

export default function PaginationCon({ data }) {
  const { setPageNumb, handlePage } = useContext(AppContext);
  const { pagination } = useParams();

  // console.log("pageNumb: ", pageNumb);


  React.useEffect(() => {
    setPageNumb(pagination);
  });
  return (
    <Stack spacing={2} mb={2} mt={2}>
      <Pagination
        size="small"
        // count={data?.length < 20 ? Number.parseInt(pageNumb) : 100}
        // count={data?.length < 20 ? +pageNumb : 100}
        count={100}
        showFirstButton
        showLastButton
        sx={{ margin: "auto" }}
        onChange={(e, pageNumb) => handlePage(pageNumb)}
        page={Number.parseInt(pagination, 10)}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/cards/${item.page}`}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
