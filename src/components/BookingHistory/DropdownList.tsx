import React from "react";
import { useAuth } from "../../contexts/authen.jsx";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

function DropDownList({
  totalPrice,
  standard,
  special,
  additional,
  roomType,
  price,
  person,
}: any) {
  const auth = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
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
          <Collapse in={open} timeout="auto" unmountOnExit className=" px-3">
            <List component="div" disablePadding sx={{ px: 2, py: 1 }}>
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
            <List component="div" disablePadding sx={{ px: 2, py: 1 }}>
              <div className="flex justify-between w-full">
                <p className="text-body1">{roomType}</p>
                <p className="text-body1 font-bold text-black">
                  {parseFloat(price).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </List>
            <List component="div" disablePadding sx={{ px: 2 }}>
              {special &&
                special.map((item: string, index: number) => (
                  <div className="flex justify-between w-full py-2" key={index}>
                    <p className="text-body1">{item}</p>
                    <p className="text-body1 font-bold text-black">
                      {/* fix: fix to fetch *price* from detabase */}
                      200.00
                      {/* {parseFloat(price).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })} */}
                    </p>
                  </div>
                ))}
            </List>

            <List component="div" disablePadding sx={{ px: 2 }}>
              {standard &&
                standard.map((item: string, index: number) => (
                  <div className="flex justify-between w-full py-2" key={index}>
                    <p className="text-body1">{item}</p>
                    <p className="text-body1 font-bold text-black">
                      {/* fix: fix to fetch *price* from detabase */}
                      00.00
                    </p>
                  </div>
                ))}
            </List>

            <List component="div" disablePadding sx={{ px: 2, py: 1 }}>
              <div className="flex justify-between w-full border-t-[2px] border-green-300 py-4">
                <p className="text-body1">Total</p>
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
                <p className="text-body1 font-bold">Additional Request</p>
                <p className=" text-body1 pt-2">
                  {additional ? additional : "No additional Request"}
                </p>
              </div>
            </List>
          </Collapse>
        </List>
      </div>
    </>
  );
}

export default DropDownList;