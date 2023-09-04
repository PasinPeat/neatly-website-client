import React from "react";

function Footer() {
  return (
    <>
      <footer className="px-[120px] pt-[66px] bg-green-800">
        <footer className="footer flex justify-between  bg-green-800 text-base-content">
          <div className="w-[383px]">
            <div>
              <img
                src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/images/logo%20white.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pbWFnZXMvbG9nbyB3aGl0ZS5zdmciLCJpYXQiOjE2OTM1NjEyOTUsImV4cCI6MTcyNTA5NzI5NX0.rsBAS_CgCAh-wxK9ATUoNXQHhksFXHD2-ETG5s-Ruio&t=2023-09-01T09%3A41%3A34.755Z"
                alt="Logo"
              />
            </div>

            <p className=" text-headline5 text-white">Neatly Hotel</p>
            <p className="text-white">
              The best hotel for rising your experience
            </p>
          </div>
          <div className="w-[380px]">
            <span className="footer-title text-white">CONTACT</span>
            <div className="flex justify-start mt-6">
              <div className=" mr-4">
                <img
                  src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/icon-phone-green.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2ljb24tcGhvbmUtZ3JlZW4uc3ZnIiwiaWF0IjoxNjkzNTYwMjYzLCJleHAiOjE3MjUwOTYyNjN9.EtDhAzNiUzjh-hJfq5bwgCFMsSELecemnZiQ9EeWsfE&t=2023-09-01T09%3A24%3A23.716Z"
                  alt="Icon"
                />
              </div>
              <span className=" text-white font-normal">+66 99 999 9999</span>
            </div>
            <div className="flex justify-start mt-6">
              <div className=" mr-4">
                <img
                  src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/icon-email-green.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2ljb24tZW1haWwtZ3JlZW4uc3ZnIiwiaWF0IjoxNjkzNTYwNDg4LCJleHAiOjE3MjUwOTY0ODh9.Jx-TmU9pFrZEbX_-VONpWqx60ZF-N0PYCViSQBntQGY&t=2023-09-01T09%3A28%3A08.136Z"
                  alt="Icon"
                />
              </div>
              <span className=" text-white font-normal">
                contact@neatlyhotel.com
              </span>
            </div>
            <div className="flex justify-start mt-6">
              <div className=" mr-4">
                <img
                  src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/icon-location-green.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2ljb24tbG9jYXRpb24tZ3JlZW4uc3ZnIiwiaWF0IjoxNjkzNTYwNDYxLCJleHAiOjE3MjUwOTY0NjF9.Rd5nDZ7HAJZl4aZ1jpJFpKqm1wnUR9YsKol-3mwl7C4&t=2023-09-01T09%3A27%3A40.935Z"
                  alt="Icon"
                />
              </div>
              <span className=" text-white font-normal">
                188 Phaya Thai Rd, Thung Phaya Thai, <br />
                Ratchathewi, Bangkok 10400
              </span>
            </div>
          </div>
        </footer>
        <footer className="footer flex justify-between py-4 border-t-[2px] mt-[90px] border-green-700 bg-green-800 text-base-content ">
          <div className="md:place-self-center md:justify-self-end">
            <div className="grid grid-flow-col gap-4">
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="items-center grid-flow-col">
            <p>Copyright ©2022 Neatly Hotel</p>
          </div>
        </footer>
      </footer>
    </>
  );
}

export default Footer;
