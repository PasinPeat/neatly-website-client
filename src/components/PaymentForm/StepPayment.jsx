import ButtonPayment from "./ButtonPayment";
import BookingDetail from "./BookingDetail";
import BookingNote from "./BookingNote";

function PaymentMethod() {
  return (
    <div className="flex gap-6">
      <div className="w-[740px] bg-white border border-gray-300 p-10">
        <div className="flex gap-4">
          <ButtonPayment
            image="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/credit.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2NyZWRpdC5zdmciLCJpYXQiOjE2OTQ0Mjk0MzIsImV4cCI6MTcyNTk2NTQzMn0.YZfJo_NyZKS99ZiiKKabGte6Yn7pNj7d3sLlKEWez1M&t=2023-09-11T10%3A50%3A32.824Z"
            title="Credit Card"
          />
          <ButtonPayment
            image="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/cash.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2Nhc2guc3ZnIiwiaWF0IjoxNjk0NDg4NjE0LCJleHAiOjE3MjYwMjQ2MTR9.ZRflMcNAAOW68ecdU_Hm1BrOY04wpPG6KFCg1AnhaUw&t=2023-09-12T03%3A16%3A55.272Z"
            title="Cash"
          />
        </div>

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
                <p className="font-body1 text-gray-900 mb-[4px]">Expiry Date</p>
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
      </div>
      <div className="flex flex-col gap-4">
        <BookingDetail />
        <BookingNote />
      </div>
    </div>
  );
}

export default PaymentMethod;
