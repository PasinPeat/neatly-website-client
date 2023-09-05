interface Props {
  children: string;
}

function RoomCard({ children }: Props) {
  return (
    <div className="relative bg-black bg-opacity-30 pl-16 pb-20 flex items-end justify-start">
      <div className="absolute z-10">
        <div className="mb-3 font-noto-serif-display text-headline3 text-white">
          {children}
        </div>
        <div>
          <span className="text-white">Explore Room</span>
          <img
            className="ml-2 inline"
            alt="arrow"
            src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/arrow-white.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2Fycm93LXdoaXRlLnN2ZyIsImlhdCI6MTY5MzgzMTEyMSwiZXhwIjoxNzI1MzY3MTIxfQ.2Zd30troHxJvO6UpeEz7ykQGoNPcO-QGhwjg766-zeQ&t=2023-09-04T12%3A38%3A40.182Z"
          ></img>
        </div>
      </div>
    </div>
  );
}
export default RoomCard;
