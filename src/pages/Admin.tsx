import React from "react";
import CustomerBooking from "../components/Admin/CustomerBooking";
import HotelInformation from "../components/Admin/HotelInformation";
import RoomAndProperty from "../components/Admin/RoomAndProperty";
import RoomManagement from "../components/Admin/RoomManagement";
import Sidebar from "../components/Admin/Sidebar";
import SidebarItems from "../components/Admin/SidebarItems";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";

function Admin() {
  const drawerWidth: number = 240;
  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme }) => ({
    "& .MuiDrawer-paper": {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: "border-box",
    },
  }));

  const [customerBooking, setCustomerBooking] = useState(true);
  const [roomManage, setRoomManage] = useState(false);
  const [hotelInfo, setHotelInfo] = useState(false);
  const [roomandProperty, setRoomandProperty] = useState(false);

  const handleCustomerBooking = () => {
    setCustomerBooking(true);
    setRoomManage(false);
    setHotelInfo(false);
    setRoomandProperty(false);
  };
  const handleRoomManage = () => {
    setCustomerBooking(false);
    setRoomManage(true);
    setHotelInfo(false);
    setRoomandProperty(false);
  };

  const handleHotelInfo = () => {
    setCustomerBooking(false);
    setRoomManage(false);
    setHotelInfo(true);
    setRoomandProperty(false);
  };

  const handleRoomandProperty = () => {
    setCustomerBooking(false);
    setRoomManage(false);
    setHotelInfo(false);
    setRoomandProperty(true);
  };

  const DrawerSx = {
    bgcolor: "#2F3E35",
    
    pt: 2,
  };
  const ListSx = {
    bgcolor: "#2F3E35",
  };
  //   console.log(customerBooking);
  //   console.log(roomManage);
  //   console.log(hotelInfo);
  //   console.log(roomandProperty);

  return (
    <>
      <div className="flex ">
        <div className=" h-screen w-1/6 bg-green-800 flex flex-col items-center">
          <Drawer variant="permanent" open={open} sx={DrawerSx}>
            <div className="bg-green-800 flex flex-col items-center">
              <img
                src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/logo%20white.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvbG9nbyB3aGl0ZS5zdmciLCJpYXQiOjE2OTM1NjEyOTUsImV4cCI6MTcyNTA5NzI5NX0.rsBAS_CgCAh-wxK9ATUoNXQHhksFXHD2-ETG5s-Ruio&t=2023-09-01T09%3A41%3A34.755Z"
                alt="Logo"
                className="mb-5"
              />
              <p className="text-green-400">Admin Panel Control</p>
            </div>

            <List component="nav" sx={ListSx}>
              <SidebarItems
                handleCustomerBooking={handleCustomerBooking}
                handleRoomManage={handleRoomManage}
                handleHotelInfo={handleHotelInfo}
                handleRoomandProperty={handleRoomandProperty}
              />
              <Divider sx={{ my: 1 }} />
            </List>
          </Drawer>
        </div>

        {customerBooking && <CustomerBooking />}
        {roomManage && <RoomManagement />}
        {hotelInfo && <HotelInformation />}
        {roomandProperty && <RoomAndProperty />}
      </div>
    </>
  );
}

export default Admin;
