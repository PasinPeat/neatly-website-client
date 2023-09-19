import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import dayjs from "dayjs";
import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoCloseOutline } from "react-icons/io5";

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
      //@ts-ignore
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

  const navigate = useNavigate();
  const { bookId } = useParams();

  const [bookingData, setBookingData] = useState({
    room_details: {
      room_type: "",
      room_images: [],
    },
    check_in: "",
    check_out: "",
    booking_date: "",
    room_avaliable_id: "",
    user_id: "",
  });

  const [checkInDate, setCheckInDate] = useState();
  const [checkOutDate, setCheckOutDate] = useState();
  const [maxDate, setMaxDate] = useState();

  const [showPopup, setShowPopup] = useState(false);

  const calculateCheckOutDate = (newCheckInDate: any) => {
    const originalCheckOutDate = dayjs(bookingData.check_out);
    const numberOfDays = originalCheckOutDate.diff(
      dayjs(bookingData.check_in),
      "day"
    );
    const newCheckOutDate = newCheckInDate.add(numberOfDays, "day");

    return newCheckOutDate;
  };

  const handleCheckInDateChange = (newValue: any) => {
    const newCheckOutDate = calculateCheckOutDate(newValue);
    setCheckOutDate(newCheckOutDate);
    setMaxDate(newCheckOutDate);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/booking/${bookId}`
      );
      const data = response.data.data;
      setBookingData(data);
      setCheckInDate(data.check_in);
      setCheckOutDate(data.check_out);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async () => {
    const newCheckInDate = dayjs(checkInDate);
    const newCheckOutDate = dayjs(checkOutDate);

    const data = {
      check_in: newCheckInDate.format("YYYY-MM-DD"),
      check_out: newCheckOutDate.format("YYYY-MM-DD"),
      room_avaliable_id: bookingData.room_avaliable_id,
    };

    try {
      await axios.put(
        `http://localhost:4000/booking/ChangeDate/${bookId}`,
        data
      );
      navigate(`/booking/user/${bookingData.user_id}`);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const handleConfirmChange = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-bg flex flex-col items-center pt-20 pb-28">
        <h1 className="mb-12 w-[1120px] font-noto-serif-display text-headline2 font-medium text-gray-900">
          Change Check-in
          <br></br>
          and Check-out Date
        </h1>
        <div className="w-[1120px] border-b-[1px] text-gray-700">
          <div className="flex flex-col gap-12 py-10">
            <div className="w-full flex justify-between">
              <div>
                <div className="w-[357px] h-[210px] rounded bg-cover bg-center">
                  <img src={bookingData.room_details.room_images[0]} />
                </div>
              </div>
              <div className="flex flex-col justify-between">
                <div className="w-[715px]">
                  <div className="flex flex-row justify-between items-center">
                    <h2 className="text-headline4 text-black">
                      {bookingData.room_details
                        ? bookingData.room_details.room_type
                        : "Loading..."}
                    </h2>
                    <p className="text-gray-600 text-body1">
                      Booking date:{" "}
                      {dayjs(bookingData.booking_date).format(
                        "ddd, D MMM YYYY"
                      )}
                    </p>
                  </div>
                  <div className="mt-8 flex flex-col gap-1 ">
                    <p className="font-bold text-grey-800">Original Date</p>
                    <div>
                      <span>
                        {dayjs(bookingData.check_in).format("ddd, D MMM YYYY")}
                      </span>
                      <span className="px-2">-</span>
                      <span>
                        {dayjs(bookingData.check_out).format("ddd, D MMM YYYY")}
                      </span>
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
                              value={dayjs(checkInDate)}
                              format="ddd, D MMM YYYY"
                              minDate={dayjs().add(1, "day")}
                              disablePast
                              onChange={(newValue: any) => {
                                setCheckInDate(newValue);
                                handleCheckInDateChange(newValue);
                              }}
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
                            Check Out
                          </span>
                        </label>

                        <DemoContainer components={["DatePicker"]}>
                          <ThemeProvider theme={theme}>
                            <DatePicker
                              showDaysOutsideCurrentMonth
                              fixedWeekNumber={6}
                              defaultValue={dayjs()}
                              value={dayjs(checkOutDate)}
                              format="ddd, D MMM YYYY"
                              maxDate={maxDate}
                              minDate={dayjs(checkInDate).add(1, "day")}
                              disablePast
                              onChange={(newValue: any) =>
                                setCheckOutDate(newValue)
                              }
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
                onClick={() => navigate(`/booking/user/${bookingData.user_id}`)}
                className="btn capitalize bg-bg border-none font-semibold text-body1 text-orange-500 hover:bg-bg"
              >
                Cancel
              </button>
              <div className="flex">
                <div>
                  <button
                    className="btn Button"
                    onClick={() => {
                      handleConfirmChange();
                    }}
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
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-25 bg-gray-900 z-50">
          <div className="w-[631px] h-[200px] bg-white flex flex-col font-inter z-60">
            <div className="flex justify-start items-center text-headline5 text-black pl-6 mt-3 mb-3 relative">
              Change Date
              <button className="absolute right-5" onClick={handlePopupClose}>
                <IoCloseOutline />
              </button>
            </div>
            <hr />
            <div className="pl-6 text-body1 text-gray-700 mt-4">
              Are you sure you want to change your check-in and check-out date?
            </div>
            <div className="flex justify-end space-x-3 mt-[30px] mr-5">
              <button
                className="w-[144px] h-[48px] text-orange-500 bg-white border border-orange-500 rounded-md hover:border-orange-400 hover:text-orange-400 active:border-orange-600 active:text-orange-600"
                onClick={handlePopupClose}
              >
                No, I don't
              </button>
              <button
                className="w-[227px] h-[48px] bg-orange-600 text-white rounded-md hover:bg-orange-500 active:bg-orange-700"
                onClick={() => {
                  handlePopupClose();
                  handleSubmit();
                }}
              >
                Yes, I want to change
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

export default ChangeDate;