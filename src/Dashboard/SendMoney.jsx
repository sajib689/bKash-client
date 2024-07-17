import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from './../Hooks/useAxiosSecure';
import { useNavigate } from "react-router-dom";

const SendMoney = () => {
    const { user, loading, setUser } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [balance, setBalance] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.number) {
            axiosSecure.get(`/register?number=${user?.number}`)
                .then(response => {
                    setBalance(response.data.balance);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, [axiosSecure, user?.number]);

    const handleSendMoney = async (e) => {
        e.preventDefault();
        const form = e.target;
        const recipientNumber = form.elements.sendNumber.value;
        const sendAmount = parseInt(form.elements.sendamount.value, 10);

        if (sendAmount > 49) {
            if (balance >= sendAmount) {
                try {
                    const response = await axiosSecure.post(`/update-balance`, {
                        senderNumber: user.number,
                        recipientNumber,
                        sendAmount
                    });

                    const newSenderBalance = response.data.newSenderBalance;
                    setBalance(newSenderBalance);
                    setUser({ ...user, balance: newSenderBalance });
                    axiosSecure.post(`/transactions`, {
                      senderName: user?.name,
                      senderNumber: user?.number,
                      recipientNumber: recipientNumber,
                      sendAmount: sendAmount,

                    })
                    .then(data => {
                      console.log(data)
                    })
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Money sent successfully!",
                    });
                    navigate('/home');
                } catch (error) {
                    console.error('Error updating balance:', error);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to send money. Please try again later.",
                    });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Insufficient Balance",
                    text: "You do not have enough balance to send this amount.",
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please enter an amount more than 50 Tk",
            });
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <form onSubmit={handleSendMoney} className="bg-white p-2 rounded-lg flex flex-col justify-center items-center">
            <input
                type="text"
                name="sendNumber"
                placeholder="Type number here"
                className="input mb-2 input-bordered w-full max-w-xs"
                required
            />
            <input
                type="text"
                name="sendamount"
                placeholder="Type amount here"
                className="input input-bordered w-full max-w-xs"
                required
            />
            <button className="btn w-full max-w-xs mt-3 mb-6 bg-[#E2136D] hover:bg-[#E2136D] text-white">
                Send Money
            </button>
        </form>
    );
};

export default SendMoney;
