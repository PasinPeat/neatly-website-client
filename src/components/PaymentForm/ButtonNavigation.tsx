import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RoomsContext } from "../../App";
import { PaymentContext } from "../../pages/Payment";

function ButtonNavigation({ steps, activeStep, setActiveStep }) {
  const navigate = useNavigate();
  const roomsContext = useContext(RoomsContext);
  let userInput = roomsContext.userInput;
  const setUserInput = roomsContext.setUserInput;

  const paymentContext = useContext(PaymentContext);
  const totalPrice = paymentContext.totalPrice;
  const selectedStandard = paymentContext.selectedStandard;
  const selectedSpecial = paymentContext.selectedSpecial;
  const additional = paymentContext.additional;

  const selectedStandardName = selectedStandard.map((request) => request.name);
  const selectedSpecialName = selectedSpecial.map((request) => request.name);
  console.log(selectedSpecialName);

  // auth.state.userData.id;
  // import { useAuth } from "./contexts/authen.jsx";
  // const auth = useAuth();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    userInput = {
      // bookingDate: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      ...userInput,
      totalPrice,
      selectedStandard,
      selectedSpecial,
      additional,
    };
    // console.log(selectedSpecialName);

    // userInput = {
    //   booking_date: null,
    //   amount_room: userInput.room,
    //   amount_stay: userInput.person,
    //   check_in: userInput.checkInDate,
    //   check_out: userInput.checkOutDate,
    //   room_id: userInput.roomId,
    //   user_id: null,
    //   total_price: userInput.totalPrice,
    //   update_booking_date: null,
    //   standard_request: userInput.selectedStandardName,
    //   special_request: userInput.selectedSpecialName,
    //   additional_request: userInput.additional,
    //   room_avaliable_id: null,
    // };
    setUserInput(userInput);
    console.log(userInput);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div className="flex justify-between mt-10">
      <button
        className="text-orange-500 text-base font-semibold"
        onClick={() => {
          if (activeStep !== 0) {
            handleBack();
          } else {
            navigate("/search");
          }
        }}
      >
        Back
      </button>
      <button className="Button py-4" onClick={handleNext}>
        {activeStep === steps.length - 1 ? "Confirm Booking" : "Next"}
      </button>
    </div>
  );
}

export default ButtonNavigation;
