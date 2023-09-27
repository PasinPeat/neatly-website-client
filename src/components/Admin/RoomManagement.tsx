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
import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import DropdownSearch from "./DropdownSearch";

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

interface BookingType {
  room_avaliable_id: number;
  room_details: {
    room_type: string;
    bed_types: string;
  };
  room_status: string;
}

export default function CustomPaginationActionsTable() {
  const [booking, setBooking] = useState<BookingType[]>([]);
  const [filterBookingList, setFilterBookingList] = useState<BookingType[]>([]);
  const [selectedByText, setSelectedByText] = useState<string>("");

  const getBooking = async () => {
    try {
      const results = await axios(
        `http://localhost:4000/avaliable/admin/admin`
      );

      setBooking(results.data);
      setFilterBookingList(results.data);
      console.log(results.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  const pattern = new RegExp(selectedByText, "i");
  const filterAllBookingList = (filteredData: BookingType[]) => {
    return filteredData.filter((book) => {
      return (
        pattern.test(String(book.room_avaliable_id)) ||
        pattern.test(book.room_details.room_type) ||
        pattern.test(book.room_status)
      );
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedByText(event.target.value);
  };

  useEffect(() => {
    getBooking();
  }, []);

  useEffect(() => {
    if (selectedByText) {
      const combinedData = filterAllBookingList(booking);

      const timer = setTimeout(() => {
        setFilterBookingList(combinedData);
      }, 400);

      return () => clearTimeout(timer);
    }
    if (!selectedByText) {
      setFilterBookingList(booking);
    }
  }, [selectedByText]);

  let isCancelled;

  const rows = filterBookingList.map((book) => {
    isCancelled = book.status === "cancel";

    return createData(
      book.room_avaliable_id,
      book.room_details.room_type,
      book.room_details.bed_types,
      book.room_status
      // isCancelled
    );
  });

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

  const StyledTableCell = styled(TableCell)(() => ({
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

  const StyledTableRow = styled(TableRow)(() => ({
    backgroundColor: "#000000",
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(
    roomNumber: number,
    roomType: string,
    bedType: string,
    roomStatus: string
  ) {
    return { roomNumber, roomType, bedType, roomStatus };
  }
  const roomNumberArr = rows.map((row) => row.roomNumber);
  roomNumberArr.sort((a, b) => a - b);
  // console.log(roomNumberArr);

  return (
    <>
      <div className="bg-gray-100 h-screen">
        {/* navbar field*/}
        <div className="bg-white h-20 min-w-[1295px] w-full flex flex-row items-center drop-shadow-md">
          <div className="flex flex-row w-full justify-between items-center pl-16 pr-7">
            <p className="text-black font-bold">Room Management</p>
            <div>
              <FormControl>
                <OutlinedInput
                  value={selectedByText}
                  placeholder="Search…"
                  onChange={handleInputChange}
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
        </div>

        {/* table field*/}
        <div className="px-24 py-12">
          <Paper
            sx={{
              overflow: "hidden",
            }}
          >
            <TableContainer component={Paper}>
              <Table aria-label="custom pagination table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell className="w-[20%]">
                      Room no.
                    </StyledTableCell>
                    <StyledTableCell className="w-[20%]">
                      Room type
                    </StyledTableCell>
                    <StyledTableCell className="w-[35%]">
                      Bed type
                    </StyledTableCell>
                    <StyledTableCell className="w-[35%]">
                      Status
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(rowsPerPage > 0
                    ? roomNumberArr.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : roomNumberArr
                  ).map((roomNumber, index) => {
                    const row = rows.find(
                      (row) => row.roomNumber === roomNumber
                    );

                    return row ? (
                      <StyledTableRow key={index}>
                        <StyledTableCell>
                          {roomNumber > 9
                            ? `0${roomNumber}`
                            : `00${roomNumber}`}
                        </StyledTableCell>
                        <StyledTableCell>{row.roomType}</StyledTableCell>
                        <StyledTableCell>{row.bedType}</StyledTableCell>
                        <StyledTableCell>
                          <DropdownSearch
                            roomNumber={roomNumber}
                            roomStatus={row.roomStatus}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ) : null;
                  })}
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
    </>
  );
}
