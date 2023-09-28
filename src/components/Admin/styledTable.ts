import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

/*style table*/
export const StyledTableCell = styled(TableCell)(() => ({
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
    padding: "18px 16px",
    color: "black",
  },
}));

export const StyledTableRow = styled(TableRow)(() => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const styledTable = {
  StyledTableCell,
  StyledTableRow,
};

export default styledTable;
