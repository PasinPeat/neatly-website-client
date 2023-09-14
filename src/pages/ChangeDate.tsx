import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import "../App.css";

function ChangeDate() {
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

  return (
    <div>
      <Navbar />
      <div className="bg-bg flex flex-col items-center pt-20 pb-28">
        <h1 className="mb-12 w-[1120px] font-noto-serif-display text-headline2 font-medium text-green-800">
          Change Check-in
          <br></br>
          and Check-out Date
        </h1>
        <div className="w-[1120px] border-b-[1px] text-gray-700">
          <div className="flex flex-col gap-12 py-10">
            <div className="w-full flex justify-between">
              <div>
                <div className="w-[357px] h-[210px] rounded bg-cover bg-center">
                  <img src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/room_images/04%20Supreme/K-Studio_Lambs_Lions_CasaCookChania_022_GeorgRoske.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9yb29tX2ltYWdlcy8wNCBTdXByZW1lL0stU3R1ZGlvX0xhbWJzX0xpb25zX0Nhc2FDb29rQ2hhbmlhXzAyMl9HZW9yZ1Jvc2tlLmpwZyIsImlhdCI6MTY5NDUwODA0NSwiZXhwIjoxNzI2MDQ0MDQ1fQ.GPUAPR5qHYjoK9TqISz_AlCFcWJR0gvKKpu4gFkRw9k&t=2023-09-12T08%3A40%3A44.773Z" />
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="w-[715px]">
                  <div className="flex flex-row justify-between items-center">
                    <h2 className="text-headline4 text-black">
                      Superior Garden View
                    </h2>
                    <p className="text-gray-600 text-body1">
                      Booking date: Tue, 16 Oct 2022
                    </p>
                  </div>
                  <div className="mt-8 flex flex-col gap-1 ">
                    <p className="font-bold text-grey-800">Original Date</p>
                    <div>
                      <span>Th, 19 Oct 2022 </span>
                      <span className="px-2">-</span>
                      <span>Th, 19 Oct 2022 </span>
                    </div>
                  </div>
                  <div className="mt-8 p-4 bg-white">
                    <p className="font-bold text-grey-800">Change Date</p>
                    <div className="flex mt-4">
                      <div className="form-control">
                        <label className="label py-0">
                          <span className="text-gray-900 text-body1">
                            Check In
                          </span>
                        </label>

                        <DemoContainer components={["DatePicker"]}>
                          <ThemeProvider theme={theme}>
                            <DatePicker
                              showDaysOutsideCurrentMonth
                              fixedWeekNumber={6}
                              defaultValue={dayjs()}
                              value={dayjs()}
                              format="dd, DD-MM-YYYY"
                              disablePast
                              // onChange={(newValue) => setCheckInDate(newValue)}
                              slotProps={{ textField: { size: "medium" } }}
                              sx={{
                                "& input": {
                                  padding: "12px",
                                  width: "240px",
                                  fontFamily: "inter",
                                  color: "#2A2E3F",
                                },
                              }}
                            />
                          </ThemeProvider>
                        </DemoContainer>
                      </div>
                      <div className="flex items-end px-6 py-4">-</div>
                      <div className="form-control">
                        <label className="label py-0">
                          <span className="text-gray-900 text-body1">
                            Check In
                          </span>
                        </label>

                        <DemoContainer components={["DatePicker"]}>
                          <ThemeProvider theme={theme}>
                            <DatePicker
                              showDaysOutsideCurrentMonth
                              fixedWeekNumber={6}
                              defaultValue={dayjs()}
                              value={dayjs()}
                              format="dd, DD-MM-YYYY"
                              disablePast
                              // onChange={(newValue) => setCheckInDate(newValue)}
                              slotProps={{ textField: { size: "medium" } }}
                              sx={{
                                "& input": {
                                  padding: "12px",
                                  width: "240px",
                                  fontFamily: "inter",
                                  color: "#2A2E3F",
                                },
                              }}
                            />
                          </ThemeProvider>
                        </DemoContainer>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between -ml-4">
              <button
                // onClick={() => onRoomDetail(roomId)}
                className="btn capitalize bg-bg border-none font-semibold text-body1 text-orange-500 hover:bg-bg"
              >
                Cancel
              </button>
              <div className="flex">
                <div>
                  <button
                    className="btn Button"
                    onClick={() => navigate("/ChangeDate")}
                  >
                    Confirm Change Date
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <HistoryCard /> */}
      </div>
      <Footer />
    </div>
  );
}

export default ChangeDate;
