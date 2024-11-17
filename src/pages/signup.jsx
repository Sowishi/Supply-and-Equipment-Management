import { Button, HR } from "flowbite-react";
import {
  HiCalendar,
  HiLocationMarker,
  HiLockClosed,
  HiMail,
  HiOfficeBuilding,
  HiPhone,
  HiUser,
  HiUserAdd,
  HiUserGroup,
  HiUsers,
} from "react-icons/hi";
import SemInput from "../components/semInput";
import SemSelect from "../components/semSelect";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SemTitle from "../components/semTitle";
import useAddUser from "../hooks/useAddUser";
import { toast } from "react-toastify";
import useGetOffices from "../hooks/useGetOffices";

const Signup = () => {
  const [forms, setForms] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: "",
    contact: "",
    gender: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    role: "",
    office: "",
  });

  const [errors, setErrors] = useState({});
  const { addUser } = useAddUser();
  const { offices } = useGetOffices();
  const navigation = useNavigate();

  const validateField = (name, value) => {
    let errorMsg = "";

    switch (name) {
      case "firstName":
      case "lastName":
        if (!value) {
          errorMsg = `${
            name === "firstName" ? "First" : "Last"
          } Name is required.`;
        }
        break;
      case "contact":
        if (!/^\d{0,11}$/.test(value)) {
          errorMsg = "Contact number must be numeric and up to 11 digits.";
        } else if (value.length !== 11) {
          errorMsg = "Contact number must be exactly 11 digits.";
        }
        break;
      case "email":
        if (value && !/\S+@\S+\.\S+/.test(value)) {
          errorMsg = "Please enter a valid email address.";
        }
        break;
      case "password":
        if (value && value.length < 6) {
          errorMsg = "Password must be at least 6 characters.";
        }
        break;
      case "confirmPassword":
        if (value !== forms.password) {
          errorMsg = "Passwords do not match.";
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const handleUpdateForm = (event) => {
    const { name, value } = event.target;

    // Perform validation for the specific field being updated
    validateField(name, value);

    // Restrict contact number to 11 characters
    if (name === "contact" && value.length > 11) return;

    setForms((prevForms) => ({ ...prevForms, [name]: value }));
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    // Check for any remaining validation errors
    const formErrors = Object.values(errors).filter((error) => error);
    if (formErrors.length > 0) {
      toast.error("Please fix the form errors before submitting.");
      return;
    }

    // Submit the form if no validation errors
    const res = addUser(forms);
    if (res.error) {
      toast.error(res.message);
    } else {
      toast.promise(new Promise((resolve) => setTimeout(resolve, 3000)), {
        pending: "Signing up, please wait...",
        success: res.message,
      });
      setTimeout(() => {
        navigation("/users-management");
      }, 4000);
    }
  };

  return (
    <div className="w-100 min-h-screen bg-slate-950 flex justify-center items-center">
      <div className="content bg-slate-800 min-h-5/6 w-5/6 rounded-lg p-10 my-5">
        <SemTitle color={"white"} title={"Account Creation"} />
        <form
          className="forms flex flex-row flex-wrap lg:flex-nowrap mt-5"
          onSubmit={handleSubmitForm}
        >
          <div className="basis-full lg:basis-4/12 mr-5">
            <SemInput
              id={"firstName"}
              label={"First Name"}
              placeholder={"Enter your first name"}
              icon={HiUser}
              event={handleUpdateForm}
              name={"firstName"}
              error={errors.firstName}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}
            <SemInput
              id={"middleName"}
              label={"Middle Name (Optional)"}
              placeholder={"Enter your middle name"}
              icon={HiUser}
              event={handleUpdateForm}
              name={"middleName"}
            />
            <SemInput
              id={"lastName"}
              label={"Last Name"}
              placeholder={"Enter your last name"}
              icon={HiUser}
              event={handleUpdateForm}
              name={"lastName"}
              error={errors.lastName}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}
            <SemInput
              id={"birthDate"}
              label={"Birth Date"}
              icon={HiCalendar}
              type={"date"}
              event={handleUpdateForm}
              name={"birthDate"}
            />
            <SemInput
              id={"contact"}
              label={"Contact Number"}
              icon={HiPhone}
              addOn="+63"
              placeholder={"Enter your contact number"}
              event={handleUpdateForm}
              name={"contact"}
              maxLength={11}
              error={errors.contact}
            />
            {errors.contact && (
              <p className="text-red-500 text-sm">{errors.contact}</p>
            )}
          </div>
          <div className="basis-full lg:basis-4/12 mr-5">
            <SemSelect
              label={"Gender"}
              icon={HiUsers}
              id={"gender"}
              data={["Please select your gender", "Male", "Female", "Other"]}
              event={handleUpdateForm}
              name="gender"
            />

            <SemInput
              type={"email"}
              id={"email"}
              label={"Email"}
              placeholder={"Enter your email"}
              icon={HiMail}
              event={handleUpdateForm}
              name="email"
              error={errors.email}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
            <SemInput
              id={"address"}
              label={"Address"}
              placeholder={"Enter your address"}
              icon={HiLocationMarker}
              event={handleUpdateForm}
              name="address"
            />
            <SemInput
              id={"password"}
              label={"Password"}
              placeholder={"Enter your password"}
              icon={HiLockClosed}
              type={"password"}
              event={handleUpdateForm}
              name="password"
              color={errors.password ? "failure" : "info"}
              error={errors.password}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
            <SemInput
              id={"confirmPassword"}
              label={"Confirm Password"}
              placeholder={"Confirm your password"}
              icon={HiLockClosed}
              type={"password"}
              event={handleUpdateForm}
              name="confirmPassword"
              color={errors.confirmPassword ? "failure" : "info"}
              error={errors.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="basis-full lg:basis-4/12 mr-5">
            <SemSelect
              label={"User Type"}
              icon={HiUserGroup}
              id={"role"}
              data={[
                "Please select your role",
                "Department Supply Coordinator",
                "Admin",
              ]}
              event={handleUpdateForm}
              name="role"
            />
            {forms.role === "Department Supply Coordinator" && (
              <SemSelect
                offices={true}
                label={"Offices"}
                icon={HiOfficeBuilding}
                id={"role"}
                data={offices}
                event={handleUpdateForm}
                name="office"
              />
            )}

            <div className="submit-wrapper mt-10">
              <Button
                type="submit"
                gradientMonochrome="info"
                className="w-full "
              >
                <HiUserAdd className="mr-2 h-5 w-5" />
                Create Account
              </Button>
              <HR.Text />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
