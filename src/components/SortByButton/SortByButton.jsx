import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSearchParams } from "react-router";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import { useState } from "react";

function SortByButton({
  setSort,
  setOrder,
  initialSort,
  initialOrder,
  setPage,
}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isAllItemsSelected, setIsAllItemsSelected] = useState(
    initialSort === "none"
  );

  const handleChangeSort = (event) => {
    const selectedValue = event.target.value;
    setSort(selectedValue);

    if (selectedValue === "none") {
      setIsAllItemsSelected(true);
    } else {
      setIsAllItemsSelected(false);
    }
  };

  const handleChangeOrder = (event) => {
    const sortInUrl = searchParams.get("sort_by");

    if (sortInUrl && sortInUrl !== "none") {
      setOrder(event.target.value);
    }
  };
  return (
    <Box sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}>
      <Stack
        direction="row"
        alignItems="center"
        gap={3}
        sx={{ marginRight: 5 }}
      >
        <FormControl sx={{ minWidth: 150, width: "auto" }}>
          <InputLabel size="small" id="demo-simple-select-label">
            Sort By
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            label="Sort By"
            id="demo-simple-select"
            size="small"
            value={initialSort}
            onChange={handleChangeSort}
          >
            <MenuItem value={"none"}>None</MenuItem>
            <MenuItem value={"created_at"}>Date</MenuItem>
            <MenuItem value={"comment_count"}>Comment Count</MenuItem>
            <MenuItem value={"votes"}>Votes</MenuItem>
          </Select>
        </FormControl>
        <FormControl disabled={isAllItemsSelected}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={initialOrder}
            name="radio-buttons-group"
            onChange={handleChangeOrder}
          >
            <FormControlLabel
              value="desc"
              control={<Radio />}
              label="High to Low"
              sx={{ marginBottom: "-15px", marginTop: "-5px" }}
            />
            <FormControlLabel
              value="asc"
              control={<Radio />}
              label="Low to High"
            />
          </RadioGroup>
        </FormControl>
      </Stack>
    </Box>
  );
}

export default SortByButton;
