import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

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

const rows = [
  createData(
    "Kate Cho",
    2,
    "Superior Garden View",
    1,
    "Single Bed",
    "Th, 19 Oct 2022",
    "Th, 19 Oct 2022"
  ),
];

function CustomerBooking() {
  return (
    <div className="bg-gray-100 w-screen py-16 px-12">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
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
    </div>
  );
}

export default CustomerBooking;
