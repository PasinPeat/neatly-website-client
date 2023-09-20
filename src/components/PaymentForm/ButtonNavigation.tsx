import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { RoomsContext } from "../../App";
import { PaymentContext } from "../../pages/Payment";
import { useAuth } from "../../contexts/authen";
import axios from "axios";

function ButtonNavigation({
  steps,
  activeStep,
  setActiveStep,
  selectedPayment,
}) {
  const auth = useAuth();
  const navigate = useNavigate();

  const roomsContext = useContext(RoomsContext);
  let userInput = roomsContext.userInput;
  const setUserInput = roomsContext.setUserInput;
  const paymentContext = useContext(PaymentContext);
  const totalPriceAfterAddReqs = paymentContext.totalPriceAfterAddReqs;
  const selectedStandard = paymentContext.selectedStandard;
  const selectedSpecial = paymentContext.selectedSpecial;
  const additional = paymentContext.additional;

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    userInput = {
      ...userInput,
      totalPriceAfterAddReqs,
      selectedStandard,
      selectedSpecial,
      additional,
    };
    setUserInput(userInput);
    console.log(userInput);
  };

  const handleSubmitBookingData = async (e) => {
    setActiveStep(activeStep + 1);
    userInput = {
      ...userInput,
      totalPriceAfterAddReqs,
      selectedStandard,
      selectedSpecial,
      additional,
      paymentMethod: selectedPayment,
    };
    setUserInput(userInput);
    console.log(userInput);

    // const standard_request = userInput.selectedStandard.map(
    //   (request) => request.name
    // );
    // const special_request = userInput.selectedSpecial.map(
    //   (request) => request.name
    // );

    // const data = {
    //   amount_room: userInput.room,
    //   amount_stay: userInput.person,
    //   check_in: userInput.checkInDate,
    //   check_out: userInput.checkOutDate,
    //   room_id: userInput.roomId,
    //   user_id: auth.state.userData.id,
    //   total_price: userInput.totalPriceAfterAddReqs,
    //   standard_request,
    //   special_request,
    //   additional_request: userInput.additional,
    //   room_avaliable_id: null,
    //   payment_method: userInput.paymentMethod,
    //   credit_card_id: auth.state.userData.credit_card_id,
    // };

    // console.log(data);
    // try {
    //   await axios.post(`http://localhost:4000/booking`, data);
    //   // console.log(response.data.data);
    // } catch (error) {
    //   console.error(error);
    // }
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

      {activeStep === steps.length - 1 ? (
        <button className="Button py-4" onClick={handleSubmitBookingData}>
          Confirm Booking
        </button>
      ) : (
        <button className="Button py-4" onClick={handleNext}>
          Next
        </button>
      )}
    </div>
  );
}

export default ButtonNavigation;
