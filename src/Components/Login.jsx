import { Link } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Login = () => {
  const axiosSecure = useAxiosSecure();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const number = form.elements.number.value;
    const password = form.elements.password.value;
    const data = { number, password };

    axiosSecure.post('/login', data)
      .then(data => {
        if(data) {
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Login Success",
                showConfirmButton: false,
                timer: 1500
              });
        }
      })
      .catch(error => {
        if(error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
        }
      });
  };

  return (
    <div>
      <h1 className="pt-12 text-4xl ms-2">
        <span className="font-bold">Log In</span> to your bKash account
      </h1>
      <form onSubmit={handleLogin} className="mt-4">
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
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input required name="password" type="password" className="grow" />
        </label>
        <label className="m-3 bg-[#bf8696] border-0 btn flex items-center gap-2">
          <button className="text-white hover:text-black">Login</button>
        </label>
        <p className="text-center">
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
