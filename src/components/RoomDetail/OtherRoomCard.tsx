function OtherRoomCard() {
  return (
    <div className="grid flex-grow card  rounded-md h-80 relative bg-black bg-cover hover: bg-[url('https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/deluxe?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvZGVsdXhlIiwiaWF0IjoxNjkzNTU1OTQ3LCJleHAiOjE3MjUwOTE5NDd9.S9WtQwiVa1DhJg2wVZ9Yeb0zLfdHq5P2LeBg2DIvdLc&t=2023-09-01T08%3A12%3A26.986Z')]">
      <div className=" w-36 h-[103px] absolute bottom-12 left-16 ">
        <h1 className="text-white text-headline4 font-noto-serif-display mb-2">
          Deluxe
        </h1>
        <span className="text-white font-semibold">
          Explore Room{" "}
          <img
            className="ml-2 inline"
            alt="arrow"
            src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/arrow-white.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2Fycm93LXdoaXRlLnN2ZyIsImlhdCI6MTY5MzgzMTEyMSwiZXhwIjoxNzI1MzY3MTIxfQ.2Zd30troHxJvO6UpeEz7ykQGoNPcO-QGhwjg766-zeQ&t=2023-09-04T12%3A38%3A40.182Z"
          ></img>
        </span>
      </div>
    </div>
  );
}

export default OtherRoomCard;
