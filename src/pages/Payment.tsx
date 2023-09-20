import React from "react";
import Navbar from "../components/Navbar";
import StepBasicInfo from "../components/PaymentForm/StepBasicInfo";
import StepSpecialRequest2 from "../components/PaymentForm/StepSpecialRequest2";
import StepPayment from "../components/PaymentForm/StepPayment";
import ReviewPayment from "../components/PaymentForm/ReviewPayment";
import { useState, useContext, useEffect } from "react";
// import { RoomsContext } from "../App.tsx";
import dayjs, { Dayjs } from "dayjs";
export const PaymentContext = React.createContext();

function Payment() {
  const steps = ["Basic Information", "Special Request", "Payment Method"];
  const [activeStep, setActiveStep] = useState(0);
  const [lastCreditNum, setLastCreditNum] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("credit");

  console.log(lastCreditNum);
  // const context = useContext(RoomsContext);
  const [userInput, setUserInput] = useState({});
  // const userInput = context.userInput;
  // const setUserInput = context.setUserInput;
  useEffect(() => {
    try {
      const storedUserInput = localStorage.getItem("userInput");
      if (storedUserInput) {
        setUserInput(JSON.parse(storedUserInput));
      }
    } catch (error) {
      // Handle JSON parsing error, e.g., log or set a default value
      console.error("Error parsing JSON:", error);
    }
  }, []);
  console.log(userInput);

  /*formatted date*/
  function formattedDate(date: Dayjs | string) {
    return date ? dayjs(date).format("dd, DD-MM-YYYY") : "";
  }

  const checkInDate = formattedDate(userInput.checkInDate);
  const checkOutDate = formattedDate(userInput.checkOutDate);

  // useEffect(() => {
  //   if (context) {
  //     setUserInput(context.userInput);
  //   } else {
  //     const storedUserInput = localStorage.getItem("userInput");
  //     if (storedUserInput) {
  //       setUserInput(JSON.parse(storedUserInput));
  //     }
  //   }
  // }, [context]);

  // useEffect(() => {
  //   const storedUserInput = localStorage.getItem("userInput");

  //   setUserInput(JSON.parse(storedUserInput));
  // }, []);

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

  const [specialRequests, setSpecialRequests] = useState(special);
  const [standardRequests, setStandardRequests] = useState(standard);
  const [additional, setAdditional] = useState("");

  /*toggle standard requests*/
  function handleToggleStandardRequest(name) {
    setStandardRequests((requests) =>
      requests.map((request) =>
        request.name === name
          ? { ...request, checked: !request.checked }
          : request
      )
    );
  }

  const selectedStandard = standardRequests.filter(
    (request) => request.checked === true
  );

  /*toggle special requests*/
  function handleToggleSpecialRequest(name) {
    setSpecialRequests((requests) =>
      requests.map((request) =>
        request.name === name
          ? {
              ...request,
              checked: !request.checked,
              price: request.price,
            }
          : request
      )
    );
  }

  const selectedSpecial = specialRequests.filter(
    (request) => request.checked === true
  );

  /*add additional requests*/
  function handleAdditionalRequest(e) {
    setAdditional(e.target.value);
  }

  /*find total Price*/
  let totalPriceAfterAddReqs = userInput.totalPrice;

  if (selectedSpecial) {
    totalPriceAfterAddReqs = selectedSpecial.reduce(
      (acc, request) => acc + request.price * userInput.room,
      userInput.totalPrice
    );
  }

  /*apply early check-in or late check-out if they exist*/
  let checkInTime = "After 2:00 PM";
  if (selectedStandard.some((request) => request.name === "Early check-in")) {
    checkInTime = "After 1:00 PM";
  }

  let checkOutTime = "After 11:00 PM";
  if (selectedStandard.some((request) => request.name === "Late check-out")) {
    checkOutTime = "After 12:00 PM";
  }

  /*handle payment method*/
  function handlePaymentMethod(method) {
    setUserInput({ ...userInput, paymentMethod: method });
  }

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return (
          <StepBasicInfo
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            steps={steps}
          />
        );
      case 1:
        return (
          <StepSpecialRequest2
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            steps={steps}
            standardRequests={standardRequests}
            specialRequests={specialRequests}
          />
        );
      case 2:
        return (
          <StepPayment
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            steps={steps}
            setLastCreditNum={setLastCreditNum}
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <PaymentContext.Provider
      value={{
        selectedStandard,
        selectedSpecial,
        additional,
        totalPriceAfterAddReqs,
        handleToggleStandardRequest,
        handleToggleSpecialRequest,
        handleAdditionalRequest,
        setAdditional,
        checkInDate,
        checkOutDate,
        checkInTime,
        checkOutTime,
        handlePaymentMethod,
      }}
    >
      <div className="w-screen h-screen">
        <Navbar />
        <div className="bg-gray-200 flex justify-center py-16 ">
          <div className="flex flex-col items-start ">
            {/* Stepper */}
            {activeStep < steps.length && (
              <div>
                <h1 className="font-noto-serif-display font-medium text-headline2 text-black">
                  Booking Room
                </h1>

                <ul className="flex gap-16 py-10">
                  {steps.map((label, index) => (
                    <li key={label} className="flex items-center gap-4">
                      <div
                        className={
                          index < activeStep
                            ? "bg-orange-100 py-3 rounded w-12 h-12 flex justify-center items-center text-headline4"
                            : index === activeStep
                            ? "bg-orange-500 py-3 rounded w-12 h-12 flex justify-center items-center text-headline4"
                            : "bg-gray-300 py-3 rounded w-12 h-12 flex justify-center items-center text-headline4"
                        }
                      >
                        <p
                          className={
                            index < activeStep
                              ? "text-headline5 text-orange-500"
                              : index === activeStep
                              ? "text-headline5 text-white"
                              : "text-headline5 text-gray-600"
                          }
                        >
                          {index + 1}
                        </p>
                      </div>

                      <p
                        className={
                          index < activeStep
                            ? "text-headline5 text-black"
                            : index === activeStep
                            ? "text-headline5 text-orange-500"
                            : "text-headline5 text-gray-600"
                        }
                      >
                        {label}
                      </p>
                    </li>
                  ))}
                </ul>
                <hr className="mb-10 border-t-2 border-gray-300 w-[1120px]" />
              </div>
            )}

            {activeStep === steps.length ? (
              // สรุปข้อมูลการจอง
              <div className="flex justify-center items-center">
                <ReviewPayment
                  lastCreditNum={lastCreditNum}
                  selectedPayment={selectedPayment}
                />
              </div>
            ) : (
              <div>{getStepContent(activeStep)}</div>
            )}
          </div>
        </div>
      </div>
    </PaymentContext.Provider>
  );
}

export default Payment;
