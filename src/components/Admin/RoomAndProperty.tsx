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
import { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import useFormattedPrice from "../../hooks/useFormattedPrice";

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
  const [showPage, setShowPage] = useState(null);
  const [singleRoom, setSingleRoom] = useState({});
  const [roomImagesFiles, setRoomImagesFiles] = useState([]);

  // console.log(roomImagesFiles);

  const [files, setFiles] = useState([]);
  const [fileDragging, setFileDragging] = useState(null);
  const [fileDropping, setFileDropping] = useState(null);
  const [inputEnabled, setInputEnabled] = useState(false);
  const [updatefileDragging, setUpdateFileDragging] = useState(null);
  const [updatefileDropping, setUpdateFileDropping] = useState(null);
  const [checkPage, setCheckPage] = useState(null);

  // console.log(files);

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

  const fetchUpdateHandler = async (number) => {
    try {
      const results = await axios.get(`http://localhost:4000/room/${number}`);
      setSingleRoom(results.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRoomHandler = async (id) => {
    const formData = new FormData();
    formData.append("room_type", singleRoom.room_type);
    formData.append("price", singleRoom.price);
    formData.append("promotion_price", singleRoom.promotion_price);
    formData.append("person", singleRoom.person);
    formData.append("bed_types", singleRoom.bed_types);
    formData.append("area", singleRoom.area);
    formData.append("description", singleRoom.description);

    for (const file of roomImagesFiles) {
      formData.append("room_images", file);
    }

    for (const amen of singleRoom.amenity) {
      formData.append("amenity", amen);
    }

    try {
      await axios.put(`http://localhost:4000/room/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowPage(InitialData);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const createRoomHandler = async () => {
    const description = singleRoom.description;
    const bedType = singleRoom.bed_types;
    const formData = new FormData();
    formData.append("room_type", singleRoom.room_type);
    formData.append("price", singleRoom.price);
    formData.append("promotion_price", singleRoom.promotion_price);
    formData.append("person", singleRoom.person);
    formData.append("bed_types", bedType);
    formData.append("area", singleRoom.area);
    formData.append("description", description);

    for (const file of files) {
      formData.append("room_images", file);
    }

    for (const amen of singleRoom.amenity) {
      formData.append("amenity", amen);
    }

    try {
      await axios.post(`http://localhost:4000/room/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setShowPage(InitialData);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRoomHandler = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:4000/room/${id}`);
      setShowPage(InitialData);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setShowPage(updateRoom);
  }, [
    singleRoom,
    roomImagesFiles,
    updatefileDragging,
    updatefileDropping,
    inputEnabled,
  ]);

  useEffect(() => {
    setShowPage(updateRoom);
  }, [files, fileDragging, fileDropping, inputEnabled]);

  const remove = (index: any) => {
    let updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  const updateRemove = (index: any) => {
    let updatedFiles = [...roomImagesFiles];
    updatedFiles.splice(index, 1);
    setRoomImagesFiles(updatedFiles);
  };

  const drop = () => {
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

  const updateDrop = () => {
    let removed;
    let updatedFiles = [...roomImagesFiles];

    if (updatefileDragging !== null && updatefileDropping !== null) {
      removed = updatedFiles.splice(updatefileDragging, 1);
      updatedFiles.splice(updatefileDropping, 0, ...removed);
      setRoomImagesFiles(updatedFiles);
    }

    setUpdateFileDropping(null);
    setUpdateFileDragging(null);
  };

  const dragenter = (e: any) => {
    let targetElem = e.target.closest("[draggable]");
    setFileDropping(targetElem.getAttribute("data-index"));
  };

  const dragstart = (e: any) => {
    setFileDragging(e.target.closest("[draggable]").getAttribute("data-index"));
    e.dataTransfer.effectAllowed = "move";
  };

  const updateDragenter = (e: any) => {
    let targetElem = e.target.closest("[draggable]");
    setUpdateFileDropping(targetElem.getAttribute("data-index"));
  };

  const updateDragstart = (e: any) => {
    setUpdateFileDragging(
      e.target.closest("[draggable]").getAttribute("data-index")
    );
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

  const updateFiles = (e: any) => {
    const newRoomImagesFiles = Array.from(e.target.files);
    const updatedFiles = [...roomImagesFiles, ...newRoomImagesFiles];
    setRoomImagesFiles(updatedFiles);
  };

  const isImage = (file: any) => {
    return file.type.startsWith("image/");
  };

  //amenity
  const addAmenity = (e) => {
    e.preventDefault();
    const updatedAmenities = [...singleRoom.amenity, ""];
    setSingleRoom({ ...singleRoom, amenity: updatedAmenities });
  };

  const removeAmenity = (e, index) => {
    e.preventDefault();
    const updatedAmenities = [...singleRoom.amenity];
    updatedAmenities.splice(index, 1);
    setSingleRoom({ ...singleRoom, amenity: updatedAmenities });
  };

  useEffect(() => {
    // Assuming room_images contains an array of image URLs
    const roomImages = singleRoom.room_images || [];

    // Create File objects from the URLs and store them in an array
    const filesPromises = roomImages.map(async (imageUrl) => {
      try {
        const response = await fetch(imageUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const blob = await response.blob();
        const filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
        return new File([blob], filename, { type: blob.type });
      } catch (error) {
        console.error("Error loading file from URL:", error);
        return null;
      }
    });

    // Wait for all promises to resolve and filter out any null values
    Promise.all(filesPromises)
      .then((files) =>
        setRoomImagesFiles(files.filter((file) => file !== null))
      )
      .catch((error) => console.error("Error loading files from URLs:", error));
  }, [singleRoom.room_images]);

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
              setSingleRoom({
                amenity: [""],
              });

              setCheckPage("create");

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
                      setCheckPage("update");
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
                      {useFormattedPrice(row.price)}
                    </StyledTableCell>
                    <StyledTableCell>
                      {useFormattedPrice(row.promotion)}
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

  const imageUploadCreate = (
    <>
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
                  className={`relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded cursor-move select-none hover:border-orange-500 focus:border-orange-500 ${
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
    </>
  );

  const imageUploadUpdate = (
    <>
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
              onChange={updateFiles}
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

          {roomImagesFiles.length > 0 && (
            <div
              className="grid grid-cols-2 gap-4 mt-4 md:grid-cols-6"
              onDrop={updateDrop}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
              }}
            >
              {roomImagesFiles.map((file, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col items-center overflow-hidden text-center bg-gray-100 border rounded cursor-move select-none hover:border-orange-500 focus:border-orange-500 ${
                    updatefileDragging === index ? "border-blue-600" : ""
                  }`}
                  style={{ paddingTop: "100%" }}
                  draggable={true}
                  data-index={index}
                  onDragStart={updateDragstart}
                  onDragEnd={() => setUpdateFileDragging(null)}
                >
                  <button
                    className="absolute top-0 right-0 z-50 p-1 bg-white rounded-bl focus:outline-none"
                    type="button"
                    onClick={() => updateRemove(index)}
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
                      updatefileDropping === index &&
                      updatefileDropping !== index
                        ? "bg-blue-200 bg-opacity-80"
                        : ""
                    }`}
                    onDragEnter={updateDragenter}
                    onDragLeave={() => setUpdateFileDropping(null)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );

  const createButtons = (
    <>
      <div className="bg-white h-20 flex flex-row justify-between items-center px-16">
        <p className=" text-black font-bold">Create New Room</p>
      </div>
      <div>
        <button
          onClick={() => {
            setShowPage(InitialData);
            setInputEnabled(false);
          }}
          className="font-inter text-body2 text-orange-500 bg-white h-[40px] border border-orange-500 justify-between items-center ml-3 rounded-[5px] px-6 "
        >
          Cancel
        </button>
        <button
          onClick={() => {
            createRoomHandler();
          }}
          className="font-inter text-body2 text-white bg-orange-600 h-[40px] justify-between items-center  ml-3 rounded-[5px] px-6 "
        >
          Create
        </button>
      </div>
    </>
  );

  const updateButtons = (
    <>
      <p className=" text-black font-bold flex flex-row">
        <button
          onClick={() => {
            setShowPage(InitialData);
            setInputEnabled(false);
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
    </>
  );

  const onDragEnd = (result) => {
    if (!result.destination) return; // Item was dropped outside the list
    const items = Array.from(singleRoom.amenity);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSingleRoom({
      ...singleRoom,
      amenity: items,
    });
  };

  const updateRoom = (
    <>
      <div className="bg-white h-20 flex flex-row justify-between items-center drop-shadow-md px-16">
        {checkPage === "create" ? createButtons : updateButtons}
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
                        bed_types: e.target.value,
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

                <div className="grid grid-cols-[5%,20%,75%] items-center mt-6">
                  <input
                    type="checkbox"
                    id="enableInput"
                    name="enableInput"
                    className="hidden"
                    onChange={() => {
                      setInputEnabled(!inputEnabled);
                    }}
                  />
                  <label
                    htmlFor="enableInput"
                    className="flex items-center cursor-pointer"
                  >
                    <div
                      className={`h-5 w-5 rounded-[5px] border border-solid ${
                        inputEnabled ? "bg-orange-500" : "bg-white"
                      }`}
                    >
                      {inputEnabled && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="100%"
                          height="100%"
                          viewBox="0 0 24 24"
                          fill="white"
                        >
                          <path d="M0 12.116l2.053-1.897c2.401 1.162 3.924 2.045 6.622 3.969 5.073-5.757 8.426-8.678 14.657-12.555l.668 1.536c-5.139 4.484-8.902 9.479-14.321 19.198-3.343-3.936-5.574-6.446-9.679-10.251z" />
                        </svg>
                      )}
                    </div>
                  </label>
                  {inputEnabled ? (
                    <>
                      <label htmlFor="bedType">
                        <p className="font-body1 text-gray-900">
                          Promotion Price
                        </p>
                      </label>
                      <input
                        type="text"
                        id="promotion"
                        value={singleRoom.promotion_price}
                        onChange={(e) => {
                          if (inputEnabled) {
                            setSingleRoom({
                              ...singleRoom,
                              promotion_price: e.target.value,
                            });
                          }
                        }}
                        name="bedType"
                        placeholder=""
                        className={`text-gray-900 Input focus:outline-none focus:border-orange-500`}
                      />
                    </>
                  ) : (
                    <>
                      <label htmlFor="bedType">
                        <p className="font-body1 text-gray-900">
                          Promotion Price
                        </p>
                      </label>
                      <input
                        type="text"
                        id="promotion"
                        value={singleRoom.promotion_price}
                        onChange={(e) => {
                          if (inputEnabled) {
                            setSingleRoom({
                              ...singleRoom,
                              promotion_price: e.target.value,
                            });
                          }
                        }}
                        name="bedType"
                        placeholder=""
                        className={`text-gray-900 Input focus:outline-none focus:border-orange-500"bg-gray-300 bg-gray-300 ${
                          inputEnabled === true ? "" : "pointer-events-none"
                        }`}
                        disabled
                      />
                    </>
                  )}
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
                  onChange={(e) => {
                    setSingleRoom({
                      ...singleRoom,
                      description: e.target.value,
                    });
                  }}
                  className="h-26 w-full pt-3 px-3 pb-10  rounded bg-white border-2 border-gray-400 resize-none hover:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 "
                ></textarea>
              </div>

              {checkPage === "create" ? imageUploadCreate : imageUploadUpdate}
              <div className="border-b-[1px] border-gray-500 w-[100%] my-10"></div>
              <p className="text-gray-600 text-headline5 pb-10">Room Amenity</p>
              <div
                className="w-full"
                onDragOver={(e) => {
                  e.preventDefault();
                }}
              >
                <div>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="amenities">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {Array.isArray(singleRoom.amenity) &&
                            singleRoom.amenity.map((item, index) => (
                              <Draggable
                                key={index}
                                draggableId={`amenity-${index}`}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="flex flex-row justify-evenly items-center w-full"
                                  >
                                    <div>
                                      <img src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/drag.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2RyYWcucG5nIiwiaWF0IjoxNjk1ODkwMTQyLCJleHAiOjE3Mjc0MjYxNDJ9.bXiz7oxtgP-QE2dd2sm3wFXzWz1r2CWAlHsOQiRv-Ug&t=2023-09-28T08%3A35%3A43.063Z" />
                                    </div>
                                    <div className="w-full">
                                      <label className="text-gray-900 text-body1 mb-2">
                                        Amenity *
                                      </label>
                                      <input
                                        type="text"
                                        className={`w-full text-gray-900 Input focus:outline-none focus:border-orange-500 focus:outline-none rounded-md mb-6`}
                                        value={item}
                                        onChange={(e) => {
                                          const updatedItems = [
                                            ...singleRoom.amenity,
                                          ];
                                          updatedItems[index] = e.target.value;
                                          setSingleRoom({
                                            ...singleRoom,
                                            amenity: updatedItems,
                                          });
                                        }}
                                      />
                                    </div>

                                    <button
                                      className="font-prompt text-orange-500 text-fontHead5 ml-5"
                                      onClick={(e) => removeAmenity(e, index)}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>

                <button
                  className="font-inter text-body2 text-orange-500 bg-white h-[40px] border border-orange-500 justify-between items-center  rounded-[5px] px-6 mt-5 "
                  onClick={(e) => addAmenity(e)}
                >
                  <span className="text-blue-600 font-prompt text-fontHead5">
                    + Add Amenity
                  </span>
                </button>
              </div>
            </form>
          </div>
        </Paper>
        {checkPage === "update" ? (
          <>
            <div className="text-gray-700 flex justify-end mt-5">
              <button
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Delete Room
              </button>
            </div>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box bg-white rounded-sm">
                <h3 className="font-bold text-[1.2rem] text-black font-inter">
                  Delete room
                </h3>
                <hr></hr>
                <p className="py-4">
                  Are you sure you want to delete this room?
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                    <button
                      className="font-inter text-body2 text-orange-500 bg-white h-[40px] border border-orange-500 justify-between items-center ml-3 rounded-[5px] px-6"
                      onClick={(e) => deleteRoomHandler(e, singleRoom.room_id)}
                    >
                      Yes, I want to delete
                    </button>
                    <button className="font-inter text-body2 text-white bg-orange-600 h-[40px] justify-between items-center  ml-3 rounded-[5px] px-6 ">
                      No, I don't
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </>
        ) : null}
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
