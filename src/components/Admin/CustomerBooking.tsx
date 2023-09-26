import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import React from "react";
import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import dayjs from "dayjs";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

export default function CustomPaginationActionsTable() {
  const [booking, setBooking] = useState([]);
  const [filterBookingList, setFilterBookingList] = useState([]);
  const [selectedByText, setSelectedByText] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const [sortBookingState, setSortBookingState] = useState(booking);

  //get all booking
  const getBooking = async () => {
    try {
      const results = await axios(`http://localhost:4000/booking/admin/admin`);

      setBooking(results.data);
      setFilterBookingList(results.data);
      console.log(results.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  //filter search
  const pattern = new RegExp(selectedByText, "i");
  const filterByName = (filteredData) => {
    const filteredBookings = filteredData.filter((book) =>
      pattern.test(book.users.fullName)
    );
    return filteredBookings;
  };

  const filterByRoomType = (filteredData) => {
    const filteredBookings = filteredData.filter((book) =>
      pattern.test(book.room_details.room_type)
    );
    return filteredBookings;
  };

  const handleInputChange = (event: Event) => {
    setSelectedByText(event.target.value);
  };

  useEffect(() => {
    getBooking();
  }, []);

  useEffect(() => {
    let timer;

    if (selectedByText) {
      if (sortBy === "all") {
        let filteredData1 = filterByName(booking);
        let filteredData2 = filterByRoomType(booking);
        let combinedData = [...filteredData1, ...filteredData2];
        timer = setTimeout(() => {
          setFilterBookingList(combinedData);
        }, 400);
      } else if (sortBy === "past") {
        let filteredData1 = filterByName(sortBookingState);
        let filteredData2 = filterByRoomType(sortBookingState);
        let combinedData = [...filteredData1, ...filteredData2];
        timer = setTimeout(() => {
          setFilterBookingList(combinedData);
        }, 400);
      } else if (sortBy === "cancelled") {
        let filteredData1 = filterByName(sortBookingState);
        let filteredData2 = filterByRoomType(sortBookingState);
        let combinedData = [...filteredData1, ...filteredData2];
        timer = setTimeout(() => {
          setFilterBookingList(combinedData);
        }, 400);
      } else if (sortBy === "incoming") {
        let filteredData1 = filterByName(sortBookingState);
        let filteredData2 = filterByRoomType(sortBookingState);
        let combinedData = [...filteredData1, ...filteredData2];
        timer = setTimeout(() => {
          setFilterBookingList(combinedData);
        }, 400);
      } else if (sortBy === "ongoing") {
        let filteredData1 = filterByName(sortBookingState);
        let filteredData2 = filterByRoomType(sortBookingState);
        let combinedData = [...filteredData1, ...filteredData2];
        timer = setTimeout(() => {
          setFilterBookingList(combinedData);
        }, 400);
      }
    }

    if (!selectedByText && sortBy === "all") {
      setFilterBookingList(booking);
    } else if (!selectedByText && sortBy === "past") {
      handleSortChange("past");
    } else if (!selectedByText && sortBy === "cancelled") {
      handleSortChange("cancelled");

      return () => clearTimeout(timer);
    }
  }, [selectedByText]);

  const currentDate = dayjs().format("YYYY-MM-DD");

  const rows = filterBookingList.map((book) => {
    let status;

    if (book.status === "cancel") {
      status = "Cancel";
    } else if (currentDate > book.check_out) {
      status = "Past";
    } else if (currentDate >= book.check_in && book.check_out >= currentDate) {
      status = "Ongoing";
    } else if (currentDate < book.check_in) {
      status = "Incoming";
    }

    return createData(
      book.users.fullName,
      book.amount_stay,
      book.room_details.room_type,
      book.amount_room,
      book.room_details.bed_types,
      book.check_in,
      book.check_out,
      status
    );
  });

  console.log(rows);

  const handleSortChange = (event) => {
    //set sorted by
    if (event === "all") {
      setSortBy("all");
      setFilterBookingList(booking);
    }

    if (event === "past") {
      const sortedPastBooking = booking.filter((book) =>
        dayjs(book.check_in).isBefore(dayjs())
      );
      setSortBy("past");
      setFilterBookingList(sortedPastBooking);
      setSortBookingState(sortedPastBooking);
    }

    if (event === "cancelled") {
      const sortedCancelledBooking = booking.filter(
        (book) => book.status === "cancel"
      );
      setSortBy("cancelled");
      setFilterBookingList(sortedCancelledBooking);
      setSortBookingState(sortedCancelledBooking);
    }

    if (event === "incoming") {
      const sortedIncomingBooking = booking.filter((book) =>
        dayjs(book.check_in).isAfter(dayjs())
      );
      setSortBy("incoming");
      setFilterBookingList(sortedIncomingBooking);
      setSortBookingState(sortedIncomingBooking);
    }

    if (event === "ongoing") {
      const sortedCurrentBooking = booking.filter(
        (book) => currentDate >= book.check_in && currentDate <= book.check_out
      );
      setSortBy("ongoing");
      setFilterBookingList(sortedCurrentBooking);
      setSortBookingState(sortedCurrentBooking);
    }
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#E4E6ED",
      fontSize: 14,
      fontWeight: 500,
      fontFamily: "Inter",
      padding: "10px 16px",
      color: "#424C6B",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
      fontFamily: "Inter",
      borderColor: "none",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
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
    checkOut: string,
    status: string
  ) {
    return {
      customerName,
      guest,
      roomType,
      amount,
      bedType,
      checkIn,
      checkOut,
      status,
    };
  }

  console.log(rows);

  return (
    <div>
      <div className="bg-gray-100 h-screen">
        {/* search */}
        <div className="bg-white h-20 flex flex-row justify-between items-center drop-shadow-md px-16">
          <p className=" text-black font-bold">Customer Booking</p>

          <div>
            <select
              className="select select-bordered w-full max-w-xs"
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option selected value="all">
                All
              </option>
              <option value="incoming">Incoming</option>
              <option value="ongoing">Ongoing</option>
              <option value="past">Past</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <FormControl>
              <OutlinedInput
                value={selectedByText}
                onChange={handleInputChange}
                placeholder="Search…"
                size="small"
                color="warning"
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
        <div className="px-24 py-12">
          <Paper sx={{ overflow: "hidden" }}>
            <TableContainer component={Paper}>
              <Table aria-label="custom pagination table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Customer</StyledTableCell>
                    <StyledTableCell>Guest(s)</StyledTableCell>
                    <StyledTableCell>Room type</StyledTableCell>
                    <StyledTableCell>Amount</StyledTableCell>
                    <StyledTableCell>Bed type</StyledTableCell>
                    <StyledTableCell>Check-in</StyledTableCell>
                    <StyledTableCell>Check-out</StyledTableCell>
                    <StyledTableCell>Status</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? rows.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : rows
                  ).map((row, index) => (
                    <StyledTableRow
                      key={index}
                      isCancelled={row.isCancelled}
                      onClick={() => handleSelectedBookingDetail(index)}
                      className="hover:bg-gray-300"
                    >
                      <StyledTableCell>{row.customerName}</StyledTableCell>
                      <StyledTableCell>{row.guest}</StyledTableCell>
                      <StyledTableCell>{row.roomType}</StyledTableCell>
                      <StyledTableCell>{row.amount}</StyledTableCell>
                      <StyledTableCell>{row.bedType}</StyledTableCell>
                      <StyledTableCell>{row.checkIn}</StyledTableCell>
                      <StyledTableCell>{row.checkOut}</StyledTableCell>
                      <StyledTableCell>{row.status}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[10]}
                      colSpan={3}
                      count={rows.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          "aria-label": "rows per page",
                        },
                        native: true,
                      }}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      ActionsComponent={TablePaginationActions}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
    </div>
  );
}
