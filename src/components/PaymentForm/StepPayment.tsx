import ButtonPayment from "./ButtonPayment";
import BookingDetail from "./BookingDetail";
import BookingNote from "./BookingNote";
import { useState } from "react";

function StepPayment() {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const creditButtonProps = {
    image:
      "https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/credit.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2NyZWRpdC5zdmciLCJpYXQiOjE2OTQ0Mjk0MzIsImV4cCI6MTcyNTk2NTQzMn0.YZfJo_NyZKS99ZiiKKabGte6Yn7pNj7d3sLlKEWez1M&t=2023-09-11T10%3A50%3A32.824Z",
    imageActive:
      "https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/Payment/credit-orange.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL1BheW1lbnQvY3JlZGl0LW9yYW5nZS5zdmciLCJpYXQiOjE2OTQ1ODYwMTAsImV4cCI6MTcyNjEyMjAxMH0.I-Y_K84PLKXVbgdOZJA_oqtFp5ZufGb1SaD4tMC6uyg&t=2023-09-13T06%3A20%3A10.977Z",
    title: "Credit Card",
    isActive: selectedPayment === "credit",
    onClick: () => {
      setSelectedPayment("credit");
    },
  };

  const cashButtonProps = {
    image:
      "https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/Payment/cash-gray.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL1BheW1lbnQvY2FzaC1ncmF5LnN2ZyIsImlhdCI6MTY5NDU4NjA4MSwiZXhwIjoxNzI2MTIyMDgxfQ.ufyLSfCCTquGAyPOR5f7Rq8hFOeyuYwyxEc7WXHB5Ig&t=2023-09-13T06%3A21%3A22.323Z",
    imageActive:
      "https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/credit.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2NyZWRpdC5zdmciLCJpYXQiOjE2OTQ0Mjk0MzIsImV4cCI6MTcyNTk2NTQzMn0.YZfJo_NyZKS99ZiiKKabGte6Yn7pNj7d3sLlKEWez1M&t=2023-09-11T10%3A50%3A32.824Z",

    title: "Cash",
    isActive: selectedPayment === "cash",
    onClick: () => {
      setSelectedPayment("cash");
    },
  };

  return (
    <div className="flex gap-6">
      <div className="w-[740px] bg-white border border-gray-300 p-10">
        <div className="flex gap-4">
          <ButtonPayment {...creditButtonProps} />
          <ButtonPayment {...cashButtonProps} />
        </div>

        {selectedPayment === "credit" && (
          <form>
            <p className="text-headline5 mt-[58px] mb-[38px] text-gray-600">
              Credit Card
            </p>

            <div>
              <label htmlFor="cardNumber">
                <p className="font-body1 text-gray-900 mb-[4px]">Card Number</p>
              </label>
              <input
                id="cardNumber"
                type="text"
                name="card_number"
                className="w-full InputSuccess mb-[38px]"
                disabled
                // value={payment.card_number}
              />
            </div>
            <div>
              <label htmlFor="cardOwner">
                <p className="font-body1 text-gray-900 mb-[4px]">Card Owner</p>
              </label>
              <input
                id="cardOwner"
                type="text"
                name="card_owner"
                className="w-full InputSuccess mb-[38px]"
                disabled
                // value={payment.card_owner}
              />
            </div>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <label htmlFor="expire_date">
                  <p className="font-body1 text-gray-900 mb-[4px]">
                    Expiry Date
                  </p>
                </label>
                <input
                  id="expire_date"
                  type="tel"
                  name="expire_date"
                  className="w-full InputSuccess mb-[38px]"
                  disabled
                  // value={payment.expire_date}
                />
              </div>

              <div>
                <label htmlFor="cvc">
                  <p className="font-body1 text-gray-900 mb-[4px]">CVC/CVV</p>
                </label>
                <input
                  id="cvc"
                  type="tel"
                  name="cvc"
                  className="w-full InputSuccess mb-[38px]"
                  disabled
                  // value={payment.cvc}
                />
              </div>
            </div>
          </form>
        )}

        {selectedPayment === "cash" && (
          <div className="bg-gray-200 rounded flex justify-center items-center m-16 p-10">
            <p>
              If you wnt to pay by cash,
              <br />
              you are required to make a cash payment
              <br />
              upon arrival at the
              <br />
              <span className="font-noto-serif-display font-medium	text-[42px] text-black">
                Neatly Hotel
              </span>
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <BookingDetail />
        <BookingNote />
      </div>
    </div>
  );
}

export default StepPayment;
