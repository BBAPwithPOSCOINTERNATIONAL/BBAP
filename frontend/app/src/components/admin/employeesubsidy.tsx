import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./approval.css";
import DetailPagination from "./datailpagination";
import { fetchPaymentDetails, PaymentDetail } from "../../api/hradminAPI";

function EmployeeSubsidy(): JSX.Element {
  const { employeeId } = useParams<{ employeeId?: string }>();
  const location = useLocation();
  const empName = location.state?.empName || "Default Name";
  const empNo = location.state?.empNo || "Default empNo";
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [transactions, setTransactions] = useState<PaymentDetail[]>([]);
  const [currentTransactions, setCurrentTransactions] = useState<
    PaymentDetail[]
  >([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const transactionsPerPage = 8;

  useEffect(() => {
    if (startDate && endDate && employeeId && !isNaN(parseInt(employeeId))) {
      fetchPaymentDetails(parseInt(employeeId), {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      })
        .then((response) => {
          setTransactions(
            response.data.paymentList.map((t) => ({
              totalPaymentAmount: t.totalPaymentAmount,
              useSubsidy: t.useSubsidy,
              selfPayment: t.selfPayment,
              paymentDate: t.paymentDate,
            }))
          );
        })
        .catch((error) =>
          console.error("Fetching transactions failed:", error)
        );
    }
  }, [startDate, endDate, employeeId]);

  useEffect(() => {
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction =
      indexOfLastTransaction - transactionsPerPage;
    setCurrentTransactions(
      transactions.slice(indexOfFirstTransaction, indexOfLastTransaction)
    );
  }, [currentPage, transactions, transactionsPerPage]);

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const handleDateChange = (start: string, end: string) => {
    if (start) setStartDate(start);
    if (end) setEndDate(end);
    setCurrentPage(1);
  };

  return (
    <div className="w-5/6 text-[30px]">
      <input
        type="date"
        value={startDate}
        onChange={(e) => handleDateChange(e.target.value, endDate)}
        className="font-hyemin-bold rounded-md mt-2 mr-4 text-[17px] w-50 p-1 px-4"
      />
      ~
      <input
        type="date"
        value={endDate}
        onChange={(e) => handleDateChange(startDate, e.target.value)}
        className="font-hyemin-bold rounded-md mt-2 ml-4 text-[17px] w-50 p-1 px-4"
      />
      <div
        className="font-hyemin-bold mt-4 mr-4 text-[20px] w-full"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <p>
          {empName}({empNo})
        </p>
        <p
          className="font-hyemin-bold text-[15px] mr-2"
          style={{ marginBottom: "-20px", paddingTop: "20px" }}
        >
          (단위: 원)
        </p>
      </div>
      <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-yellow-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6 text-[22px]">
              일자
            </th>
            <th scope="col" className="py-3 px-6 text-[22px]">
              총 결제금액
            </th>
            <th scope="col" className="py-3 px-6 text-[22px]">
              지원금
            </th>
            <th scope="col" className="py-3 px-6 text-[22px]">
              본인부담금
            </th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="py-4 px-6 text-[20px] text-center text-gray-500 dark:text-gray-400"
              >
                해당기간에 사용내역이 없습니다.
              </td>
            </tr>
          ) : (
            currentTransactions.map((transaction) => (
              <tr
                key={`${employeeId}`}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-indigo-500/10 cursor-pointer"
              >
                <td className="py-2 px-4 text-[17px]">
                  {transaction.paymentDate}
                </td>
                <td className="py-2 px-4 text-[17px]">
                  {transaction.totalPaymentAmount.toLocaleString()}
                </td>
                <td className="py-2 px-4 text-[17px]">
                  {transaction.useSubsidy.toLocaleString()}
                </td>
                <td className="py-2 px-4 text-[17px]">
                  {transaction.selfPayment.toLocaleString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <DetailPagination
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default EmployeeSubsidy;
