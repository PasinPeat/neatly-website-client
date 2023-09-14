import BookingDetail from "./BookingDetail";
import BookingNote from "./BookingNote";
import { useState } from "react";
import ButtonNavigation from "./ButtonNavigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FormControlLabel, Checkbox } from "@mui/material";
import Typography from "@mui/material/Typography";

function SpecialRequest({ steps, activeStep, setActiveStep }) {
  //StandardRequest
  const [StandardRequest, setStandardRequest] = useState({
    EarlyCheckin: false,
    LateCheckout: false,
    NonSmokingRoom: false,
    ARoomOnTheHighFloor: false,
    AQuietRoom: false,
  });
  const [StandardRequestSelected, setStandardRequestSelected] = useState<
    string[]
  >([]);

  //SpecialRequest
  const [SpecialRequest, setSpecialRequest] = useState({
    BabyCot: false,
    AirportTransfer: false,
    ExtraBed: false,
    ExtraPillows: false,
    PhoneChargersAndAdapters: false,
    Breakfast: false,
  });
  const [SpecialRequestSelected, setSpecialRequestSelected] = useState<
    string[]
  >([]);

  const [totalCost, setTotalCost] = useState(0);

  const {
    EarlyCheckin,
    LateCheckout,
    NonSmokingRoom,
    ARoomOnTheHighFloor,
    AQuietRoom,
  } = StandardRequest;
  const {
    BabyCot,
    AirportTransfer,
    ExtraBed,
    ExtraPillows,
    PhoneChargersAndAdapters,
    Breakfast,
  } = SpecialRequest;

  const handleStandardRequestChange = (event) => {
    const { name, checked, value } = event.target;
    setStandardRequest({
      ...StandardRequest,
      [name]: checked,
    });

    if (checked) {
      setStandardRequestSelected((prevStandardRequestSelected) => [
        ...prevStandardRequestSelected,
        value,
      ]);
    } else {
      setStandardRequestSelected((prevStandardRequestSelected) =>
        prevStandardRequestSelected.filter((str) => str !== value)
      );
    }
  };
  console.log(StandardRequestSelected);
  console.log(StandardRequest);

  const handleSpecialRequestChange = (event) => {
    const { name, checked, value } = event.target;
    setSpecialRequest({
      ...SpecialRequest,
      [name]: checked,
    });

    if (checked) {
      setSpecialRequestSelected((prevSpecialRequestSelected) => [
        ...prevSpecialRequestSelected,
        value,
      ]);
    } else {
      setSpecialRequestSelected((prevSpecialRequestSelected) =>
        prevSpecialRequestSelected.filter((str) => str !== value)
      );
    }

    let valueToAdd = 0;

    switch (name) {
      case "BabyCot":
        valueToAdd = checked ? 400 : -400;
        break;
      case "AirportTransfer":
        valueToAdd = checked ? 200 : -200;
        break;
      case "ExtraBed":
        valueToAdd = checked ? 500 : -500;
        break;
      case "ExtraPillows":
        valueToAdd = checked ? 100 : -100;
        break;
      case "PhoneChargersAndAdapters":
        valueToAdd = checked ? 100 : -100;
        break;
      case "Breakfast":
        valueToAdd = checked ? 150 : -150;
        break;
      default:
        break;
    }
    setTotalCost((prevTotalCost) => prevTotalCost + valueToAdd);
  };

  // console.log(totalCost);
  // console.log(SpecialRequest);

  // console.log(SpecialRequestSelected);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#E76B39",
        light: "#E76B39",
        dark: "#E76B39",
      },
    },
  });

  return (
    <div className="flex gap-6">
      <div className="w-[740px] bg-white border border-gray-300 rounded p-10">
        <>
          <p className="text-gray-600 text-headline5">Standard Request</p>
          <p className="text-gray-600 text-body2 mb-10">
            These requests are not confirmed (Depend on the available room)
          </p>
          <div className="form-control flex flex-col gap-6 text-body-1 text-gray-700">
            <ThemeProvider theme={theme}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={EarlyCheckin}
                    onChange={handleStandardRequestChange}
                    name="EarlyCheckin"
                    value="Early check-in"
                    // {name: "Early check-in",value: 200}
                  />
                }
                label={
                  <Typography
                    sx={
                      EarlyCheckin
                        ? { fontSize: 18, fontWeight: "bold", color: "#2A2E3F" }
                        : { fontSize: 18, fontWeight: "regular" }
                    }
                  >
                    Early check-in
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={LateCheckout}
                    onChange={handleStandardRequestChange}
                    name="LateCheckout"
                    value="Late check-out"
                  />
                }
                label={
                  <Typography
                    sx={
                      LateCheckout
                        ? { fontSize: 18, fontWeight: "bold", color: "#2A2E3F" }
                        : { fontSize: 18, fontWeight: "regular" }
                    }
                  >
                    Late check-out
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={NonSmokingRoom}
                    onChange={handleStandardRequestChange}
                    name="NonSmokingRoom"
                    value="Non-smoking room"
                  />
                }
                label={
                  <Typography
                    sx={
                      NonSmokingRoom
                        ? { fontSize: 18, fontWeight: "bold", color: "#2A2E3F" }
                        : { fontSize: 18, fontWeight: "regular" }
                    }
                  >
                    Non-smoking room
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ARoomOnTheHighFloor}
                    onChange={handleStandardRequestChange}
                    name="ARoomOnTheHighFloor"
                    value="A room on the high floor"
                  />
                }
                label={
                  <Typography
                    sx={
                      ARoomOnTheHighFloor
                        ? { fontSize: 18, fontWeight: "bold", color: "#2A2E3F" }
                        : { fontSize: 18, fontWeight: "regular" }
                    }
                  >
                    A room on the high floor
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={AQuietRoom}
                    onChange={handleStandardRequestChange}
                    name="AQuietRoom"
                    value="A quiet room"
                  />
                }
                label={
                  <Typography
                    sx={
                      AQuietRoom
                        ? { fontSize: 18, fontWeight: "bold", color: "#2A2E3F" }
                        : { fontSize: 18, fontWeight: "regular" }
                    }
                  >
                    A quiet room
                  </Typography>
                }
              />
            </ThemeProvider>
          </div>
        </>

        <>
          <p className="text-gray-600 text-headline5 mt-10">Special Request</p>
          <p className="text-gray-600 text-body2 mb-10">
            Additional charge may apply
          </p>
          <div className="form-control flex flex-col gap-6 text-body-1 text-gray-700">
            <ThemeProvider theme={theme}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={BabyCot}
                    onChange={handleSpecialRequestChange}
                    name="BabyCot"
                    value="Baby cot"
                  />
                }
                label={
                  <Typography
                    sx={
                      BabyCot
                        ? { fontSize: 18, fontWeight: "bold", color: "#2A2E3F" }
                        : { fontSize: 18, fontWeight: "regular" }
                    }
                  >
                    Baby cot (+THB 400)
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={AirportTransfer}
                    onChange={handleSpecialRequestChange}
                    name="AirportTransfer"
                    value="Airport transfer"
                  />
                }
                label={
                  <Typography
                    sx={
                      AirportTransfer
                        ? { fontSize: 18, fontWeight: "bold", color: "#2A2E3F" }
                        : { fontSize: 18, fontWeight: "regular" }
                    }
                  >
                    Airport transfer (+THB 200)
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ExtraBed}
                    onChange={handleSpecialRequestChange}
                    name="ExtraBed"
                    value="Extra bed"
                  />
                }
                label={
                  <Typography
                    sx={
                      ExtraBed
                        ? { fontSize: 18, fontWeight: "bold", color: "#2A2E3F" }
                        : { fontSize: 18, fontWeight: "regular" }
                    }
                  >
                    Extra bed (+THB 500)
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={ExtraPillows}
                    onChange={handleSpecialRequestChange}
                    name="ExtraPillows"
                    value="Extra pillows"
                  />
                }
                label={
                  <Typography
                    sx={
                      ExtraPillows
                        ? { fontSize: 18, fontWeight: "bold", color: "#2A2E3F" }
                        : { fontSize: 18, fontWeight: "regular" }
                    }
                  >
                    Extra pillows (+THB 100)
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={PhoneChargersAndAdapters}
                    onChange={handleSpecialRequestChange}
                    name="PhoneChargersAndAdapters"
                    value="Phone chargers and adapters"
                  />
                }
                label={
                  <Typography
                    sx={
                      PhoneChargersAndAdapters
                        ? { fontSize: 18, fontWeight: "bold", color: "#2A2E3F" }
                        : { fontSize: 18, fontWeight: "regular" }
                    }
                  >
                    Phone chargers and adapters (+THB 100)
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={Breakfast}
                    onChange={handleSpecialRequestChange}
                    name="Breakfast"
                    value="Breakfast"
                  />
                }
                label={
                  <Typography
                    sx={
                      Breakfast
                        ? { fontSize: 18, fontWeight: "bold", color: "#2A2E3F" }
                        : { fontSize: 18, fontWeight: "regular" }
                    }
                  >
                    Breakfast (+150)
                  </Typography>
                }
              />

              {/* <label className="cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-accent" />
              <span>Baby cot (+THB 400)</span>
            </label>
            <label className="cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-accent" />
              <span>Airport transfer (+THB 200)</span>
            </label>
            <label className="cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-accent" />
              <span>Extra bed (+THB 500)</span>
            </label>
            <label className="cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-accent" />
              <span>Extra pillows (+THB 100)</span>
            </label>
            <label className="cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-accent" />
              <span>Phone chargers and adapters (+THB 100)</span>
            </label>
            <label className="cursor-pointer">
              <input type="checkbox" className="checkbox checkbox-accent" />
              <span className="checked:text-black">Breakfast (+150)</span>
            </label> */}
            </ThemeProvider>
          </div>
        </>

        <div className="flex flex-col mt-10">
          <label className="text-gray-900 text-body1">Additional Request</label>
          <textarea
            name="additionRequest"
            id="additionRequest"
            className="h-20 w-full p-3 rounded bg-white border-2 border-gray-400 resize-none hover:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500 "
          ></textarea>
        </div>
        <ButtonNavigation
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          steps={steps}
        />
      </div>
      <div className="flex flex-col gap-4">
        <BookingDetail />
        <BookingNote />
      </div>
    </div>
  );
}

export default SpecialRequest;
