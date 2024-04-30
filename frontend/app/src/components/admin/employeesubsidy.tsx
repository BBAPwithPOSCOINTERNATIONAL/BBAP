import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./approval.css";
import DetailPagination from "./datailpagination";

interface Employee {
  employeeId: number;
  name: string;
  workplace: string;
  position: string;
  department: string;
  transactions: Transaction[];
}

interface Transaction {
  no: number;
  date: string; // "YYYY-MM-DD" 포맷
  totalPayment: number;
  subsidy: number;
  personalPayment: number;
}

const employees: Employee[] = [
  {
    employeeId: 101,
    name: "홍길동",
    workplace: "서울역 그랜드센트럴",
    position: "부장",
    department: "섹션리더",
    transactions: [
      {
        no: 1,
        date: "2024-04-07",
        totalPayment: 200000,
        subsidy: 150000,
        personalPayment: 50000,
      },
      {
        no: 2,
        date: "2024-04-15",
        totalPayment: 300000,
        subsidy: 225000,
        personalPayment: 75000,
      },
      {
        no: 3,
        date: "2024-04-15",
        totalPayment: 300000,
        subsidy: 225000,
        personalPayment: 75000,
      },
      {
        no: 4,
        date: "2024-04-15",
        totalPayment: 300000,
        subsidy: 225000,
        personalPayment: 75000,
      },
      {
        no: 5,
        date: "2024-04-15",
        totalPayment: 300000,
        subsidy: 225000,
        personalPayment: 75000,
      },
      {
        no: 6,
        date: "2024-04-15",
        totalPayment: 300000,
        subsidy: 225000,
        personalPayment: 75000,
      },
      {
        no: 7,
        date: "2024-04-15",
        totalPayment: 300000,
        subsidy: 225000,
        personalPayment: 75000,
      },
      {
        no: 8,
        date: "2024-04-15",
        totalPayment: 300000,
        subsidy: 225000,
        personalPayment: 75000,
      },
      {
        no: 9,
        date: "2024-04-15",
        totalPayment: 300000,
        subsidy: 225000,
        personalPayment: 75000,
      },
      {
        no: 10,
        date: "2024-04-15",
        totalPayment: 300000,
        subsidy: 225000,
        personalPayment: 75000,
      },
      {
        no: 11,
        date: "2024-04-15",
        totalPayment: 300000,
        subsidy: 225000,
        personalPayment: 75000,
      },
      {
        no: 12,
        date: "2024-04-15",
        totalPayment: 300000,
        subsidy: 225000,
        personalPayment: 75000,
      },
      {
        no: 13,
        date: "2024-04-15",
        totalPayment: 300000,
        subsidy: 225000,
        personalPayment: 75000,
      },
      {
        no: 14,
        date: "2024-04-15",
        totalPayment: 300000,
        subsidy: 225000,
        personalPayment: 75000,
      },
      {
        no: 15,
        date: "2024-04-15",
        totalPayment: 300000,
        subsidy: 225000,
        personalPayment: 75000,
      },
      {
        no: 16,
        date: "2024-04-15",
        totalPayment: 300000,
        subsidy: 225000,
        personalPayment: 75000,
      },
      {
        no: 17,
        date: "2024-04-15",
        totalPayment: 300000,
        subsidy: 225000,
        personalPayment: 75000,
      },
    ],
  },
];

function EmployeeSubsidy(): JSX.Element {
  const { employeeId } = useParams<{ employeeId: string }>();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [currentTransactions, setCurrentTransactions] = useState<Transaction[]>(
    []
  );

  // 페이지 당 열의 개수
  const transactionsPerPage = 8;
  useEffect(() => {
    const employee = employees.find(
      (emp) => emp.employeeId.toString() === employeeId
    );
    if (employee) {
      const newFilteredTransactions = employee.transactions.filter(
        (transaction) =>
          transaction.date >= startDate && transaction.date <= endDate
      );
      setFilteredTransactions(newFilteredTransactions);
    }
  }, [startDate, endDate, employeeId]);

  useEffect(() => {
    // 페이지에 따른 거래 내역 계산
    const indexOfLastTransaction = currentPage * transactionsPerPage;
    const indexOfFirstTransaction =
      indexOfLastTransaction - transactionsPerPage;
    const newCurrentTransactions = filteredTransactions.slice(
      indexOfFirstTransaction,
      indexOfLastTransaction
    );

    setCurrentTransactions(newCurrentTransactions); // 이 부분에서 배열을 새로 설정하므로 누적 문제가 발생하지 않아야 합니다.
  }, [currentPage, filteredTransactions, transactionsPerPage]);

  const totalPages = Math.ceil(
    filteredTransactions.length / transactionsPerPage
  );

  const handleDateChange = (start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
    setCurrentPage(1);
  };

  return (
    <div className="w-5/6 text-[30px] ">
      {/* 시작날짜 */}
      <input
        type="date"
        value={startDate}
        onChange={(e) => handleDateChange(e.target.value, endDate)}
        className="font-hyemin-bold rounded-md mt-2 mr-4 text-[17px] w-50 p-1 px-4"
      />
      ~{/* 끝 날짜 */}
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
        <p>사원 : 사원명 ({employeeId})</p>
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
                key={`${transaction.no}`}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-indigo-500/10 cursor-pointer"
              >
                <td className="py-2 px-4 text-[17px]">{transaction.date}</td>
                <td className="py-2 px-4 text-[17px]">
                  {transaction.totalPayment.toLocaleString()}
                </td>
                <td className="py-2 px-4 text-[17px]">
                  {transaction.subsidy.toLocaleString()}
                </td>
                <td className="py-2 px-4 text-[17px]">
                  {transaction.personalPayment.toLocaleString()}
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
