import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const status = [
  "Vacant",
  "Occupied",
  "Assign Clean",
  "Assign Dirty",
  "Out of Service",
];

const theme = createTheme({
  palette: {
    status: {
      Vacant: {
        main: "#F0F2F8",
        contrastText: "#006753",
      },
      Occupied: {
        main: "#E4ECFF",
        contrastText: "#084BAF",
      },
      "Assign Clean": {
        main: "#E5FFFA",
        contrastText: "#006753",
      },
      "Assign Dirty": {
        main: "#FFE5E5",
        contrastText: "#A50606",
      },
      "Out of Service": {
        main: "#F0F1F8",
        contrastText: "#6E7288",
      },
    },
  },
});

export default function UseAutocomplete() {
  const [selectedStatus, setSelectedStatus] = React.useState(null);

  const getStatusStyle = (status) => {
    return {
      backgroundColor: theme.palette.status[status]?.main || "inherit",
      color: theme.palette.status[status]?.contrastText || "inherit",
    };
  };

  return (
    <>
      <p></p>
      <ThemeProvider theme={theme}>
        <Autocomplete
          options={status}
          value={selectedStatus}
          onChange={(event, newValue) => {
            setSelectedStatus(newValue);
          }}
          style={{
            display: "flex",
          }}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <input
                type="text"
                {...params.inputProps}
                style={{
                  color:
                    theme.palette.status[selectedStatus]?.contrastText ||
                    "inherit",
                  backgroundColor:
                    theme.palette.status[selectedStatus]?.main || "inherit",
                }}
                placeholder="Search status..."
                className="px-3 py-1 m-2 rounded text-body2 flex focus:border-none active:border-none"
              />
            </div>
          )}
          renderOption={(props, option) => (
            <li
              {...props}
              style={getStatusStyle(option)}
              className="px-3 py-1 m-2 rounded text-body2 cursor-pointer inline-block"
            >
              {option}
            </li>
          )}
        />
      </ThemeProvider>
    </>
  );
}
