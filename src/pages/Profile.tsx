import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/authen";
import jwtDecode from "jwt-decode";

interface RouteParams {
  profileID: string;
  [key: string]: string | undefined;
}

function Profile() {
  const auth = useAuth();
  const params = useParams<RouteParams>();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    idNumber: "",
    birthDate: "",
    country: "",
    profile_image: "",
  });
  const [countries, setCountries] = useState<
    { value: string; label: string }[]
  >([]);
  const [avatars, setAvatars] = useState<{ [key: string]: File }>({});
  const [checkUser, setCheckUser] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  //validation
  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [idNumberError, setIdNumberError] = useState(false);
  const [birthDayError, setBirthDayError] = useState(false);
  const [countriesError, setCountriesError] = useState(false);

  // ID Number ซ้ำ
  const [idNumberValidError, setidNumberValidError] = useState(false);

  //invalid file
  const [invalidFile, setInvalidFile] = useState("");

  //loading
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const validateFullName = (name: string) => {
    if (typeof name !== "string" || name.trim() === "") {
      setFullNameError(true);
    } else {
      const names = name.trim().split(" ");
      if (
        names.length !== 2 ||
        !/^[a-zA-Z]*$/.test(names[0]) ||
        !/^[a-zA-Z]*$/.test(names[1])
      ) {
        setFullNameError(true);
      } else {
        setFullNameError(false);
      }
    }
  };
  //check age
  const validateBirthDay = (birthDate: string) => {
    const dob = new Date(birthDate);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - dob.getFullYear();

    return age >= 18;
  };

  // สร้างฟังก์ชันเพื่อตรวจสอบ ID Number
  const validateIDNumber = () => {
    if (!/^\d{13}$/.test(user.idNumber)) {
      setIdNumberError(true);
    } else {
      setIdNumberError(false);
    }
  };

  // ฟังก์ชันเช็ค country ว่าถูกเลือกหรือไม่
  const validateCountry = () => {
    if (!user.country) {
      setCountriesError(true);
    } else {
      setCountriesError(false);
    }
  };

  //check user
  const fetchAuth = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      const userDataFromToken = jwtDecode(token);
      const result = await axios.get(
        `http://localhost:4000/validUser/${userDataFromToken.user_id}`
      );
      setCheckUser(result);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    fetchAuth();
  }, []);

  useEffect(() => {
    validateCountry();
  }, [user.country]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uniqueId = Date.now();
    const file = event.target.files?.[0];

    if (file) {
      const allowedExtensions = [".jpg", ".jpeg", ".png"];
      const fileExtension = file.name.toLowerCase().slice(-4);
      if (
        file.size <= 2 * 1024 * 1024 &&
        allowedExtensions.includes(fileExtension)
      ) {
        setAvatars({
          ...avatars,
          [uniqueId.toString()]: file,
        });
        setInvalidFile("");
      } else {
        setInvalidFile(
          "Your file is invalid. Please select a file that is no larger than 2 MB and is .jpg, .jpeg, or .png"
        );
      }
    }
  };

  const handleRemoveImage = (avatarKey: string) => {
    const { [avatarKey]: deletedAvatar, ...newAvatars } = avatars;
    setAvatars(newAvatars);
  };

  const getProfileID = async () => {
    const token = localStorage.getItem("token");
    console.log(auth.state.userData);
    if (token) {
      try {
        const response = await axios.get(
          `http://localhost:4000/profile/${auth.state.userData.id}`
        );
        console.log(response.data.data);
        const data = response.data.data;
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    getProfileID();
  }, [checkUser]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Check full name
    validateFullName(user.fullName);
    validateIDNumber();
    validateCountry();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsLoading(true);

      // Check full name
      validateFullName(user.fullName);
      validateIDNumber();
      validateCountry();

      // Check email
      const queryParamsEmail = `?email=${user.email}`;
      const validEmail = await axios.put(
        `http://localhost:4000/validUser/email${queryParamsEmail}`
      );

      // Check idNumber
      const queryParamsIdNumber = `?idNumber=${user.idNumber}`;
      const validIdNumber = await axios.put(
        `http://localhost:4000/validUser/idNumber${queryParamsIdNumber}`
      );

      if (validEmail.data.data.length > 0) {
        setEmailError(true);
        setIsLoading(false);
        return;
      } else {
        setEmailError(false);
      }

      if (validIdNumber.data.data.length > 0) {
        setidNumberValidError(true);
        setIsLoading(false);
        return;
      } else {
        setidNumberValidError(false);
      }
      setIsLoading(false);
    };

    setIsLoading(true);

    // const isAgeValid = validateBirthDay(user.birthDate);
    // setBirthDayError(!isAgeValid);

    // Validate birthDate
    const isAgeValid = validateBirthDay(user.birthDate);
    if (!isAgeValid) {
      setBirthDayError(true);
      setIsLoading(false);
      return;
    } else {
      setBirthDayError(false);
    }

    // const data: Record<string, string> = {
    //   fullName: String(user.fullName),
    //   idNumber: String(user.idNumber),
    //   email: String(user.email),
    //   birthDate: String(user.birthDate),
    //   country: String(user.country),
    // };

    try {
      const formData = new FormData();
      formData.append("fullName", user.fullName);
      formData.append("email", user.email);
      formData.append("idNumber", user.idNumber);
      formData.append("birthDate", user.birthDate);
      formData.append("country", user.country);

      for (let avatarKey in avatars) {
        formData.append("avatar", avatars[avatarKey]);
      }
      if (
        fullNameError ||
        emailError ||
        birthDayError ||
        idNumberError ||
        countriesError
      ) {
        setIsLoading(false);
        return;
      } else {
        try {
          const response = await axios.put(
            `http://localhost:4000/profile/${params.profileID}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          // const response = await axios.delete(
          //   `http://localhost:4000/profile/${params.profileID}`,
          //   formData,
          //   {
          //     headers: { "Content-Type": "multipart/form-data" },
          //   }
          // );

          setIsLoading(false);
          setIsModalOpen(true);
          console.log(response.data);
        } catch (error) {
          // setIsLoading(false);
          setIsModalOpen(false);
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countryOptions: { value: string; label: string }[] = data.map(
          (country: { name: { common: string } }) => ({
            value: country.name.common,
            label: country.name.common,
          })
        );
        const sortedCountries = countryOptions.sort((a, b) =>
          a.label.localeCompare(b.label)
        );
        setCountries(sortedCountries);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center w-screen  bg-bg">
      <Navbar />
      <div className="flex flex-col w-[930px] ">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row justify-between  mt-[80px] items-center">
            <h1 className="font-noto-serif-display text-[68px]  font-medium text-green-800">
              Profile
            </h1>
            <button
              className="btn Button  w-[258px] h-[48px] "
              onClick={() => setIsModalOpen(true)}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner w-7 bg-orange-600"></span>
              ) : (
                "Update Profile"
              )}
            </button>
          </div>
          <p className="text-headline5 mt-[58px] mb-[38px] text-gray-600">
            Basic Information
          </p>
          <div className="relative">
            <label htmlFor="fullName">
              <p className="font-body1 text-gray-900 mb-[4px]">Full Name</p>
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              placeholder="Enter your name and lastname"
              className={`w-full Input mb-[4px] text-black  focus:outline-none focus:border-orange-500 ${
                fullNameError ? "border-[#B61515]" : "focus:outline-none"
              }`}
              value={user.fullName}
              onChange={(e) => {
                handleChange(e);
                validateFullName(e.target.value);
              }}
              required
            />
            {fullNameError && (
              <>
                <div className="absolute right-5 top-[50px] transform -translate-y-1/2">
                  <img
                    src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/123.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uLzEyMy5zdmciLCJpYXQiOjE2OTQxNjg2ODAsImV4cCI6MTcyNTcwNDY4MH0.p_CkT1rbBXUoggWNacczlqIqq5lHcnphLnOHkPXlDTQ&t=2023-09-08T10%3A24%3A33.645Z"
                    alt="Error Icon"
                    className="h-5 w-5"
                  />
                </div>
                <p className="text-body3  text-red absolute">
                  The full name should include both the first name and the last
                  name and cannot contain any numbers.
                </p>
              </>
            )}
          </div>
          <div className="grid grid-rows-2 grid-flow-col gap-x-[22px] mb-[38px]">
            <div className="relative">
              <label htmlFor="email">
                <p className="font-body1 text-gray-900 mt-[38px] mb-[4px]">
                  Email
                </p>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your Email"
                className={` Input w-[453px] mb-[4px]  text-black focus:outline-none focus:border-orange-500 ${
                  emailError ? "border-[#B61515]" : "focus:outline-none"
                }`}
                value={user.email}
                onChange={handleChange}
                required
              />
              {emailError && (
                <>
                  <div className="absolute  right-5 top-[90px] transform -translate-y-1/2">
                    <img
                      src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/123.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uLzEyMy5zdmciLCJpYXQiOjE2OTQxNjg2ODAsImV4cCI6MTcyNTcwNDY4MH0.p_CkT1rbBXUoggWNacczlqIqq5lHcnphLnOHkPXlDTQ&t=2023-09-08T10%3A24%3A33.645Z"
                      alt="Error Icon"
                      className="h-5 w-5"
                    />
                  </div>

                  <p className="text-body3 text-red absolute">
                    Email already in use. Please choose a different email.
                  </p>
                </>
              )}
            </div>
            <div className="relative">
              <label htmlFor="birthday">
                <p className="font-body1 text-gray-900 mt-[38px] mb-[4px]">
                  Date of Birth
                </p>
              </label>
              <input
                id="birthday"
                type="date"
                name="birthDate"
                placeholder="Select your date of birth"
                maxLength={10}
                className={`Input w-[453px] text-black focus:outline-none focus:border-orange-500 ${
                  birthDayError ? "border-[#B61515]" : "focus:outline-none"
                }`}
                value={user.birthDate}
                onChange={handleChange}
                required
              />
              {birthDayError && (
                <span className="text-body3 text-red absolute left-0 -bottom-5">
                  You must be at least 18 years old to register.
                </span>
              )}
            </div>
            <div className="relative">
              <label htmlFor="idNumber">
                <p className="font-body1 text-gray-900 mt-[38px] mb-[4px]">
                  ID Number
                </p>
              </label>
              <input
                id="idNumber"
                type="number"
                name="idNumber"
                pattern="\d*"
                placeholder="Enter your ID Number"
                className={`Input w-[453px] mb-[4px] text-black focus:outline-none focus:border-orange-500 ${
                  idNumberError || idNumberValidError
                    ? "border-[#B61515]"
                    : "focus:outline-none"
                }`}
                value={user.idNumber}
                onChange={handleChange}
                required
              />
              {idNumberError && (
                <>
                  <div className="absolute right-5 top-[90px] transform -translate-y-1/2">
                    <img
                      src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/123.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uLzEyMy5zdmciLCJpYXQiOjE2OTQxNjg2ODAsImV4cCI6MTcyNTcwNDY4MH0.p_CkT1rbBXUoggWNacczlqIqq5lHcnphLnOHkPXlDTQ&t=2023-09-08T10%3A24%3A33.645Z"
                      alt="Error Icon"
                      className="h-5 w-5"
                    />
                  </div>
                  <p className="text-body3 text-red absolute">
                    ID Number must be 13 digits.
                  </p>
                </>
              )}
              {idNumberValidError && (
                <>
                  <div className="absolute right-5 top-[90px] transform -translate-y-1/2">
                    <img
                      src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/123.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uLzEyMy5zdmciLCJpYXQiOjE2OTQxNjg2ODAsImV4cCI6MTcyNTcwNDY4MH0.p_CkT1rbBXUoggWNacczlqIqq5lHcnphLnOHkPXlDTQ&t=2023-09-08T10%3A24%3A33.645Z"
                      alt="Error Icon"
                      className="h-5 w-5"
                    />
                  </div>

                  <p className="text-body3 text-red absolute">
                    ID Number already in use. Please choose a different ID
                    Number.
                  </p>
                </>
              )}
            </div>
            <div className="relative">
              <label htmlFor="country">
                <p className="font-body1 text-gray-900 text-start mt-[38px] mb-[4px]">
                  Country
                </p>
              </label>
              <select
                name="country"
                id="country"
                value={user.country}
                onChange={(e) => {
                  setUser({ ...user, country: e.target.value });
                }}
                className={` Input w-[453px] mb-[4px] text-black  h-[53px] focus:outline-none focus:border-orange-500 ${
                  countriesError ? "border-[#B61515]" : "focus:outline-none"
                }`}
              >
                <option value="" className="w-full Input mb-[38px]  text-black">
                  Select your country
                </option>
                {countries.map((country) => (
                  <option
                    key={country.value}
                    value={country.value}
                    className="w-full Input mb-[38px] text-black"
                  >
                    {country.label}
                  </option>
                ))}
              </select>

              {countriesError && (
                <span className="text-body3  text-red absolute left-0 -bottom-5">
                  Please select your country.
                </span>
              )}
            </div>
          </div>
          <div className="h-[2px] bg-gray-300 mb-[38px]" />

          <div className="flex flex-col items-start relative">
            <p className="text-headline5 mb-[38px] text-gray-600 ">
              Profile Picture
            </p>
            <div className="flex flex-row  mb-[38px]">
              {Object.keys(avatars).length === 0 ? (
                <div>
                  <label htmlFor="upload">
                    <div
                      className={`w-[197px] h-[167px] bg-gray-200 rounded mb-[25px] flex flex-col justify-center items-center border-2 hover:border-orange-500 active:border-orange-700 ${
                        invalidFile ? "border-[#B61515]" : "focus:outline-none"
                      }`}
                    >
                      {user.profile_image && (
                        <img
                          className="w-[197px] h-[167px]  rounded object-cover"
                          src={user.profile_image}
                          alt="Profile"
                        />
                      )}
                      <input
                        id="upload"
                        name="avatar"
                        type="file"
                        onChange={handleFileChange}
                        disabled={Object.keys(avatars).length > 0}
                        accept="image/jpg, image/jpeg, image/png"
                        hidden
                      />
                      <button
                        className="h-[24px] w-[24px] rounded-full bg-[#B61515] flex items-center justify-center absolute top-[60px] left-[180px] hover:bg-orange-700 active:bg-orange-800"
                        onClick={() => handleRemoveImage(avatarKey)}
                      >
                        X
                      </button>
                    </div>
                  </label>
                </div>
              ) : null}
              {Object.keys(avatars).map((avatarKey) => {
                const file = avatars[avatarKey];
                return (
                  <div
                    key={avatarKey}
                    className="w-[197px] h-[167px] mb-[25px] relative"
                  >
                    <img
                      className="w-[197px] h-[167px] rounded object-cover"
                      src={URL.createObjectURL(file)}
                      alt={file.name}
                    />
                    <button
                      className="h-[24px] w-[24px] rounded-full bg-[#B61515] flex items-center justify-center absolute -top-2 -right-2 hover:bg-orange-700 active:bg-orange-800"
                      onClick={() => handleRemoveImage(avatarKey)}
                    >
                      X
                    </button>
                  </div>
                );
              })}
              {Object.keys(avatars).length === 0 && (
                <div>
                  <label htmlFor="upload">
                    <div
                      className={`w-[197px] h-[167px] bg-gray-200 rounded mb-[25px] flex flex-col justify-center items-center border-2 hover:border-orange-500 active:border-orange-700 ${
                        invalidFile ? "border-[#B61515]" : "focus:outline-none"
                      }`}
                    >
                      <p className="text-orange-500 text-[30px] font-medium text-center">
                        +
                      </p>
                      <p className="text-orange-500 text-sm font-medium text-center">
                        Upload photo
                      </p>
                      <input
                        id="upload"
                        name="avatar"
                        type="file"
                        onChange={handleFileChange}
                        disabled={Object.keys(avatars).length > 0}
                        accept="image/jpg, image/jpeg, image/png"
                        hidden
                      />
                    </div>
                  </label>
                </div>
              )}
              {/* Invalid File */}
              <div className="h-[35px]">
                {invalidFile && (
                  <p className="text-body3 text-red absolute left-0 mt-[180px]">
                    {invalidFile}
                  </p>
                )}
              </div>
            </div>
          </div>
        </form>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-box flex flex-col items-center  shadow-xl w-[400px] h-[440px]">
              <img
                src="https://kewjjbauwpznfmeqbdpp.supabase.co/storage/v1/object/sign/dev-storage/icon/checkmark-removebg-preview.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJkZXYtc3RvcmFnZS9pY29uL2NoZWNrbWFyay1yZW1vdmViZy1wcmV2aWV3LnBuZyIsImlhdCI6MTY5NDY4MDQ2NCwiZXhwIjoxNzI2MjE2NDY0fQ.M_qXd-pEhjGoD8hIY42PgJgRQsxNmy0O8PsfV9ErH_0&t=2023-09-14T08%3A34%3A24.444Z"
                alt="Check-Mark"
                className="h-[150px] w-[150px]"
              />
              <h1 className="text-headline3 font-medium text-greencheck">
                Success!
              </h1>
              <p className="py-4 font-bold text-[20px]  text-center">
                Your profile details have <br /> been updated successfully.{" "}
                <br />
              </p>
              <div className="modal-action">
                <button
                  className="btn w-[200px] h-[50px] bg-greencheck rounded-full hover:bg-greenhover  text-headline4  text-white "
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  OKAY
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
