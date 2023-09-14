import Navbar from "../components/Navbar";
import StepBasicInfo from "../components/PaymentForm/StepBasicInfo";
import StepSpecialRequest from "../components/PaymentForm/StepSpecialRequest";
import StepPayment from "../components/PaymentForm/StepPayment";
import ReviewPayment from "../components/PaymentForm/ReviewPayment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const steps = ["Basic Information", "Special Request", "Payment Method"];
  const [activeStep, setActiveStep] = useState(0);

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
          <StepSpecialRequest
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            steps={steps}
          />
        );
      case 2:
        return (
          <StepPayment
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            steps={steps}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <>
      <div className="w-screen h-screen">
        <Navbar />
        <div className="bg-gray-200 flex justify-center py-10 ">
          <div className="flex flex-col items-start">
            <h1 className="font-noto-serif-display font-medium	text-[68px] text-black">
              Booking Room
            </h1>
            <hr className="border-t-2 border-gray-300" />

            {/* Stepper */}
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

            <hr className="border-t-1 border-gray-300" />
            {activeStep === steps.length ? (
              // สรุปข้อมูลการจอง
              <div className="flex justify-center items-center">
                <ReviewPayment />
              </div>
            ) : (
              <div>{getStepContent(activeStep)}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
