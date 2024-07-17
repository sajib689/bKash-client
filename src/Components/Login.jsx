import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Login = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const number = form.elements.number.value;
    const password = form.elements.password.value;
    const data = { number, password };

    try {
      const response = await axiosSecure.post('/login', data);
      login(response.data);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Login Success",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/home');
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!"
      });
    }
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
          <input required placeholder="Enter your password" name="password" type="password" className="grow" />
        </label>
        <label className="m-3 bg-[#bf8696] border-0 btn flex items-center gap-2">
          <button className="text-white hover:text-black">Login</button>
        </label>
        <p className="text-center">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
