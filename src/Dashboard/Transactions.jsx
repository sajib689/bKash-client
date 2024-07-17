import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";
import TransactionsCard from "../Components/TransactionsCard";

const Transactions = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  console.log(history);
  useEffect(() => {
    if (user?.number) {
      axiosSecure
        .get(`/transactions?${user?.number}`)
        .then((response) => {
          setHistory(response.data);
        })
        .catch((error) => {
          console.error("Error fetching transactions:", error);
        });
    }
  }, [axiosSecure, user?.number]);

  if (loading) return <p>Loader......</p>;

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="bg-base-200">
            <th>No</th>
            <th>Name</th>
            <th>Recipient</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {history.map((transactions,index) => (
            <TransactionsCard
              key={transactions._id}
              index={index}
              transactions={transactions}
            ></TransactionsCard>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
