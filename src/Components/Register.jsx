import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()
  const handleRegistration = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    if(password.length === 5) {
        const data = { name, number, email, password };
    axiosSecure
      .post("/register", data)
      .then((data) => {
        if (data) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Registration Success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        form.reset();
        navigate('/')
      })
      .catch((err) => {
        if (err) {
          Swal.fire({
            icon: "error",
            title: `${err.message}`,
            text: "Something went wrong!",
          });
        }
      });
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Password must be 5 numbers!",
          });
    }
    
  };
  return (
    <div>
      <h1 className="pt-12 text-4xl ms-2">
        <span className="font-bold">Registration </span>
        your bKash account
      </h1>
      <form onSubmit={handleRegistration}>
        <label className="m-3 input input-bordered flex items-center gap-2">
          <input
            required
            name="name"
            type="text"
            className="grow"
            placeholder="Enter your name"
          />
        </label>
        <label className="m-3 input input-bordered flex items-center gap-2">
          <input
            required
            name="number"
            type="number"
            className="grow"
            placeholder="Enter your number"
          />
        </label>
        <label className="m-3 input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            required
            name="email"
            type="text"
            className="grow"
            placeholder="Enter your Email"
          />
        </label>

        <label className="m-3 input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input required name="password" type="password" className="grow" />
        </label>

        <label className="m-3 bg-[#bf8696] border-0 btn flex items-center gap-2">
          <button className="text-white hover:text-black">Register</button>
        </label>
        <p className="text-center">Do you have an account? <Link to='/'>Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
