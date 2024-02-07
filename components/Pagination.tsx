import * as React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function CustomIcons() {
  return (
    <Stack spacing={2}>
      <Pagination
        color="primary"
        count={5}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
        sx={{
          "& .MuiPaginationItem-page, & .Mui-selected": {
            color: "white", // Set the text color to white
          },
          "& .MuiSvgIcon-root": {
            fill: "white", // Set the icon color to white
          },
        }}
      />
    </Stack>
  );
}
