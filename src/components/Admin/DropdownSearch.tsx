import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useEffect } from "react";

const options = [
  { title: "Vacant", status: "Vacant" },
  { title: "Occupied", status: "Occupied" },
  { title: "Assign Clean", status: "Assign Clean" },
  { title: "Assign Dirty", status: "Assign Dirty" },
  { title: "Out of Service", status: "Out of Service" },
];

export default function UseAutocomplete() {
  const [selectedStatus, setSelectedStatus] = React.useState(null);

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

  const getStatusStyle = (status) => {
    return {
      backgroundColor: theme.palette.status[status]?.main || "inherit",
      color: theme.palette.status[status]?.contrastText || "inherit",
    };
  };

  // useEffect(() => {
  //   if (selectedStatus) {
  //     setSelectedStatus(selectedStatus);
  //   }
  // }, [selectedStatus]);

  return (
    <label>
      <ThemeProvider theme={theme}>
        <Autocomplete
          options={options}
          value={selectedStatus}
          style={{
            display: "flex",
            border: 0,
            // ":active": {
            //   borderColor: "blue",
            // },
            // ":focus": {
            //   backgroundColor: "lightblue",
            // },
          }}
          onChange={(event, newValue) => {
            setSelectedStatus(newValue);
          }}
          getOptionLabel={(option) => option.title}
          renderInput={(params) => (
            <div ref={params.InputProps.ref}>
              <input
                type="text"
                {...params.inputProps}
                style={{
                  color:
                    theme.palette.status[selectedStatus?.status]
                      ?.contrastText || "inherit",
                  backgroundColor:
                    theme.palette.status[selectedStatus?.status]?.main ||
                    "inherit",
                  // ":active": {
                  //   borderColor: "blue",
                  // },
                  // ":focus": {
                  //   backgroundColor: "lightblue",
                  // },
                }}
                placeholder="Search status..."
                // className="w-[212px] px-4 py-3 rounded-t border-b-[1px] border-gray-400 bg-white"
                className="px-3 py-1 m-2 rounded text-body2 flex focus:border-none active:border-none"
              />
            </div>
          )}
          renderOption={(props, option) => (
            <li
              {...props}
              style={getStatusStyle(option.status)}
              className="px-3 py-1 m-2 rounded text-body2 cursor-pointer inline-block"
            >
              {option.title}
            </li>
          )}
        />
      </ThemeProvider>
    </label>
  );
}
