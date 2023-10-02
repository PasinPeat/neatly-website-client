<>
  <div className="flex justify-end mt-6">
    <button
      className="Button py-3 px-6"
      onClick={() => document.getElementById("my_modal_1").showModal()}
    >
      Delete Room
    </button>
  </div>
  <dialog id="my_modal_1" className="modal">
    <div className="modal-box bg-white rounded-sm">
      <h3 className="font-bold text-[1.2rem] text-black font-inter pb-6">
        Delete room
      </h3>
      <hr></hr>
      <p className="">Are you sure you want to delete this room?</p>
      <div className="modal-action">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <button
            className="font-inter text-body2 text-orange-500 bg-white h-[40px] border border-orange-500 justify-between items-center ml-3 rounded-[4px] px-6"
            onClick={(e) => deleteRoomHandler(e, singleRoom.room_id)}
          >
            Yes, I want to delete
          </button>
          <button className="font-inter text-body2 text-white bg-orange-600 h-[40px] justify-between items-center  ml-3 rounded-[4px] px-6 ">
            No, I don't
          </button>
        </form>
      </div>
    </div>
  </dialog>
</>;

<div className="fixed inset-0 flex justify-center items-center bg-opacity-25 bg-gray-900 z-50">
  <div className="w-[631px] h-[200px] bg-white flex flex-col font-inter z-60">
    <div className="flex justify-start items-center text-headline5 text-black pl-6 mt-3 mb-3 relative">
      Change Date
      <button className="absolute right-5" onClick={handlePopupClose}>
        <IoCloseOutline />
      </button>
    </div>
    <hr />
    <div className="pl-6 text-body1 text-gray-700 mt-4">
      Are you sure you want to change your check-in and check-out date?
    </div>
    <div className="flex justify-end space-x-3 mt-[30px] mr-5">
      <button
        className="w-[144px] h-[48px] text-orange-500 bg-white border border-orange-500 rounded-md hover:border-orange-400 hover:text-orange-400 active:border-orange-600 active:text-orange-600"
        onClick={handlePopupClose}
      >
        No, I don't
      </button>
      <button
        className="w-[227px] h-[48px] bg-orange-600 text-white rounded-md hover:bg-orange-500 active:bg-orange-700"
        onClick={() => {
          handlePopupClose();
          handleSubmit();
        }}
      >
        Yes, I want to change
      </button>
    </div>
  </div>
</div>;
