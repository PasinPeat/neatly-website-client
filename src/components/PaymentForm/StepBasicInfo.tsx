import BookingDetail from "./BookingDetail";
import BookingNote from "./BookingNote";
import ButtonNavigation from "./ButtonNavigation";
import { useAuth } from "../../contexts/authen.jsx";

function BasicInfo({ steps, activeStep, setActiveStep }) {
  const auth = useAuth();

  let fullName;
  let email;
  let dateOfBirth;
  let idNumber;
  let country;

  if (auth.isAuthenticated && auth.state.userData) {
    fullName = auth.state.userData.fullName;
    email = auth.state.userData.email;
    dateOfBirth = auth.state.userData.birthDate;
    idNumber = auth.state.userData.credit_card_id;
    country = auth.state.userData.country;
  }
  // console.log(auth.state.userData);

  return (
    <div className="flex gap-6">
      <div className="w-[740px] bg-white border border-gray-300 p-10">
        <p className="text-gray-600 text-headline5 pb-10">Basic Information</p>
        <form className="flex flex-col gap-10">
          <div>
            <label htmlFor="fname">
              <p className="font-body1 text-gray-900">Full Name</p>
            </label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={fullName}
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
              value={email}
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
              value={dateOfBirth}
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
              value={idNumber}
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
              value={country}
              className="w-full InputSuccess"
              disabled
            >
              <option value={country}>{country}</option>
            </select>
          </div>
        </form>
        <ButtonNavigation
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          steps={steps}
        />
      </div>
      <div className="flex flex-col gap-4">
        <BookingDetail />
        <BookingNote />
      </div>
    </div>
  );
}

export default BasicInfo;