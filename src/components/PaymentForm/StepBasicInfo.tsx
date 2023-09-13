import BookingDetail from "./BookingDetail";
import BookingNote from "./BookingNote";

function BasicInfo() {
  return (
    <div className="flex gap-6">
      <div className="w-[740px] bg-white border border-gray-300 p-10">
        <p className="text-gray-600 text-headline5 pb-10">BasicInfo</p>
        <form className="flex flex-col gap-10">
          <div>
            <label htmlFor="fname">
              <p className="font-body1 text-gray-900">Full Name</p>
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              // value={fullName}
              className="w-full InputSuccess"
              disabled
            />
          </div>

          <div>
            <label htmlFor="email">
              <p className="font-body1 text-gray-900 text-start">Email</p>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              // value={email}
              className="w-full InputSuccess"
              disabled
            />
          </div>

          <div>
            <label htmlFor="birthDate">
              <p className="font-body1 text-gray-900 text-start">
                Date of Birth
              </p>
            </label>
            <input
              type="date"
              id="birthDate"
              // value={birthDay}
              name="birthDate"
              className="w-full InputSuccess"
              disabled
            />
          </div>

          <div>
            <label htmlFor="idNumber">
              <p className="font-body1 text-gray-900 text-start">ID Number</p>
            </label>
            <input
              type="tel"
              id="idNumber"
              name="idNumber"
              // value={idNumber}
              className="w-full InputSuccess"
              disabled
            />
          </div>

          <div>
            <label htmlFor="country">
              <p className="font-body1 text-gray-900 text-start">Country</p>
            </label>
            <select
              name="country"
              id="country"
              // value={country}
              className="w-full InputSuccess"
              disabled
            >
              <option value="">Select your country</option>
            </select>
          </div>
        </form>
      </div>
      <div className="flex flex-col gap-4">
        <BookingDetail />
        <BookingNote />
      </div>
    </div>
  );
}

export default BasicInfo;
