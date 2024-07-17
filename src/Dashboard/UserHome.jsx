import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";


const UserHome = () => {
    const {user,loading} = useContext(AuthContext)
    if(loading) return <p>Loader.....</p>
    console.log(user)
    return (
        <div className="bg-white h-96 rounded-lg p-5">
            <div>
                <div className="bg-white text-[#D12053] p-3">
                    <h1>{user?.name}</h1>
                    <p>Balance: {user?.balance} Tk</p>
                </div>
                <div className="">
                    <Link to='/sendmoney' className="btn m-2 bg-[#E2136D] text-white hover:bg-[#E2136D]">Send Money</Link>
                    <button className="btn m-2 bg-[#E2136D] text-white hover:bg-[#E2136D]">Cash Out</button>
                    <button className="btn m-2 bg-[#E2136D] text-white hover:bg-[#E2136D]">Cash In</button>
                    <Link to='/transactions' className="btn m-2 bg-[#E2136D] text-white hover:bg-[#E2136D]">Transactions</Link>
                    <button className="btn m-2 bg-[#E2136D] text-white hover:bg-[#E2136D]">Sign Out</button>
                </div>
            </div>
            <Outlet/>
        </div>
    );
};

export default UserHome;