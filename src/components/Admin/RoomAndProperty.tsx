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
  image: string,
  type: string,
  price: number,
  promotion: number,
  guest: number,
  bedType: string,
  roomArea: number
) {
  return { image, type, price, promotion, guest, bedType, roomArea };
}

function RoomAndProperty() {
  const [createCheck, setCreateCheck] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [inputEnabled, setInputEnabled] = useState(false);

  const getRooms = async () => {
    try {
      const results = await axios(`http://localhost:4000/room/`);

      setRooms(results.data.data);
      console.log(results.data.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  const rows = rooms.map((room) => {
    return createData(
      room.room_images[0],
      room.room_type,
      room.price,
      room.promotion_price,
      room.person,
      room.bed_types,
      room.area
    );
  });
  const handleCheckboxChange = () => {
    setInputEnabled(!inputEnabled);
  };

  const createCheckFalse = (
    <>
      <div className="bg-white h-20 flex flex-row justify-between items-center drop-shadow-md px-16">
        <p className=" text-black font-bold">Room & Property</p>
        <div>
          <FormControl>
            <OutlinedInput
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
          <button
            onClick={() => {
              setCreateCheck(true);
            }}
            className="font-inter text-body2 text-white bg-orange-600 h-[40px] justify-between items-center drop-shadow-md ml-3 rounded-md px-4 "
          >
            + Created Room
          </button>
        </div>
      </div>
      {/* table field*/}
      <div className="bg-gray-100 px-16 py-12">
        <Paper sx={{ overflow: "hidden" }}>
          <TableContainer component={Paper}>
            <Table sx={{ maxHeight: 1000 }} aria-label="customized table ">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Image</StyledTableCell>
                  <StyledTableCell>Room type</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Promotion Price</StyledTableCell>
                  <StyledTableCell>Guest(s)</StyledTableCell>
                  <StyledTableCell>Bed Type</StyledTableCell>
                  <StyledTableCell>Room Size</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow>
                    <StyledTableCell component="th" scope="row">
                      <img
                        src={row.image}
                        className="w-[120px] h-[72px] rounded-md"
                      ></img>
                    </StyledTableCell>
                    <StyledTableCell>{row.type}</StyledTableCell>
                    <StyledTableCell>
                      {" "}
                      {parseFloat(row.price).toLocaleString("en-US", {
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </StyledTableCell>
                    <StyledTableCell>
                      {parseFloat(row.promotion).toLocaleString("en-US", {
                        style: "decimal",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </StyledTableCell>
                    <StyledTableCell>{row.guest}</StyledTableCell>
                    <StyledTableCell>{row.bedType}</StyledTableCell>
                    <StyledTableCell>{row.roomArea} sqm</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </>
  );

  const createCheckTrue = (
    <>
      <div className="bg-white h-20 flex flex-row justify-between items-center drop-shadow-md px-16">
        <p className=" text-black font-bold">Create New Room</p>
        <div>
          <button
            onClick={() => {
              setCreateCheck(false);
            }}
            className="font-inter text-body2 text-orange-500 bg-white h-[40px] border border-orange-500 justify-between items-center drop-shadow-md ml-3 rounded-[5px] px-6 "
          >
            Cancel
          </button>
          <button
            // onClick={() => {
            //   createRoom();
            // }}
            className="font-inter text-body2 text-white bg-orange-600 h-[40px] justify-between items-center drop-shadow-md ml-3 rounded-[5px] px-6 "
          >
            Create
          </button>
        </div>
      </div>
      {/* table field*/}
      <div className="bg-gray-100 px-16 py-12">
        {" "}
        <Paper sx={{ overflow: "hidden" }}>
          <div className=" flex flex-col justify-center items-start p-20 ">
            <p className="text-gray-600 text-headline5 pb-10">
              Basic Information
            </p>
            <form
              className="w-full"
              // onSubmit={(event) => {
              //   handleSubmit(event);
              // }}
            >
              <div className="relative pb-5">
                <label htmlFor="fname">
                  <p className="font-body1 text-start">Room Type *</p>
                </label>
                <input
                  type="text"
                  id="type"
                  // value={roomType}
                  name="type"
                  placeholder=""
                  className={`text-gray-900 w-full Input focus:outline-none focus:border-orange-500 "focus:outline-none"
                  }`}
                />
              </div>
              <div className="grid grid-cols-2 gap-10 w-[100%] pb-5">
                <div className="relative">
                  <label htmlFor="roomSize">
                    <p className="font-body1 text-gray-900 text-start">
                      Room size (sqm) *
                    </p>
                  </label>
                  <input
                    type="text"
                    id="roomSize"
                    name="roomSize"
                    // value={roomSize}
                    maxLength={2}
                    placeholder=""
                    className={`text-gray-900 w-[100%] Input focus:outline-none focus:border-orange-500 focus:outline-none"
                }`}
                    required
                  />
                </div>

                <div className="relative">
                  <label htmlFor="bedType">
                    <p className="font-body1 text-gray-900 text-start">
                      Bed type *
                    </p>
                  </label>
                  <select
                    name="bedType"
                    id="bedType"
                    // value={bedType}
                    // onChange={(e) => {
                    //   setBedType(e.target.value);
                    // }}
                    className={`text-gray-900 w-[100%] Input focus:outline-none focus:border-orange-500 focus:outline-none"
                }`}
                  >
                    <option>2 Single bed</option>
                    <option>1 Double bed</option>
                    <option>2 Double bed</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-10 w-[100%] pb-5">
                <div className="relative">
                  <label htmlFor="guest">
                    <p className="font-body1 text-gray-900 text-start mb-[4px]">
                      Guest(s) *
                    </p>
                  </label>
                  <select
                    name="guest"
                    id="guest"
                    // value={guest}
                    // onChange={(e) => {
                    //   setGuest(e.target.value);
                    // }}
                    className={` text-gray-900 w-[100%] Input focus:outline-none focus:border-orange-500 focus:outline-none "
                }`}
                  >
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-10 w-[100%] pb-5">
                <div className="relative">
                  <label htmlFor="price">
                    <p className="font-body1 text-gray-900 text-start">
                      Price per Night(THB)*
                    </p>
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    // value={price}
                    placeholder=""
                    className={`text-gray-900 w-[100%] Input focus:outline-none focus:border-orange-500 focus:outline-none"
                }`}
                    required
                  />
                </div>

                <div className="grid grid-cols-[5%,20%,75%]  items-center mt-6">
                  <input
                    type="checkbox"
                    id="enableInput"
                    name="enableInput"
                    className="bg-white appearance-none border rounded-[5px] h-5 w-5 checked:bg-orange-500  border-gray-600 focus:outline-none"
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="bedType">
                    <p className="font-body1 text-gray-900 ">Promotion Price</p>
                  </label>
                  <input
                    type="text"
                    id="bedType"
                    name="bedType"
                    placeholder=""
                    className={`text-gray-900 Input focus:outline-none focus:border-orange-500 focus:outline-none ${
                      inputEnabled ? "" : "bg-gray-300 pointer-events-none"
                    }`}
                    disabled={!inputEnabled}
                  />
                </div>
              </div>
              <div className="border-b-[1px] border-gray-500 w-[100%] my-10"></div>
              <p className="text-gray-600 text-headline5 pb-10">Room Image</p>
              <div className="border-b-[1px] border-gray-500 w-[100%] my-10"></div>
              <p className="text-gray-600 text-headline5 pb-10">Room Amenity</p>
              <div className="border-b-[1px] border-gray-500 w-[100%]"></div>
            </form>
          </div>
        </Paper>
      </div>
    </>
  );

  return (
    <div>{createCheck === false ? createCheckFalse : createCheckTrue}</div>
  );
}

export default RoomAndProperty;
