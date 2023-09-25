import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import { ClassNames } from "@emotion/react";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E4E6ED",
    fontSize: 14,
    fontWeight: 500,
    fontFamily: "Inter",
    color: "#424C6B",
    padding: "10px 16px",
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: "white",
    fontSize: 16,
    fontFamily: "Inter",
    color: "black",
    borderColor: "#E4E6ED",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  customerName: string,
  guest: number,
  roomType: string,
  amount: number,
  bedType: string,
  checkIn: string,
  checkOut: string
) {
  return { customerName, guest, roomType, amount, bedType, checkIn, checkOut };
}

function CustomerBooking() {
  const [booking, setBooking] = useState([]);
  const [filterBookingList, setFilterBookingList] = useState(booking);
  const [selectedByText, setSelectedByText] = useState("");

  const getBooking = async () => {
    try {
      const results = await axios(`http://localhost:4000/booking/`);

      setBooking(results.data.data);
      setFilterBookingList(results.data.data);
      console.log(results.data.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  const pattern = new RegExp(selectedByText, "i");
  const filterByName = (filteredData) => {
    if (!selectedByText) {
      return booking;
    }
    const filteredBookings = filteredData.filter((book) =>
      pattern.test(book.users.fullName)
    );
    return filteredBookings;
  };

  const filterByRoomType = (filteredData) => {
    if (!selectedByText) {
      return booking;
    }
    const filteredBookings = filteredData.filter((book) =>
      pattern.test(book.room_details.room_type)
    );
    return filteredBookings;
  };

  const handleNameChange = (event: Event) => {
    setSelectedByText(event.target.value);
  };
  const handleRoomTypeChange = (event: Event) => {
    setSelectedByText(event.target.value);
  };

  const handleInputChange = (event: Event) => {
    handleNameChange(event);
    handleRoomTypeChange(event);
  };

  useEffect(() => {
    getBooking();
    // setFilterBookingList(booking)
  }, []);

  useEffect(() => {
    let filteredData1 = filterByName(booking);
    let filteredData2 = filterByRoomType(booking);
    let combinedData = [...filteredData1, ...filteredData2];
    setFilterBookingList(combinedData);
  }, [selectedByText]);

  const rows = filterBookingList.map((book) => {
    return createData(
      book.users.fullName,
      book.amount_stay,
      book.room_details.room_type,
      book.amount_room,
      book.room_details.bed_types,
      book.check_in,
      book.check_out
    );
  });

  return (
    <div>
      <div className="bg-white h-20 flex flex-row justify-between items-center drop-shadow-md px-16">
        <p className=" text-black font-bold">Customer Booking</p>
        <div>
          <FormControl>
            <OutlinedInput
              value={selectedByText}
              onChange={handleInputChange}
              placeholder="Search…"
              size="small"
              id="input-with-icon-adornment"
              inputProps={{
                "aria-label": "weight",
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
      </div>
      {/* table field*/}
      <div className="bg-gray-100 px-16 py-12">
        <Paper sx={{ overflow: "hidden" }}>
          <TableContainer component={Paper}>
            <Table sx={{ maxHeight: 1000 }} aria-label="customized table ">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Customer</StyledTableCell>
                  <StyledTableCell>Guest(s)</StyledTableCell>
                  <StyledTableCell>Room type</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Bed type</StyledTableCell>
                  <StyledTableCell>Check-in</StyledTableCell>
                  <StyledTableCell>Check-out</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      {row.customerName}
                    </StyledTableCell>
                    <StyledTableCell>{row.guest}</StyledTableCell>
                    <StyledTableCell>{row.roomType}</StyledTableCell>
                    <StyledTableCell>{row.amount}</StyledTableCell>
                    <StyledTableCell>{row.bedType}</StyledTableCell>
                    <StyledTableCell>{row.checkIn}</StyledTableCell>
                    <StyledTableCell>{row.checkOut}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
}

export default CustomerBooking;
