import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/authen";
import jwtDecode from "jwt-decode";

interface RouteParams {
  paymentmethodID: string;
  [key: string]: string | undefined;
}

function PaymentMethod() {
  const auth = useAuth();
  const [fullNameErrorCredit, setFullNameErrorCredit] = useState(false);
  const [creditCardError, setCreditCardError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams<RouteParams>();
  const [payment, setPayment] = useState({
    card_number: "",
    expire_date: "",
    card_owner: "",
    cvc: "",
  });
  const [checkUser, setCheckUser] = useState(null);
  const navigate = useNavigate();

  const validateFullNameCredit = (name: string) => {
    const names = name.trim().split(" ");
    if (
      names.length !== 2 ||
      !/^[a-zA-Z]*$/.test(names[0]) ||
      !/^[a-zA-Z]*$/.test(names[1])
    ) {
      setFullNameErrorCredit(true);
    } else {
      setFullNameErrorCredit(false);
    }
  };

  //check user
  const fetchAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const userDataFromToken = jwtDecode(token);
      const result = await axios.get(
        `http://localhost:4000/validUser/${userDataFromToken.credit_card_id}`
      );
      setCheckUser(result);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  const getPaymentID = async () => {
    const token = localStorage.getItem("token");
    console.log(auth.state.userData);
    if (token) {
      if (!fullNameErrorCredit && !creditCardError) {
        try {
          const response = await axios.get(
            `http://localhost:4000/paymentmethod/${auth.state.userData.credit_card_id}`
          );
          console.log(response.data.data);
          const data = response.data.data;

          const formattedCardNumber = data.card_number
            .replace(/[^\d]/g, "")
            .replace(/(\d{4})/g, "$1 ")
            .trim();
          setPayment({
            ...data,
            card_number: formattedCardNumber,
          });
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  useEffect(() => {
    getPaymentID();
  }, [checkUser]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);

    if (!fullNameErrorCredit && !creditCardError) {
      try {
        const cleanedCardNumber = payment.card_number.replace(/\s/g, "");
        const response = await axios.put(
          `http://localhost:4000/paymentmethod/${params.paymentmethodID}`,
          { ...payment, card_number: cleanedCardNumber }
        );
        console.log(response.data);
        setIsLoading(false);
        setIsModalOpen(true);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        setIsModalOpen(false);
      }
    } else {
      setIsLoading(false);
      return;
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setPayment({
      ...payment,
      [name]: value,
    });

    if (name === "card_number") {
      let formattedValue = value
        .replace(/[^\d]/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();

      if (formattedValue.length > 19) {
        return;
      } else if (formattedValue.length < 19) {
        setCreditCardError(true);
      } else {
        setCreditCardError(false);
      }

      setPayment({
        ...payment,
        [name]: formattedValue,
      });
    }

    if (name === "expire_date") {
      const cleanedValue = e.target.value.replace(/\D/g, "");
      const formattedValue = cleanedValue.replace(
        /^(\d{2})(\d{0,2})/,
        (_: any, month: any, year: any) => {
          const maxMonth = month > 12 ? "12" : month;
          return `${maxMonth}${year ? "/" : ""}${year}`;
        }
      );

      setPayment({
        ...payment,
        [name]: formattedValue,
      });
    }

    if (name === "card_owner") {
      validateFullNameCredit(value);
    }
  };

  return (
    <div className="flex flex-col items-center w-screen bg-bg">
      <Navbar />
      <div className="flex flex-col w-[70%] mb-[480px] ">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between mt-[50px]  items-center">
            <h1 className="font-noto-serif-display text-[68px] font-medium mb-[25px] text-green-800">
              Payment Method
            </h1>
            <button
              className="btn Button  w-[258px] h-[48px]"
              // onClick={() => setIsModalOpen(true)}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner w-7 bg-orange-600"></span>
              ) : (
                "Update Payment Method"
              )}
            </button>
          </div>
          <p className="text-headline5 mt-[58px] mb-[40px] text-gray-600">
            Credit Card
          </p>

          <div className="grid grid-rows-2 grid-flow-col gap-x-[38px] mb-[40px]">
            <div className="relative">
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
                className={`w-full mb-[38px] text-black Input focus:outline-none focus:border-orange-500 ${
                  creditCardError ? "border-[#B61515]" : "focus:outline-none"
                }`}
                value={payment.card_number}
                onChange={handleChange}
                maxLength={19}
                required
              />
              {creditCardError && (
                <>
                  <div className="absolute right-5 top-[53px] transform -translate-y-1/2">
                    <img
                      src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/123.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uLzEyMy5zdmciLCJpYXQiOjE2OTQxNjg2ODAsImV4cCI6MTcyNTcwNDY4MH0.p_CkT1rbBXUoggWNacczlqIqq5lHcnphLnOHkPXlDTQ&t=2023-09-08T10%3A24%3A33.645Z"
                      alt="Error Icon"
                      className="h-5 w-5"
                    />
                  </div>
                  <p className="text-body3 text-red absolute top-[85px]">
                    Invalid Credit Card number.
                  </p>
                </>
              )}
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
                maxLength={5}
                className="w-full Input mb-[38px] text-black focus:outline-none focus:border-orange-500"
                value={payment.expire_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="relative">
              <label htmlFor="cardOwner">
                <p className="font-body1 text-gray-900  mb-[4px]">Card Owner</p>
              </label>
              <input
                id="cardOwner"
                type="text"
                name="card_owner"
                placeholder="Enter your name"
                className={`w-full mb-[38px] text-black Input focus:outline-none focus:border-orange-500 ${
                  fullNameErrorCredit
                    ? "border-[#B61515]"
                    : "focus:outline-none"
                }`}
                value={payment.card_owner}
                onChange={handleChange}
                required
              />
              {fullNameErrorCredit && (
                <>
                  <div className="absolute right-5 top-[53px] transform -translate-y-1/2">
                    <img
                      src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/123.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uLzEyMy5zdmciLCJpYXQiOjE2OTQxNjg2ODAsImV4cCI6MTcyNTcwNDY4MH0.p_CkT1rbBXUoggWNacczlqIqq5lHcnphLnOHkPXlDTQ&t=2023-09-08T10%3A24%3A33.645Z"
                      alt="Error Icon"
                      className="h-5 w-5"
                    />
                  </div>
                  <p className="text-body3 text-red absolute top-[85px]">
                    Card Owner's name should include both first name and last
                    name.
                  </p>
                </>
              )}
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
                maxLength={3}
                placeholder="CVC/CVV"
                className="w-full Input mb-[38px] text-black focus:outline-none focus:border-orange-500"
                value={payment.cvc}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-box flex flex-col items-center  shadow-xl w-[400px] h-[440px]">
            <img
              src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/checkmark-removebg-preview.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2NoZWNrbWFyay1yZW1vdmViZy1wcmV2aWV3LnBuZyIsImlhdCI6MTY5NDY4MDYwNiwiZXhwIjoxNzI2MjE2NjA2fQ.Wz_CZaGiq3ddjcLSZ2nUdEPcdKAByClXptiYWXrCnYs&t=2023-09-14T08%3A36%3A46.749Z"
              alt="Check-Mark"
              className="h-[150px] w-[150px]"
            />
            <h1 className="text-headline3 font-medium text-greencheck">
              Success!
            </h1>
            <p className="py-4 font-bold text-[20px]  text-center">
              Your payment details have <br /> been updated successfully. <br />
            </p>
            <div className="modal-action">
              <button
                className="btn w-[200px] h-[50px] bg-greencheck rounded-full hover:bg-greenhover  text-headline4  text-white "
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                OKAY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentMethod;
