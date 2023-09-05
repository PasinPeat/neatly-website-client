function Reviews() {
  return (
    <div className="py-28 flex flex-col items-center justify-center bg-green-200">
      <div className="mb-6 font-noto-serif-display text-green-800 text-headline2">
        Our Customer Says
      </div>
      <div className="flex items-center">
        <div className="relative w-14 h-14 rounded-full border border-orange-500">
          <img
            className="absolute scale-x-[-1] top-[30%] left-[30%] h-6 w-6"
            alt="arrow"
            src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/arrow-orange.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2Fycm93LW9yYW5nZS5zdmciLCJpYXQiOjE2OTM3MTIxNTUsImV4cCI6MTcyNTI0ODE1NX0.iSTnxKpsHLfSubAPNFDCaY_rieXunmVFUY7b2bpwfcc&t=2023-09-03T03%3A35%3A54.613Z"
          ></img>
        </div>

        <div className="px-16 py-16 max-w-[840px]">
          “lorem ipsum dolor sit amet minim mollit non deserunt ullamco est sit
          aliqua dolor do amet sint, velit official consequat duis enim velit
          mollit, exercitation minim amet consequat sunt.”
        </div>

        <div className="relative w-14 h-14 rounded-full border border-orange-500">
          <img
            className="absolute top-[30%] left-[30%] h-6 w-6"
            alt="arrow"
            src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/arrow-orange.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2Fycm93LW9yYW5nZS5zdmciLCJpYXQiOjE2OTM3MTIxNTUsImV4cCI6MTcyNTI0ODE1NX0.iSTnxKpsHLfSubAPNFDCaY_rieXunmVFUY7b2bpwfcc&t=2023-09-03T03%3A35%3A54.613Z"
          ></img>
        </div>
      </div>

      <div className="flex items-center">
        <img
          className="w-8 mr-4 rounded-full"
          alt="customer-image"
          src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/avatar1.jfif?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2F2YXRhcjEuamZpZiIsImlhdCI6MTY5MzcxMTAyMSwiZXhwIjoxNzI1MjQ3MDIxfQ.qtzzYYCZXiVQfReMfoNNvpf-dYZRf1o06BqQehBQSjA&t=2023-09-03T03%3A17%3A00.451Z"
        />
        <span className="text-gray-600">Katherine, Company®</span>
      </div>
    </div>
  );
}

export default Reviews;
