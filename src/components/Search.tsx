import { useContext, useState, useEffect } from "react";
import { RoomsContext } from "../App.tsx";
import { useNavigate } from "react-router-dom";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import dayjs, { Dayjs } from "dayjs";
import { SxProps } from "@mui/system";
import "../App.css";


// const useStyles = makeStyles((theme) => ({
//   customDatePicker: {
//     '& .MuiPickersModal-dialog': {
//       // Custom styles for the date picker dialog
//       backgroundColor: 'lightblue',
//     },
//     '& .MuiPickersDay-day': {
//       // Custom styles for individual date cells
//       color: 'green',
//       '&.MuiPickersDay-daySelected': {
//         backgroundColor: 'blue',
//         color: 'white',
//       },
//     },
//   },
// }));
import useToggleState from "../hooks/useToggleState";

function Search({ seachResultBtn, onSearchResult, setUserInput }) {
  const context = useContext(RoomsContext);
  const navigate = useNavigate();
  const userInput = context.userInput;
  console.log(userInput);

  const color: string = "#A0ACC3";

  // const classes = useStyles();
  const theme = createTheme({
    components: {
      MuiIconButton: {
        styleOverrides: {
          sizeMedium: {
            color,
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color,
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            color,
          },
        },
      },
    },
    palette: {
      primary: {
        main: "#E76B39",
        light: "#E76B39",
        dark: "#E76B39",
      },
      MuiPickersDay: {
        day: {
          color: "#c44242",
        },
        daySelected: {
          backgroundColor: "#436E70",
        },
        dayDisabled: {
          color: "#436E70",
        },
        current: {
          color: "#436E70",
        },
      },
    },
  });

  

  const initialState = userInput || {
    checkInDate: dayjs(),
    checkOutDate: dayjs(),
    room: 1,
    person: 2,
  };
  // console.log(initialState);

  const [checkInDate, setCheckInDate] = useState(initialState.checkInDate);
  const [checkOutDate, setCheckOutDate] = useState(initialState.checkOutDate);
  let [room, setRoom] = useState(initialState.room);
  let [person, setPerson] = useState(initialState.person);
  const [showDropdown, setShowDropdown] = useToggleState(false);
    

  
  // const [isOpen, setIsOpen] = useState(false);
  // let onlyDate = e.$d.toISOString();

  useEffect(() => {
    if (!userInput) {
      setCheckInDate(dayjs().add(1, "day"));
      setCheckOutDate(dayjs().add(2, "day"));
    }
  }, []);

  useEffect(() => {
    setCheckOutDate(checkInDate.add(1, "day"));
  }, [checkInDate]);

  function handleSubmit(newValue) {
    newValue.preventDefault();
    if (room === 0) return;
    if (person === 0) return;

    const result = {
      checkInDate,
      checkOutDate,
      room,
      person,
    };
    // console.log(result);
    onSearchResult(result);
    setUserInput(result);
    navigate("/search");
  }

  return (
    <div className="flex justify-center items-end ">
      <div className="form-control">
        <label className="label">
          <span className="text-gray-900 text-body1">Check In</span>
        </label>

        <DemoContainer components={["DatePicker"]} >
          <ThemeProvider theme={theme}>
            <DatePicker
              showDaysOutsideCurrentMonth
              fixedWeekNumber={6}
              defaultValue={checkInDate}
              value={checkInDate}
              format="dd, DD-MM-YYYY"
              disablePast
              onChange={(newValue) => setCheckInDate(newValue)}
              slotProps={{ textField: { size: "medium" } }}
              sx={{
                width: 240,
              }}
            />
          </ThemeProvider>
        </DemoContainer>
      </div>
      <div className="px-8 py-4">-</div>

      <div className="form-control pr-10">
        <label className="label">
          <span className="text-gray-900 text-body1">Check Out</span>
        </label>

        <DemoContainer components={["DatePicker"]}>
          <ThemeProvider theme={theme}>
            <DatePicker
              showDaysOutsideCurrentMonth
              fixedWeekNumber={6}
              defaultValue={checkOutDate}
              value={checkOutDate}
              format="dd, DD-MM-YYYY"
              minDate={checkInDate}
              disablePast
              onChange={(newValue) => setCheckOutDate(newValue)}
              slotProps={{ textField: { size: "medium" } }}
              sx={{
                width: 240,
                // height:200
              }}
              // PopperProps={{ sx: popperSx }}
            />
          </ThemeProvider>
        </DemoContainer>
      </div>

      <div className="pr-10">
        <label className="label">
          <span className="text-gray-900 text-body1">Rooms & Guests</span>
        </label>

        <div className="px-4 w-60 h-12 flex items-center justify-between  rounded-md border border-solid border-gray-500 text-gray-600 text-body1">
          <div>
            Rooms {room}, Guests {person}
          </div>
          <button onClick={setShowDropdown}>
            <img src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/arrow_drop_down_black_24dp%202.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2Fycm93X2Ryb3BfZG93bl9ibGFja18yNGRwIDIuc3ZnIiwiaWF0IjoxNjk0MDgyNzE5LCJleHAiOjE3MjU2MTg3MTl9.8aoooHCf3UW3mfKGTeBYHLZbuUsFc8lpg9037s3QFnA&t=2023-09-07T10%3A31%3A58.813Z" />
          </button>
        </div>
        {showDropdown && (
          <div className="px-4 py-3 w-60 top-34 flex flex-col absolute rounded-md bg-white drop-shadow-lg">
            <div className="pt-2 flex items-center justify-between">
              <div>Rooms</div>
              <div className="flex items-center">
                <button
                  style={
                    room < 2 ? { borderColor: "#9AA1B9", color: "#9AA1B9" } : {}
                  }
                  className="relative w-4 h-4 bg-white text-orange-600 rounded-full border border-solid border-orange-600"
                >
                  <div
                    className="absolute bottom-[-25%] right-[20%]"
                    onClick={() => {
                      if (room > 1) {
                        room--;
                        setRoom(room);
                      }
                    }}
                  >
                    -
                  </div>
                </button>

                <div className="w-8 flex justify-center">{room}</div>

                <button
                  style={
                    room === 26
                      ? { borderColor: "#9AA1B9", color: "#9AA1B9" }
                      : {}
                  }
                  className="relative w-4 h-4 bg-white text-orange-600 rounded-full border border-solid border-orange-600"
                >
                  <div
                    className="absolute bottom-[-25%] right-[10%]"
                    onClick={() => {
                      if (room < 26) {
                        room++;
                        setRoom(room);
                      }
                    }}
                  >
                    +
                  </div>
                </button>
              </div>
            </div>
            <div className="pt-2 flex items-center justify-between">
              <div>Guests</div>
              <div className="flex items-center">
                <button
                  style={
                    person < 2
                      ? { borderColor: "#9AA1B9", color: "#9AA1B9" }
                      : {}
                  }
                  className="relative w-4 h-4 bg-white text-orange-600 rounded-full border border-solid border-orange-600"
                >
                  <div
                    className="absolute bottom-[-25%] right-[20%]"
                    onClick={() => {
                      if (person > 1) {
                        person--;
                        setPerson(person);
                      }
                    }}
                  >
                    -
                  </div>
                </button>

                <div className="w-8 flex justify-center">{person}</div>

                <button
                  style={
                    person === 4
                      ? { borderColor: "#9AA1B9", color: "#9AA1B9" }
                      : {}
                  }
                  className="relative w-4 h-4 bg-white text-orange-600 rounded-full border border-solid border-orange-600"
                >
                  <div
                    className="absolute bottom-[-25%] right-[10%]"
                    onClick={() => {
                      if (person < 4) {
                        person++;
                        setPerson(person);
                      }
                    }}
                  >
                    +
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        type="submit"
        onClick={handleSubmit}
        className={`btn Button ${seachResultBtn}`}
      >
        Search
      </button>
    </div>
  );
}

export default Search;
