import RoomDetailSlidebar from "../RoomDetail/RoomDetailSlidebar";

function ImageFullPopup({ roomImages, onClosePopup }) {
  console.log(roomImages);
  return (
    <div className="w-screen h-screen bg-black">
      <div className="flex justify-end">
        <button onClick={onClosePopup}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
          >
            <path
              d="M22 38L38 22M22 22L38 38"
              stroke="#C8CCDB"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="">
        <RoomDetailSlidebar roomImages={roomImages} />
      </div>
    </div>
  );
}

export default ImageFullPopup;
