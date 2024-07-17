

const TransactionsCard = ({transactions,index}) => {
    const {_id,senderName,recipientNumber,sendAmount} = transactions
    return (
     
      <tr className="bg-base-200">
      <th>{index+1}</th>
      <td>{senderName}</td>
      <td>{recipientNumber ? recipientNumber : 'N/A'}</td>
      <td>{sendAmount} Tk</td>
    </tr>
    );
};

export default TransactionsCard;