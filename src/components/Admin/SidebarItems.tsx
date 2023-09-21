import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";

function SidebarItems(props) {
  const TextSx = {
    color: "#D5DFDA",
    fontSize: 34,
    fontWeight: "medium",
  };

  const ButtonSx= {
    p: 3,
  }
  return (
    <React.Fragment>
      <ListItemButton sx={ButtonSx} onClick={props.handleCustomerBooking}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText sx={TextSx} primary="Customer Booking" />
      </ListItemButton>
      <ListItemButton sx={ButtonSx} onClick={props.handleRoomManage}>
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText sx={TextSx} primary="Room Management" />
      </ListItemButton>
      <ListItemButton  sx={ButtonSx} onClick={props.handleHotelInfo}>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText sx={TextSx} primary="Hotel Information" />
      </ListItemButton>
      <ListItemButton sx={ButtonSx} onClick={props.handleRoomandProperty}>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText  sx={TextSx} primary="Room & Property" />
      </ListItemButton>
    </React.Fragment>
  );
}

export default SidebarItems;
