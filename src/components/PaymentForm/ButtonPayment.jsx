import { useState } from "react";

function ButtonPayment(props) {
  const [isActive, setIsActive] = useState(true);

  const toggleButton = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      onClick={toggleButton}
      className={
        !isActive
          ? "bg-white border-[1px] border-orange-500 rounded w-[200px] h-[80px] py-6 px-5 flex gap-2 items-center justify-center drop-shadow-lg"
          : "bg-white border-[1px] border-gray-300 rounded w-[200px] h-[80px] py-6 px-5 flex gap-2 items-center justify-center drop-shadow-lg"
      }
    >
      <img src={props.image} alt={props.title} className="h-8 w-8" />
      <p
        className={
          !isActive
            ? "text-orange-500 text-headline5"
            : "text-gray-600 text-headline5"
        }
      >
        {props.title}
      </p>
    </button>
  );
}

export default ButtonPayment;
