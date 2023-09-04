function Rooms() {
  return (
    <div className="py-28 px-40 flex flex-col items-center justify-center bg-white">
      <div className="font-noto-serif-display text-green-800 text-headline3">
        Rooms & Suits
      </div>
      <div className="mt-[72px] w-full bg-green-200 grid gap-6 grid-rows-4 grid-cols-5 ">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </div>
    </div>
  );
}

export default Rooms;
