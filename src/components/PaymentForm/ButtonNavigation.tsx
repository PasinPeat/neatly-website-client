import { useNavigate } from "react-router-dom";

function ButtonNavigation({ steps, activeStep, setActiveStep }) {
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
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
