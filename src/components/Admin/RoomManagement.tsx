import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import DropdownSearch from "./DropdownSearch";
import PaginationAdmin from "./PaginationAdmin";
import PageContext from "../../contexts/PageContext";
import NavbarAdmin from "./NavbarAdmin";
import SearchAdmin from "./SearchAdmin";
import { StyledTableCell, StyledTableRow } from "./styledTable";

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
  const [currOpen, setOpen] = React.useState<number | null>(null);

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
    setPage(0);
  }, [selectedByText]);

  const rows = filterBookingList.map((book) => {
    return createData(
      book.room_avaliable_id,
      book.room_details.room_type,
      book.room_details.bed_types,
      book.room_status
    );
  });

  function createData(
    roomNumber: number,
    roomType: string,
    bedType: string,
    roomStatus: string
  ) {
    return { roomNumber, roomType, bedType, roomStatus };
  }

  /*sort by minNumber to higher*/
  const roomNumberArr = rows.map((row) => row.roomNumber);
  roomNumberArr.sort((a, b) => a - b);

  /*page context*/
  const { page, setPage, rowsPerPage } = useContext(PageContext);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* navbar field*/}
        <NavbarAdmin>
          <p className="text-black font-bold">Room Management</p>
          <div className="flex">
            <SearchAdmin value={selectedByText} onChange={handleInputChange} />
          </div>
        </NavbarAdmin>

        {/* table field*/}
        <div className="table-padding m-auto">
          <Paper
            sx={{
              overflow: "hidden",
            }}
          >
            <TableContainer component={Paper}>
              <Table aria-label="custom pagination table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell className="w-[15%]">
                      Room no.
                    </StyledTableCell>
                    <StyledTableCell className="w-[25%]">
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
                            roomNumber={row.roomNumber}
                            roomStatus={row.roomStatus}
                            currOpen={currOpen}
                            setOpen={setOpen}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    ) : null;
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 55.8 * emptyRows }}>
                      <TableCell colSpan={8} />
                    </TableRow>
                  )}
                </TableBody>
                <TableFooter>
                  <PaginationAdmin rows={rows} colSpan={3} />
                </TableFooter>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
    </>
  );
}
