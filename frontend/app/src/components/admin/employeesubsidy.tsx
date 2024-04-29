import { useState } from "react";
import { useParams } from "react-router-dom";

interface Employee {
  employeeId: number;
  name: string;
  location: string;
  rank: string;
  department: string;
  transactions: Transaction[];
}

interface Transaction {
  date: string; // "YYYY-MM-DD" 포맷
  totalPayment: number;
  subsidy: number;
  personalPayment: number;
}

const employees: Employee[] = [
  {
    employeeId: 1,
    name: "홍길동",
    location: "서울역 그랜드센트럴",
    rank: "부장",
    department: "섹션리더",
    transactions: [
      {
        date: "2024-04-01",
        totalPayment: 200000,
        subsidy: 150000,
        personalPayment: 50000,
      },
      {
        date: "2024-04-15",
        totalPayment: 300000,
        subsidy: 225000,
        personalPayment: 75000,
      },
    ],
  },
];

function EmployeeSubsidy(): JSX.Element {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { employeeId } = useParams();
  const filteredTransactions = employees.flatMap((employee) =>
    employee.transactions
      .filter(
        (transaction) =>
          transaction.date >= startDate && transaction.date <= endDate
      )
      .map((t) => ({
        ...t,
        name: employee.name,
        id: employee.employeeId,
      }))
  );

  return (
    <div className="w-5/6 text-[30px]">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="font-hyemin-bold mt-2 mr-4 text-[17px] w-40"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="font-hyemin-bold mt-2 mr-4 text-[17px] w-40"
      />
      <div className="font-hyemin-bold mt-2 mr-4 text-[20px] w-40">
        사원번호 :{employeeId}
      </div>
      <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-yellow-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6 text-[20px]">
              사원명
            </th>
            <th scope="col" className="py-3 px-6 text-[20px]">
              일자
            </th>
            <th scope="col" className="py-3 px-6 text-[20px]">
              총 결제금액
            </th>
            <th scope="col" className="py-3 px-6 text-[20px]">
              지원금
            </th>
            <th scope="col" className="py-3 px-6 text-[20px]">
              본인부담금
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map((transaction) => (
            <tr
              key={`${transaction.id}-${transaction.date}`}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-indigo-500/10"
            >
              <td className="py-4 px-6 text-[18px]">{transaction.name}</td>
              <td className="py-4 px-6 text-[18px]">{transaction.date}</td>
              <td className="py-4 px-6 text-[18px]">
                {transaction.totalPayment.toLocaleString()}
              </td>
              <td className="py-4 px-6 text-[18px]">
                {transaction.subsidy.toLocaleString()}
              </td>
              <td className="py-4 px-6 text-[18px]">
                {transaction.personalPayment.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeSubsidy;
