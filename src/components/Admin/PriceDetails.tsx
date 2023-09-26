import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PriceDetails() {
  const { bookId } = useParams();
  const [priceDetail, setPriceDetail] = useState({
    room_details: {
      room_type: "",
      price: "",
    },
    total_price_add_reqs: "",
    special_request: [],
    amount_room: "",
    amount_night: "",
    standard_request: "",
    payment_method: "",
    three_credit_card_num: "",
  });

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/booking/${bookId}`
      );
      console.log(response.data.data);
      const data = response.data.data;
      data.total_price = parseFloat(data.total_price);
      setPriceDetail(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [bookId]);

  const specialRequestPrice = (req) => {
    switch (req) {
      case "Baby cot":
        return 400;
      case "Airport transfer":
        return 200;
      case "Extra bed":
        return 500;
      case "Extra pillows":
        return 100;
      case "Phone chargers and adapters":
        return 100;
      case "Breakfast":
        return 150;
      default:
        return 0;
    }
  };

  const formatNumber = (number) => {
    return number.toLocaleString("en-US");
  };

  return (
    <div className="flex flex-col rounded items-center mb-[38px] pb-1 w-[920px]  bg-gray-100">
      <div className="flex flex-col justify-center items-center w-[872px]">
        <div className="flex flex-row w-[872px]  justify-end mt-3.5 pb-4 text-gray-600 ">
          {priceDetail.payment_method === "credit" ? (
            <>
              <p className="text-body1 mr-4">Payment success via</p>
              <span className="font-semibold text-[16px] leading-6">
                Credit Card - *{priceDetail.three_credit_card_num}
              </span>
            </>
          ) : (
            <p className="text-body1">Payment on arrival</p>
          )}
        </div>
        <div className="flex flex-col  w-[872px] text-gray-900">
          <div className="flex flex-row justify-between py-3  ">
            <p className="text-body1">
              {priceDetail.room_details.room_type} Room
            </p>
            <p className="text-body1 font-semibold ">
              {formatNumber(priceDetail.total_price)}
            </p>
          </div>
          {Array.isArray(priceDetail.special_request) &&
            priceDetail.special_request.map((item, index) => {
              const specialRequestPriceNumber = specialRequestPrice(item);
              return (
                <div
                  className="flex flex-row justify-between  py-3"
                  key={index}
                >
                  <p className="text-body1">{item}</p>
                  <p className="text-body1 font-semibold  ">
                    {formatNumber(
                      specialRequestPriceNumber * priceDetail.amount_room
                    )}
                  </p>
                </div>
              );
            })}
        </div>
        <div className="flex flex-row justify-between items-end mt-3 mb-4 text-gray-900 border-t border-gray-300 w-[872px] h-[54px]">
          <p>Total</p>
          <p className="text-body1 font-bold">
            THB {formatNumber(priceDetail.total_price_add_reqs)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PriceDetails;
