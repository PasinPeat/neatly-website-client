import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authen.jsx";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

function HistoryCard() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div className="flex flex-col justify-between items-center  w-full gap-14  bg-bg border-b-[1px] border-gray-300 text-gray-700">
        <div className=" flex flex-col gap-12 py-10 ">
          <div className="w-[1120px] flex justify-between">
            <div className="">
              <div className="w-[357px] h-[210px] rounded bg-cover bg-center">
                <img src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/room_images/04%20Supreme/K-Studio_Lambs_Lions_CasaCookChania_022_GeorgRoske.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9yb29tX2ltYWdlcy8wNCBTdXByZW1lL0stU3R1ZGlvX0xhbWJzX0xpb25zX0Nhc2FDb29rQ2hhbmlhXzAyMl9HZW9yZ1Jvc2tlLmpwZyIsImlhdCI6MTY5NDUwODA0NSwiZXhwIjoxNzI2MDQ0MDQ1fQ.GPUAPR5qHYjoK9TqISz_AlCFcWJR0gvKKpu4gFkRw9k&t=2023-09-12T08%3A40%3A44.773Z" />
              </div>
            </div>
            <div className="flex flex-col py-6 justify-between">
              <div className="w-[715px]">
                <div className="flex flex-row justify-between items-center mb-5">
                  <h2 className="text-headline4 text-black">
                    Superior Garden View
                  </h2>
                  <p className="text-body1">Booking date: Tue, 16 Oct 2022</p>
                </div>
                <div className=" flex gap-10">
                  <div className="flex flex-col gap-1 ">
                    <p className=" font-bold text-grey-800">Check-in</p>
                    <div>
                      <span>Th, 19 Oct 2022 </span>
                      <span>|</span>
                      <span> After 2:00 PM</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="font-bold text-grey-800">Check-in</p>
                    <div>
                      <span>Th, 19 Oct 2022 </span>
                      <span>|</span>
                      <span> After 2:00 PM</span>
                    </div>
                  </div>
                </div>
                <div className=" pt-5 ">
                  <List
                    sx={{ width: "100%", bgcolor: "#F1F2F6" }}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    // subheader={
                    //   <ListSubheader
                    //     component="div"
                    //     id="nested-list-subheader"
                    //     className=" text-headline3"
                    //   >
                    //     Booking Detail
                    //   </ListSubheader>
                    // }
                  >
                    <ListItemButton onClick={handleClick} sx={{ px: 4 }}>
                      <p className="font-bold text-grey-800">Booking Detail</p>
                      {/* <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon> */}
                      <ListItemText primary="" />

                      {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse
                      in={open}
                      timeout="auto"
                      unmountOnExit
                      className=" px-3"
                    >
                      <List component="div" disablePadding sx={{ px: 2, py: 1 }}>
                        
                          <div className="flex justify-between w-full py-4">
                            <p className="text-body1">2 Guest (1 Night)</p>
                            <div className="flex">
                              <p className="text-body1">Payment usccess via</p>
                              <span className=" font-bold pl-1">
                                Credit Card-*888
                              </span>
                            </div>
                          </div>
                          {/* <ListItemText primary="Pay" />   */}
                        
                      </List>
                      <List component="div" disablePadding sx={{ px: 2, py: 1 }}>
                        
                          <div className="flex justify-between w-full">
                            <p className="text-body1">
                              Superior Garden View Room
                            </p>

                            <p className="text-body1 font-bold text-black">
                              2,500.00
                            </p>
                          </div>
                          {/* <ListItemText primary="Pay" />   */}
                        
                      </List>
                      <List
                        component="div"
                        disablePadding
                        sx={{ px: 2, py: 1 }}
                      >
                        <div className="flex justify-between w-full">
                          <p className="text-body1">Airport tranfer</p>

                          <p className="text-body1 font-bold text-black">
                            200.00
                          </p>
                        </div>
                        {/* <ListItemText primary="Pay" />   */}
                      </List>
                      <List
                        component="div"
                        disablePadding
                        sx={{ px: 2, py: 1 }}
                      >
                        <div className="flex justify-between w-full">
                          <p className="text-body1">Promotion Code</p>

                          <p className="text-body1 font-bold text-black">
                            -400.00
                          </p>
                        </div>
                        {/* <ListItemText primary="Pay" />   */}
                      </List>
                      <List component="div" disablePadding sx={{ px: 2, py: 1 }}>
                        
                          <div className="flex justify-between w-full border-t-[2px] border-green-300 py-4">
                            <p className="text-body1 ">Total</p>

                            <p className=" text-headline5 font-bold text-black">
                              THB 2,300.00
                            </p>
                            {/* {price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "THB",
                  })} */}
                          </div>
                          {/* <ListItemText primary="Pay" />   */}
                        
                        </List>
                        <List component="div" disablePadding sx={{ px: 2, py: 1 , bgcolor: "#E4E6ED"}}>
                        
                          <div className="flex flex-col justify-between w-full py-4">
                            <p className="text-body1 font-bold">Additional Request</p>

                            <p className=" text-body1 pt-2">
                              THB 2,300.00
                            </p>
                            {/* {price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "THB",
                  })} */}
                          </div>
                          {/* <ListItemText primary="Pay" />   */}
                        
                      </List>
                    </Collapse>
                  </List>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between -ml-4">
            <button
              // onClick={() => onRoomDetail(roomId)}
              className="btn capitalize bg-bg border-none font-semibold text-body1 text-orange-500 hover:bg-bg"
            >
              Cancel Booking
            </button>
            <div className="flex">
              <button
                // onClick={() => onRoomDetail(roomId)}
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
    </div>
  );
}

export default HistoryCard;
