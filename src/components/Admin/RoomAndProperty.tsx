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
import { Link } from "react-router-dom";

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
  roomArea: number,
  roomId: number,
  amenity: Array
) {
  return {
    image,
    type,
    price,
    promotion,
    guest,
    bedType,
    roomArea,
    roomId,
    amenity,
  };
}

function RoomAndProperty() {
  const [rooms, setRooms] = useState([]);
  const [inputEnabled, setInputEnabled] = useState(false);
  const [showPage, setShowPage] = useState(null);
  const [singleRoom, setSingleRoom] = useState({});

  const [files, setFiles] = useState([]);
  const [fileDragging, setFileDragging] = useState(null);
  const [fileDropping, setFileDropping] = useState(null);

  let createType;
  let createPrice;
  let createPromo;
  let createPerson;
  let createBedType;
  let createArea;
  let createDescription;

  const [createRoomType, setCreateRoomType] = useState(createType);
  const [createRoomPrice, setCreateRoomPrice] = useState(createPrice);
  const [createRoomPromo, setCreateRoomPromo] = useState(createPromo);
  const [createRoomPerson, setCreateRoomPerson] = useState(createPerson);
  const [createRoomBedType, setCreateRoomBedType] = useState(createBedType);
  const [createRoomArea, setCreateRoomArea] = useState(createArea);
  const [createRoomDescription, setCreateRoomDescription] =
    useState(createDescription);

  const getRooms = async () => {
    try {
      const results = await axios(`http://localhost:4000/room/`);
      setRooms(results.data.data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    setShowPage(InitialData);
  }, [rooms]);

  const rows = rooms.map((room) => {
    return createData(
      room.room_images[0],
      room.room_type,
      room.price,
      room.promotion_price,
      room.person,
      room.bed_types,
      room.area,
      room.room_id
    );
  });

  const handleCheckboxChange = () => {
    setInputEnabled(!inputEnabled);
  };

  const fetchUpdateHandler = async (number) => {
    try {
      const results = await axios.get(`http://localhost:4000/room/${number}`);
      setSingleRoom(results.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRoomHandler = async (id) => {
    try {
      await axios.put(`http://localhost:4000/room/${id}`, singleRoom);
      setShowPage(InitialData);
    } catch (error) {
      console.log(error);
    }
  };

  const createRoomHandler = async () => {
    const formData = new FormData();
    formData.append("room_type", createRoomType);
    formData.append("price", createRoomPrice);
    formData.append("promotion_price", createRoomPromo);
    formData.append("person", createRoomPerson);
    formData.append("bed_types", createRoomBedType);
    formData.append("area", createRoomArea);
    formData.append("description", createRoomDescription);

    for (const file of files) {
      formData.append("room_images", file);
    }

    try {
      await axios.post(`http://localhost:4000/room/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowPage(InitialData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setShowPage(updateRoom);
  }, [singleRoom]);

  useEffect(() => {
    setShowPage(createRoom);
  }, [files, fileDragging, fileDropping]);

  console.log(singleRoom.amenity);

  const remove = (index: any) => {
    let updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  console.log(singleRoom);

  // const remove = (index: any) => {
  //   let updatedFiles = [...files];
  //   //@ts-ignore
  //   delete updatedFiles[index];
  //   setFiles(updatedFiles);
  // };

  const drop = (e: any) => {
    let removed;
    let updatedFiles = [...files];

    if (fileDragging !== null && fileDropping !== null) {
      removed = updatedFiles.splice(fileDragging, 1);
      updatedFiles.splice(fileDropping, 0, ...removed);
      setFiles(updatedFiles);
    }

    setFileDropping(null);
    setFileDragging(null);
  };

  const dragenter = (e: any) => {
    let targetElem = e.target.closest("[draggable]");
    setFileDropping(targetElem.getAttribute("data-index"));
  };

  const dragstart = (e: any) => {
    setFileDragging(e.target.closest("[draggable]").getAttribute("data-index"));
    e.dataTransfer.effectAllowed = "move";
  };

  const loadFile = (file: any) => {
    return URL.createObjectURL(file);
  };

  const addFiles = (e: any) => {
    const newFiles = Array.from(e.target.files);
    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
  };

  const isImage = (file: any) => {
    return file.type.startsWith("image/");
  };

  const InitialData = (
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
              setShowPage(createRoom);
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
                  <StyledTableRow
                    className="cursor-pointer"
                    onClick={() => {
                      fetchUpdateHandler(row.roomId);
                    }}
                  >
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

  const createRoom = (
    <>
      <div className="bg-white h-20 flex flex-row justify-between items-center drop-shadow-md px-16">
        <p className=" text-black font-bold">Create New Room</p>
        <div>
          <button
            onClick={() => {
              setShowPage(InitialData);
            }}
            className="font-inter text-body2 text-orange-500 bg-white h-[40px] border border-orange-500 justify-between items-center drop-shadow-md ml-3 rounded-[5px] px-6 "
          >
            Cancel
          </button>
          <button
            onClick={() => {
              createRoomHandler();
            }}
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
            <form className="w-full">
              <div className="relative pb-5">
                <label htmlFor="fname">
                  <p className="font-body1 text-start">Room Type *</p>
                </label>
                <input
                  type="text"
                  id="type"
                  value={createRoomType}
                  onChange={(e) => {
                    setCreateRoomType(e.target.value);
                  }}
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
                    value={createRoomArea}
                    onChange={(e) => {
                      setCreateRoomArea(e.target.value);
                    }}
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
                    value={createRoomBedType}
                    onChange={(e) => {
                      setCreateRoomBedType(e.target.value);
                    }}
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
                    value={createRoomPerson}
                    onChange={(e) => {
                      setCreateRoomPerson(e.target.value);
                    }}
                    className={` text-gray-900 w-[100%] Input focus:outline-none focus:border-orange-500"
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
                    value={createRoomPrice}
                    onChange={(e) => {
                      setCreateRoomPrice(e.target.value);
                    }}
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
                    type="number"
                    id="promotion"
                    name="promotion"
                    value={createRoomPromo}
                    onChange={(e) => {
                      setCreateRoomPromo(e.target.value);
                    }}
                    className={`text-gray-900 Input focus:outline-none focus:border-orange-500${
                      inputEnabled ? "" : "bg-gray-300 pointer-events-none"
                    }`}
                    disabled={!inputEnabled}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="additionRequest"
                  className="text-gray-900 text-body1"
                >
                  Room Description *
                </label>
                <textarea
                  name="additionRequest"
                  id="additionRequest"
                  value={createRoomDescription}
                  onChange={(e) => {
                    setCreateRoomDescription(e.target.value);
                  }}
                  className="h-26 w-full pt-3 px-3 pb-10  rounded bg-white border-2 border-gray-400 resize-none hover:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 "
                ></textarea>
              </div>
              <div className="border-b-[1px] border-gray-500 w-[100%] my-10"></div>
              <p className="text-gray-600 text-headline5 pb-10">Room Image</p>

              <div className="bg-white p-7 rounded w-[90%] mx-auto">
                <div className="relative flex flex-col p-4 text-gray-600 border border-gray-400 rounded hover:border-orange-500 focus:border-orange-500">
                  <div className="relative flex flex-col text-gray-600 border border-gray-400 border-dashed rounded cursor-pointer hover:border-orange-500 focus:border-orange-500">
                    <input
                      accept="image/*"
                      type="file"
                      multiple
                      className="absolute inset-0 z-50 w-full h-full p-0 m-0 outline-none opacity-0 cursor-pointer"
                      onChange={addFiles}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.add("border-blue-400");
                        e.currentTarget.classList.add("ring-4");
                        e.currentTarget.classList.add("ring-inset");
                      }}
                      onDragLeave={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove("border-blue-400");
                        e.currentTarget.classList.remove("ring-4");
                        e.currentTarget.classList.remove("ring-inset");
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        e.currentTarget.classList.remove("border-blue-400");
                        e.currentTarget.classList.remove("ring-4");
                        e.currentTarget.classList.remove("ring-inset");
                      }}
                      title=""
                    />

                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <svg
                        className="w-6 h-6 mr-1 text-current-50"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <p className="m-0">Upload Photo</p>
                    </div>
                  </div>

                  {files.length > 0 && (
                    <div
                      className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-6"
                      onDrop={drop}
                      onDragOver={(e) => {
                        e.preventDefault();
                        e.dataTransfer.dropEffect = "move";
                      }}
                    >
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className={`relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded cursor-move select-none ${
                            fileDragging === index ? "border-blue-600" : ""
                          }`}
                          style={{ paddingTop: "100%" }}
                          draggable={true}
                          data-index={index}
                          onDragStart={dragstart}
                          onDragEnd={() => setFileDragging(null)}
                        >
                          <button
                            className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-none"
                            type="button"
                            onClick={() => remove(index)}
                          >
                            <svg
                              className="w-4 h-4 text-gray-700"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                          {isImage(file) && (
                            <img
                              className="absolute inset-0 z-0 object-cover w-full h-full border-4 border-white preview"
                              src={loadFile(file)}
                            />
                          )}

                          <div
                            className={`absolute inset-0 z-40 transition-colors duration-300 ${
                              fileDropping === index && fileDragging !== index
                                ? "bg-blue-200 bg-opacity-80"
                                : ""
                            }`}
                            onDragEnter={dragenter}
                            onDragLeave={() => setFileDropping(null)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-b-[1px] border-gray-500 w-[100%] my-10"></div>
              <p className="text-gray-600 text-headline5 pb-10">Room Amenity</p>
            </form>
          </div>
        </Paper>
      </div>
    </>
  );

  const updateRoom = (
    <>
      <div className="bg-white h-20 flex flex-row justify-between items-center drop-shadow-md px-16">
        <p className=" text-black font-bold flex flex-row">
          <button
            onClick={() => {
              setShowPage(InitialData);
            }}
          >
            <img src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/arrow_back.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2Fycm93X2JhY2suc3ZnIiwiaWF0IjoxNjk1NzU4Nzg1LCJleHAiOjE3MjcyOTQ3ODV9.Uu5g_whbbwyAtMcakhH9XiYDXL1wLsgR4f2cA6McA9o&t=2023-09-26T20%3A06%3A26.084Z"></img>
          </button>
          <div className="ml-5">{singleRoom.room_type}</div>
        </p>
        <div>
          <button
            onClick={() => {
              updateRoomHandler(singleRoom.room_id);
            }}
            className="font-inter text-body2 text-white bg-orange-600 h-[40px] justify-between items-center drop-shadow-md ml-3 rounded-[5px] px-6 "
          >
            Update
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
                  onChange={(e) => {
                    setSingleRoom({ ...singleRoom, room_type: e.target.value });
                  }}
                  type="text"
                  id="type"
                  value={singleRoom.room_type}
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
                    onChange={(e) => {
                      setSingleRoom({ ...singleRoom, area: e.target.value });
                    }}
                    value={singleRoom.area}
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
                    value={singleRoom.bed_types}
                    onChange={(e) => {
                      setSingleRoom({
                        ...singleRoom,
                        bed_type: e.target.value,
                      });
                    }}
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
                    value={singleRoom.person}
                    onChange={(e) => {
                      setSingleRoom({ ...singleRoom, person: e.target.value });
                    }}
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
                      Price per Night(THB) *
                    </p>
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    onChange={(e) => {
                      setSingleRoom({ ...singleRoom, price: e.target.value });
                    }}
                    value={singleRoom.price}
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
                    checked={inputEnabled}
                  />
                  <label htmlFor="bedType">
                    <p className="font-body1 text-gray-900 ">Promotion Price</p>
                  </label>
                  <input
                    type="text"
                    id="bedType"
                    value={singleRoom.promotion_price}
                    onChange={(e) => {
                      setSingleRoom({
                        ...singleRoom,
                        promotion_price: e.target.value,
                      });
                    }}
                    name="bedType"
                    placeholder=""
                    className={`text-gray-900 Input focus:outline-none focus:border-orange-500 focus:outline-none ${
                      inputEnabled ? "bg-gray-300 pointer-events-none" : ""
                    }`}
                    disabled={!inputEnabled}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="additionRequest"
                  className="text-gray-900 text-body1"
                >
                  Room Description *
                </label>
                <textarea
                  name="additionRequest"
                  id="additionRequest"
                  value={singleRoom.description}
                  // onChange={}
                  className="h-26 w-full pt-3 px-3 pb-10  rounded bg-white border-2 border-gray-400 resize-none hover:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 "
                ></textarea>
              </div>
              <div className="border-b-[1px] border-gray-500 w-[100%] my-10"></div>
              <p className="text-gray-600 text-headline5 pb-10">Room Image</p>
              <div className="border-b-[1px] border-gray-500 w-[100%] my-10"></div>
              <p className="text-gray-600 text-headline5 pb-10">Room Amenity</p>
              <div className="w-full">
                {Array.isArray(singleRoom.amenity) &&
                  singleRoom.amenity.map((item, index) => (
                    <div
                      className="flex flex-row justify-evenly items-center w-full"
                      key={index}
                    >
                      <div className="w-full">
                        <label className="text-gray-900 text-body1 mb-2">
                          Amenity *
                        </label>
                        <input
                          type="text"
                          className={`w-full text-gray-900 Input focus:outline-none focus:border-orange-500 focus:outline-none rounded-md mb-6`}
                          value={item}
                          // onChange={(e) => {
                          //   const updatedItems = [...singleRoom.amenity];
                          //   updatedItems[index].name = e.target.value;
                          //   setSingleRoom({ ...singleRoom, amenity: updatedItems });
                          // }}
                        />
                      </div>

                      <button
                        className="font-prompt text-gray-600 text-fontHead5 ml-5"
                        // onClick={() => removeItem(index)}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                <button
                  className="font-inter text-body2 text-orange-500 bg-white h-[40px] border border-orange-500 justify-between items-center  rounded-[5px] px-6 mt-5 "
                  // onClick={addNewItem}
                >
                  <span className="text-blue-600 font-prompt text-fontHead5">
                    + Add Amenity
                  </span>
                </button>
              </div>
            </form>
          </div>
        </Paper>
      </div>
    </>
  );

  return (
    <>
      <div>{showPage}</div>
    </>
  );
}

export default RoomAndProperty;
