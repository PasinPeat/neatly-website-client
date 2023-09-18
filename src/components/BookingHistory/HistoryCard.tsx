import React from "react";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useAuth } from "../../contexts/authen.jsx";

function HistoryCard({
  bookId,
  bookDate,
  checkIn,
  checkOut,
  roomId,
  userId,
  totalPrice,
  standard,
  special,
  additional,
  onRoomDetail,
  roomType,
  roomImages,
  price,
  person,
}: any) {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const auth = useAuth();

  // date formatt
  const checkInDate = new Date(`${checkIn}`);
  const checkOutDate = new Date(`${checkOut}`);
  const checkBookDate = new Date(`${bookDate}`);
  const options = {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formattedCheckIn = checkInDate.toLocaleDateString("en-US", options);
  const formattedCheckOut = checkOutDate.toLocaleDateString("en-US", options);
  const formattedBookDate = checkBookDate.toLocaleDateString("en-US", options);

  const backgroundImage = {
    backgroundImage: `url('${roomImages[2]}')`,
  };

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className="flex flex-col items-center w-full bg-bg text-gray-700">
        <div className=" flex flex-col py-10 border-b-[1px] border-gray-300">
          <div className="w-[1120px] flex justify-between">
            <div>
              <div
                style={backgroundImage}
                className="w-[357px] h-[210px] rounded bg-cover bg-center"
              ></div>
            </div>
            <div className="flex flex-col py-6 justify-between">
              <div className="w-[715px]">
                <div className="flex flex-row justify-between items-center mb-5">
                  <h2 className="text-headline4 text-black">{roomType}</h2>
                  <p className="text-body1">
                    Booking date: <span>{formattedBookDate}</span>
                  </p>
                </div>
                <div className=" flex gap-10">
                  <div className="flex flex-col gap-1 ">
                    <p className=" font-bold text-grey-800">Check-in</p>
                    <div>
                      <span>{formattedCheckIn}</span>
                      <span> |</span>
                      <span> After 2:00 PM</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-grey-800">Check-in</p>
                    <div>
                      <span>{formattedCheckOut}</span>
                      <span> |</span>
                      <span> After 2:00 PM</span>
                    </div>
                  </div>
                </div>
                <div className=" pt-5 ">
                  <List
                    sx={{ width: "100%", bgcolor: "#F1F2F6" }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                  >
                    <ListItemButton onClick={handleClick} sx={{ px: 4 }}>
                      <p className="font-bold text-grey-800">Booking Detail</p>
                      <ListItemText primary="" />
                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                      in={open}
                      timeout="auto"
                      unmountOnExit
                      className=" px-3"
                    >
                      <List
                        component="div"
                        disablePadding
                        sx={{ px: 2, py: 1 }}
                      >
                        <div className="flex justify-between w-full py-4">
                          <p className="text-body1">
                            {person}
                            <span> Guest</span>{" "}
                            <span>
                              {/* fix: fix to fetch *nights* from detabase */}(
                              <span>1</span> Night)
                            </span>
                          </p>
                          <div className="flex">
                            <p className="text-body1">Payment usccess via</p>
                            <span className=" font-bold pl-1">
                              Credit Card - *
                              <span>{auth.state.userData.credit_card_id}</span>
                            </span>
                          </div>
                        </div>
                      </List>
                      <List
                        component="div"
                        disablePadding
                        sx={{ px: 2, py: 1 }}
                      >
                        <div className="flex justify-between w-full">
                          <p className="text-body1">{roomType}</p>
                          <p className="text-body1 font-bold text-black">
                            {price}
                          </p>
                        </div>
                      </List>
                      <List component="div" disablePadding sx={{ px: 2 }}>
                        {special &&
                          special.map((item: string, index: number) => (
                            <div
                              className="flex justify-between w-full py-2"
                              key={index}
                            >
                              <p className="text-body1">{item}</p>
                              <p className="text-body1 font-bold text-black">
                                {/* fix: fix to fetch *price* from detabase */}
                                200.00
                              </p>
                            </div>
                          ))}
                      </List>

                      <List component="div" disablePadding sx={{ px: 2 }}>
                        {standard &&
                          standard.map((item: string, index: number) => (
                            <div
                              className="flex justify-between w-full py-2"
                              key={index}
                            >
                              <p className="text-body1">{item}</p>
                              <p className="text-body1 font-bold text-black">
                                {/* fix: fix to fetch *price* from detabase */}
                                00.00
                              </p>
                            </div>
                          ))}
                      </List>

                      <List
                        component="div"
                        disablePadding
                        sx={{ px: 2, py: 1 }}
                      >
                        <div className="flex justify-between w-full border-t-[2px] border-green-300 py-4">
                          <p className="text-body1 ">Total</p>
                          <p className=" text-headline5 font-bold text-black">
                            {parseFloat(totalPrice).toLocaleString("en-US", {
                              style: "currency",
                              currency: "THB",
                            })}
                          </p>
                        </div>
                      </List>
                      <List
                        component="div"
                        disablePadding
                        sx={{ px: 2, py: 1, bgcolor: "#E4E6ED" }}
                      >
                        <div className="flex flex-col justify-between w-full py-4">
                          <p className="text-body1 font-bold">
                            Additional Request
                          </p>
                          <p className=" text-body1 pt-2">
                            {additional ? additional : "No additional Request"}
                          </p>
                        </div>
                      </List>
                    </Collapse>
                  </List>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between -ml-4">
            <button className="btn capitalize bg-bg border-none font-semibold text-body1 text-orange-500 hover:bg-bg">
              {/* fix: cancel Bookin Path */}
              {/* onClick={() => navigate("/ChangeDate")} */}
              Cancel Booking
            </button>
            <div className="flex">
              <button
                onClick={() => onRoomDetail(roomId)}
                className="btn capitalize bg-bg border-none font-semibold text-body1 text-base  text-orange-500 hover:bg-bg"
              >
                Room Detail
              </button>
              <div>
                <button
                  className="btn Button"
                  onClick={() => navigate("/ChangeDate")}
                >
                  Change Date
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryCard;
