import BookingDetail from "./BookingDetail";
import BookingNote from "./BookingNote";
import { useState } from "react";
import ButtonNavigation from "./ButtonNavigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { FormControlLabel, Checkbox } from "@mui/material";
import Typography from "@mui/material/Typography";

function SpecialRequest2({ steps, activeStep, setActiveStep }) {
  const standard = [
    { name: "Early check-in", checked: false },
    { name: "Late check-out", checked: false },
    { name: "Non-smoking room", checked: false },
    { name: "A room on the high floor", checked: false },
    { name: "A quiet room", checked: false },
  ];

  const special = [
    { name: "Baby cot", price: 400, checked: false },
    { name: "Airport transfer", price: 200, checked: false },
    { name: "Extra bed", price: 500, checked: false },
    { name: "Extra pillows", price: 100, checked: false },
    { name: "Phone chargers and adapters", price: 100, checked: false },
    { name: "Breakfast", price: 150, checked: false },
  ];

  const [requests, setRequests] = useState(special);
  const [standardRequests, setStandardRequests] = useState(standard);
  const [additional, setAdditional] = useState("");

  function handleToggleSpecialRequest(name) {
    setRequests((requests) =>
      requests.map((request) =>
        request.name === name
          ? { ...request, checked: !request.checked }
          : request
      )
    );
  }

  function handleToggleStandardRequest(name) {
    setStandardRequests((requests) =>
      requests.map((request) =>
        request.name === name
          ? { ...request, checked: !request.checked }
          : request
      )
    );
  }

  function handleAdditionalRequest(e) {
    setAdditional(e.target.value);
  }

  const selectedSpecial = requests.filter(
    (request) => request.checked === true
  );

  const selectedStandard = standardRequests.filter(
    (request) => request.checked === true
  );

  const totalPrice = selectedSpecial.reduce(
    (acc, request) => acc + request.price,
    2500
  );

  // const info = [];

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
          <p className="text-gray-600 text-body2 mb-8">
            These requests are not confirmed (Depend on the available room)
          </p>
          <div className="form-control flex flex-col gap-3 text-body-1 text-gray-700">
            <ThemeProvider theme={theme}>
              {standard.map((request) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() =>
                          handleToggleStandardRequest(request.name)
                        }
                        name={request.name}
                        value={request.checked}
                      />
                    }
                    label={
                      <Typography
                        sx={
                          request.checked
                            ? {
                                fontSize: 18,
                                fontWeight: "bold",
                                color: "#2A2E3F",
                              }
                            : { fontSize: 18, fontWeight: "regular" }
                        }
                      >
                        {request.name}
                      </Typography>
                    }
                  />
                );
              })}
            </ThemeProvider>
          </div>
        </>
        <>
          <p className="text-gray-600 text-headline5 mt-8">Special Request</p>
          <p className="text-gray-600 text-body2 mb-8">
            Additional charge may apply
          </p>
          <div className="form-control flex flex-col gap-3 text-body-1 text-gray-700">
            <ThemeProvider theme={theme}>
              {special.map((request) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={() =>
                          handleToggleSpecialRequest(request.name)
                        }
                        name={request.name}
                        value={request.checked}
                      />
                    }
                    label={
                      <Typography
                        sx={
                          request.checked
                            ? {
                                fontSize: 18,
                                fontWeight: "bold",
                                color: "#2A2E3F",
                              }
                            : { fontSize: 18, fontWeight: "regular" }
                        }
                      >
                        {request.name} (+THB {request.price})
                      </Typography>
                    }
                  />
                );
              })}
            </ThemeProvider>
          </div>
        </>

        <div className="flex flex-col mt-10">
          <label htmlFor="additionRequest" className="text-gray-900 text-body1">
            Additional Request
          </label>
          <textarea
            name="additionRequest"
            id="additionRequest"
            // value={additional}
            onChange={(e) => handleAdditionalRequest(e)}
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
        <BookingDetail
          selectedStandard={selectedStandard}
          totalPrice={totalPrice}
          additional={additional}
          selectedSpecial={selectedSpecial}
        />
        <BookingNote />
      </div>
    </div>
  );
}

export default SpecialRequest2;
