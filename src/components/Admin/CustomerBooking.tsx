import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import { useState, useEffect, useContext } from "react";
import { createTheme } from "@mui/system";
import axios from "axios";
import dayjs from "dayjs";
import BookingDetails from "./BookingDetails";
import NavbarAdmin from "./NavbarAdmin";
import SelectSortBy from "./SelectSortBy";
import SearchAdmin from "./SearchAdmin";
import PaginationAdmin from "./PaginationAdmin";
import PageContext from "../../contexts/PageContext";
import useFormattedDate from "../../hooks/useFormattedDate";

export default function CustomPaginationActionsTable() {
  const [booking, setBooking] = useState([]);
  const [filterBookingList, setFilterBookingList] = useState(booking);
  const [selectedByText, setSelectedByText] = useState("");
  const [sortBy, setSortBy] = useState("all");
  const [sortBookingState, setSortBookingState] = useState(booking);
  const [complete, setComplete] = useState(false);

  /*get all booking*/
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

  /*filter search*/
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
      } else if (sortBy === "checkedOut") {
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
    } else if (!selectedByText && sortBy === "checkedOut") {
      handleSortChange("checkedOut");
    } else if (!selectedByText && sortBy === "cancelled") {
      handleSortChange("cancelled");

      return () => clearTimeout(timer);
    }
  }, [selectedByText]);

  /*sort checked out status after other*/
  function sortByStatus(a, b) {
    if (a.status === "Checked Out" && b.status !== "Checked Out") {
      return 1;
    } else if (a.status !== "Checked Out" && b.status === "Checked Out") {
      return -1;
    } else {
      return 0;
    }
  }

  const currentDate = dayjs().format("YYYY-MM-DD");

  const rows = filterBookingList
    .map((book) => {
      let status;

      if (book.status === "cancel") {
        status = "Cancelled";
      } else if (currentDate > book.check_out) {
        status = "Checked Out";
      } else if (
        currentDate >= book.check_in &&
        book.check_out >= currentDate
      ) {
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
        status,
        book.book_id
      );
    })
    .sort(sortByStatus);

  function createData(
    customerName: string,
    guest: number,
    roomType: string,
    amount: number,
    bedType: string,
    checkIn: string,
    checkOut: string,
    status: string,
    book_id: number
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
      book_id,
    };
  }

  /*page context*/
  const { page, setPage, rowsPerPage, setRowsPerPage } =
    useContext(PageContext);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  /*handle sort change*/
  const handleSortChange = (event) => {
    if (event === "all") {
      setSortBy("all");
      setFilterBookingList(booking);
    }

    if (event === "checkedOut") {
      const sortedPastBooking = booking.filter(
        (book) => currentDate > book.check_out && book.status !== "cancel"
      );
      setSortBy("checkedOut");
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
      const sortedIncomingBooking = booking.filter(
        (book) => currentDate < book.check_in && book.status !== "cancel"
      );
      setSortBy("incoming");
      setFilterBookingList(sortedIncomingBooking);
      setSortBookingState(sortedIncomingBooking);
    }

    if (event === "ongoing") {
      const sortedCurrentBooking = booking.filter(
        (book) =>
          currentDate >= book.check_in &&
          book.check_out >= currentDate &&
          book.status !== "cancel"
      );
      setSortBy("ongoing");
      setFilterBookingList(sortedCurrentBooking);
      setSortBookingState(sortedCurrentBooking);
    }
    setPage(0);
  };

  /*handle selected booking*/
  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleRowClick = (bookId) => {
    setComplete(true);
    setSelectedBookId(bookId);
  };
  const handleCompleteChange = (newCompleteValue) => {
    setComplete(newCompleteValue);
  };

  /*style table*/
  const StyledTableCell = styled(TableCell)(() => ({
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

  const StyledTableRow = styled(TableRow)(() => ({
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  /*style status*/
  const statusTheme = createTheme({
    palette: {
      status: {
        "Checked Out": {
          main: "#F0F1F8",
          contrastText: "#6E7288",
        },
        Ongoing: {
          main: "#E5FFFA",
          contrastText: "#006753",
        },
        Incoming: {
          main: "#E4ECFF",
          contrastText: "#084BAF",
        },
        Cancelled: {
          main: "#FFF9E5",
          contrastText: "#766A00",
        },
      },
    },
  });

  // console.log(rows);

  return (
    <div className="bg-gray-100 h-screen">
      {complete ? (
        <BookingDetails
          bookId={selectedBookId}
          onCompleteChange={handleCompleteChange}
        />
      ) : (
        <div>
          <NavbarAdmin>
            <p className="text-black font-bold">Customer Booking</p>
            <div className="flex gap-10">
              <SelectSortBy onSortChange={handleSortChange} />
              <SearchAdmin
                value={selectedByText}
                onChange={handleInputChange}
              />
            </div>
          </NavbarAdmin>

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
                        onClick={() => handleRowClick(row.book_id)}
                        className="hover:bg-gray-200 hover:cursor-pointer"
                      >
                        <StyledTableCell className="w-[17%]">
                          {row.customerName}
                        </StyledTableCell>
                        <StyledTableCell className="w-[8%]">
                          {row.guest}
                        </StyledTableCell>
                        <StyledTableCell className="w-[17%]">
                          {row.roomType}
                        </StyledTableCell>
                        <StyledTableCell className="w-[8%]">
                          {row.amount}
                        </StyledTableCell>
                        <StyledTableCell className="w-[12.5%]">
                          {row.bedType}
                        </StyledTableCell>
                        <StyledTableCell className="w-[12.5%]">
                          {useFormattedDate(row.checkIn)}
                        </StyledTableCell>
                        <StyledTableCell className="w-[12.5%]">
                          {useFormattedDate(row.checkOut)}
                        </StyledTableCell>
                        <StyledTableCell className="w-[12.5%]">
                          <span
                            className="Input-status"
                            style={{
                              color:
                                statusTheme.palette.status[row.status]
                                  .contrastText,
                              backgroundColor:
                                statusTheme.palette.status[row.status].main,
                            }}
                          >
                            {row.status}
                          </span>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 55.8 * emptyRows }}>
                        <TableCell colSpan={8} />
                      </TableRow>
                    )}
                  </TableBody>

                  <TableFooter>
                    <PaginationAdmin rows={rows} />
                  </TableFooter>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </div>
      )}
    </div>
  );
}
