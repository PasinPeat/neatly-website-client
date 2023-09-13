function ButtonPayment(props) {
  return (
    <button
      onClick={props.onClick}
      className={
        props.isActive
          ? "bg-white border-[1px] border-orange-500 rounded w-[200px] h-[80px] py-6 px-5 flex gap-2 items-center justify-center drop-shadow-lg"
          : "bg-white border-[1px] border-gray-300 rounded w-[200px] h-[80px] py-6 px-5 flex gap-2 items-center justify-center drop-shadow-lg"
      }
    >
      {/* <img src={props.image} alt={props.title} className="h-8 w-8" /> */}
      {/* {props.isActive ? (
        <img src={props.imageActive} alt={props.title} className="h-8 w-8" />
      ) : (
        <img src={props.image} alt={props.title} className="h-8 w-8" />
      )} */}

      {props.isActive ? (
        <img
          src={props.image}
          alt={props.title}
          className="h-8 w-8 text-orange-500"
        />
      ) : (
        <img src={props.image} alt={props.title} className="h-8 w-8" />
      )}

      <p
        className={
          props.isActive
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
