import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const status: string[] = [
  "Vacant",
  "Occupied",
  "Assign Clean",
  "Assign Dirty",
  "Out of Service",
];

interface theme {
  palette: palette;
}

interface palette {
  status: {
    Vacant: status;
    Occupied: status;
    "Assign Clean": status;
    "Assign Dirty": status;
    "Out of Service": status;
  };
}

interface status {
  main: string;
  contrastText: string;
}

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
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(
    null
  );
  const [open, setOpen] = React.useState<boolean>(false);

  const getStatusStyle = (status: string) => {
    return {
      backgroundColor: theme.palette.status[status]?.main || "inherit",
      color: theme.palette.status[status]?.contrastText || "inherit",
    };
  };

  const handleButtonClick = () => {
    setOpen(!open);
  };

  const handleInputChange = (
    event: React.ChangeEvent<{}>,
    newValue: string | null
  ) => {
    setSelectedStatus(newValue);
    if (!newValue) {
      setOpen(false);
    }
  };

  console.log(selectedStatus);

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="px-3 py-1 rounded text-body2 cursor-pointer"
        style={{
          color:
            theme.palette.status[selectedStatus]?.contrastText || "inherit",
          backgroundColor:
            theme.palette.status[selectedStatus]?.main || "inherit",
        }}
      >
        {selectedStatus ? `${selectedStatus}` : "Search status..."}
      </button>
      <ThemeProvider theme={theme}>
        <Autocomplete
          options={status}
          value={selectedStatus}
          onChange={(event: React.ChangeEvent<{}>, newValue: string | null) => {
            setSelectedStatus(newValue);
            setOpen(false); // Close the Autocomplete when an option is selected
          }}
          open={open}
          style={{
            display: "flex",
          }}
          // className="focus:border-0 active:border-0"
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <div ref={params.InputProps.ref} className="relative ">
              <input
                type="text"
                {...params.inputProps}
                style={{
                  display: open ? "block" : "none",
                }}
                placeholder="Search status..."
                className="w-[180px] h-[32px] px-4 py-3 rounded-t text-gray-600 text-body2 border-b-[1px] border-gray-400 shadow-md bg-white focus:border-0 active:border-0"
                onChange={(e) => handleInputChange(e, e.target.value)}
              />
            </div>
          )}
          renderOption={(props, option) => (
            <li
              {...props}
              style={getStatusStyle(option)}
              className="px-3 py-1 m-2 rounded text-body2 cursor-pointer inline-block z-[999]"
            >
              {option}
            </li>
          )}
        />
      </ThemeProvider>
    </>
  );
}
