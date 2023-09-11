import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface RouteParams {
  paymentmethodID: string;
}

function PaymentMethod() {
  const params = useParams<RouteParams>();
  const [payment, setPayment] = useState({
    card_number: "",
    expire_date: "",
    card_owner: "",
    cvc: "",
  });

  const getPaymentID = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/paymentmethod/${params.paymentmethodID}`
      );
      console.log(response.data.data);
      const data = response.data.data;
      setPayment(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPaymentID();
  }, [params.paymentmethodID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:4000/paymentmethod/${params.paymentmethodID}`,
        payment
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayment({
      ...payment,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col items-center w-screen bg-bg">
      <Navbar />
      <div className="flex flex-col w-[70%] ">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between mt-[80px] items-center">
            <h1 className="font-noto-serif-display text-[68px] font-medium text-green-800">
              Payment Method
            </h1>
            <button className="btn Button w-[258px] h-[48px]" type="submit">
              Update Payment Method
            </button>
          </div>
          <p className="text-headline5 mt-[58px] mb-[38px] text-gray-600">
            Credit Card
          </p>
          <div className="grid grid-rows-2 grid-flow-col gap-x-[22px] mb-[38px]">
            <div>
              <label htmlFor="cardNumber">
                <p className="font-body1 text-gray-900  mb-[4px]">
                  Card Number
                </p>
              </label>
              <input
                id="cardNumber"
                type="text"
                name="card_number"
                placeholder="Enter your card number"
                className="w-full Input mb-[38px] text-black"
                value={payment.card_number}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="expire_date">
                <p className="font-body1 text-gray-900  mb-[4px]">
                  Expiry Date
                </p>
              </label>
              <input
                id="expire_date"
                type="tel"
                name="expire_date"
                placeholder="MM/YY"
                className="w-full Input mb-[38px] text-black"
                value={payment.expire_date}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="cardOwner">
                <p className="font-body1 text-gray-900  mb-[4px]">Card Owner</p>
              </label>
              <input
                id="cardOwner"
                type="text"
                name="card_owner"
                placeholder="Enter your name"
                className="w-full Input mb-[38px] text-black"
                value={payment.card_owner}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="cvc">
                <p className="font-body1 text-gray-900  mb-[4px]">CVC/CVV</p>{" "}
              </label>
              <input
                id="cvc"
                type="tel"
                name="cvc"
                pattern="\d*"
                placeholder="CVC/CVV"
                className="w-full Input mb-[38px] text-black"
                value={payment.cvc}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentMethod;
