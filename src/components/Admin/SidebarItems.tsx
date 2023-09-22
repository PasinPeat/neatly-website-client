import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

function SidebarItems(props) {
  const TextSx = {
    color: "#D5DFDA",
    fontSize: 34,
    fontWeight: "medium",
  };
  const TextSx2 = {
    color: "#D5DFDA",
    fontSize: 30,
    fontWeight: "medium",
  };

  const ButtonSx = {
    p: 3,
    bgcolor: "#2F3E35",
  };
  const ButtonSxHilight = {
    p: 3,
    bgcolor: "#5D7B6A",
  };

  return (
    <React.Fragment>
      <ListItemButton
        sx={props.customerBooking ? ButtonSxHilight : ButtonSx}
        onClick={props.handleCustomerBooking}
      >
        <ListItemIcon>
          <img src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/Admin_icon/CustomerBooking.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9BZG1pbl9pY29uL0N1c3RvbWVyQm9va2luZy5zdmciLCJpYXQiOjE2OTUyODk4MzMsImV4cCI6MTcyNjgyNTgzM30.XbyeGf-ASCCu3gHGD29ztY5Pc2g-DAkue0fSA9ZEX_o&t=2023-09-21T09%3A50%3A33.224Z" />
        </ListItemIcon>
        <ListItemText sx={TextSx} primary="Customer Booking" />
      </ListItemButton>
      <ListItemButton
        sx={props.roomManage ? ButtonSxHilight : ButtonSx}
        onClick={props.handleRoomManage}
      >
        <ListItemIcon>
          <img src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/Admin_icon/RoomManagement.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9BZG1pbl9pY29uL1Jvb21NYW5hZ2VtZW50LnN2ZyIsImlhdCI6MTY5NTI4OTg4OSwiZXhwIjoxNzI2ODI1ODg5fQ.ik_JoupUiOTVBAyQ3p8LPmuzPoeIKoIHWJ2TzJ2ly4E&t=2023-09-21T09%3A51%3A29.588Z" />
        </ListItemIcon>
        <ListItemText sx={TextSx} primary="Room Management" />
      </ListItemButton>

      <ListItemButton
        sx={props.roomandProperty ? ButtonSxHilight : ButtonSx}
        onClick={props.handleRoomandProperty}
      >
        <ListItemIcon>
          <img src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/Admin_icon/Room&Property.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9BZG1pbl9pY29uL1Jvb20mUHJvcGVydHkuc3ZnIiwiaWF0IjoxNjk1Mjg5OTU3LCJleHAiOjE3MjY4MjU5NTd9.cpj4kcTYeANdwUjBum3_WLuR4MDlcYWz2Z30Y-mJxmA&t=2023-09-21T09%3A52%3A36.974Z" />
        </ListItemIcon>
        <ListItemText sx={TextSx2} primary="RoomType & Property" />
      </ListItemButton>
      <Divider sx={{ mt: 25, bgcolor: "#81A08F" }} />
      <ListItemButton
        sx={ButtonSx}
        // onClick={props.handleRoomandProperty}
      >
        <ListItemIcon>
          <img src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/Admin_icon/logout.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9BZG1pbl9pY29uL2xvZ291dC5zdmciLCJpYXQiOjE2OTUzNjQ4ODIsImV4cCI6MTcyNjkwMDg4Mn0.jvoqoBJbyc6eRjFEO_Lfl_MGG-k22uWTxfsWwpsdgGA&t=2023-09-22T06%3A41%3A23.204Z" />
        </ListItemIcon>
        <ListItemText sx={TextSx} primary="Log Out" />
      </ListItemButton>
    </React.Fragment>
  );
}

export default SidebarItems;