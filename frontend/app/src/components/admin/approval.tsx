import React, { useState } from "react";
import "./approval.css";

interface Employee {
  employeeId: number;
  name: string;
  workplace: string;
  position: string;
  department: string;
  transactions: Transaction[];
}

interface Transaction {
  date: string; // "YYYY-MM-DD" format
  totalPayment: number;
  subsidy: number;
  personalPayment: number;
}

const employees: Employee[] = [
  {
    employeeId: 1,
    name: "홍길동",
    workplace: "서울역 그랜드센트럴",
    position: "부장",
    department: "발전사업",
    transactions: [
      {
        date: "2024-04-07",
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
  {
    employeeId: 2,
    name: "김철수",
    workplace: "서울역 그랜드센트럴",
    position: "차장",
    department: "자원개발",
    transactions: [
      {
        date: "2024-04-07",
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

  {
    employeeId: 3,
    name: "이영희",
    workplace: "송도본사",
    position: "과장",
    department: "에너지정책",
    transactions: [
      {
        date: "2024-04-07",
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
  {
    employeeId: 4,
    name: "박영진",
    workplace: "포스코센터",
    position: "과장",
    department: "경영지원",
    transactions: [
      {
        date: "2024-04-07",
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
  {
    employeeId: 5,
    name: "조혜원",
    workplace: "포스코센터",
    position: "과장",
    department: "기획/재무",
    transactions: [
      {
        date: "2024-04-07",
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

function Approve(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [rank, setRank] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalAllApprove = () => {
    setIsModalOpen(true);
  };

  const handleApprove = () => {
    if (selectedEmployees.length === 0) {
      alert("선택된 항목이 없습니다");
    } else if (selectedEmployees.length === employees.length) {
      openModalAllApprove(); // 모두 승인 모달
    } else {
      openModal(); // 선택 승인 모달
    }
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setLocation(event.target.value);
  };

  const handleRankChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setRank(event.target.value);
  };

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setDepartment(event.target.value);
  };

  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]);

  const handleCheckboxChange = (employeeId: number) => {
    if (selectedEmployees.includes(employeeId)) {
      setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId));
    } else {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
  };
  const handleAllCheckboxChange = () => {
    const allEmployeeIds = employees.map((employee) => employee.employeeId);
    if (selectedEmployees.length === allEmployeeIds.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(allEmployeeIds);
    }
  };
  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      employee.workplace.includes(location) &&
      employee.position.includes(rank) &&
      employee.department.includes(department)
    );
  });

  return (
    <div className="w-[61rem] text-[30px] ">
      <input
        className="font-hyemin-bold mt-2 mr-4 text-[30px] w-40 focus:ring-2 focus:ring-yellow-500 focus:outline-none appearance-none text-lg leading-10 text-slate-900 placeholder-slate-400 rounded-md pl-3 ring-2 ring-slate-300 shadow-sm"
        type="text"
        placeholder="사원명"
        value={searchTerm}
        onChange={handleSearch}
      />
      <select
        className="font-hyemin-bold mt-2 mr-4 text-[30px] w-1/5 focus:ring-2 focus:ring-yellow-500 focus:outline-none appearance-none text-lg leading-10 text-slate-900 placeholder-slate-400 rounded-md pl-3 ring-2 ring-slate-300 shadow-sm"
        value={location}
        onChange={handleLocationChange}
      >
        <option value="">근무지</option>
        <option value="송도본사">송도본사</option>
        <option value="포스코센터">포스코센터 </option>
        <option value="서울역 그랜드센트럴">서울역 그랜드센트럴</option>
        <option value="청라 인천발전소">청라 인천발전소 </option>
        <option value="광양 LNG터미널">광양 LNG터미널 </option>
      </select>
      <select
        className="font-hyemin-bold mt-2 mr-4 text-[17px] w-44 focus:ring-2 focus:ring-yellow-500 focus:outline-none appearance-none text-lg leading-10 text-slate-900 placeholder-slate-400 rounded-md pl-3 ring-2 ring-slate-300 shadow-sm"
        value={rank}
        onChange={handleRankChange}
      >
        <option value="">부서</option>
        <option value="영업">영업</option>
        <option value="자원개발">자원개발</option>
        <option value="LNG사업">LNG사업</option>
        <option value="발전사업">발전사업</option>
        <option value="사업개발">사업개발</option>
        <option value="터미널사업">터미널사업</option>
        <option value="기획/재무">기획/재무</option>
        <option value="에너지정책">에너지정책</option>
        <option value="경영지원">경영지원</option>
      </select>
      <select
        className="font-hyemin-bold mt-2 mr-2 text-[17px] w-40 focus:ring-2 focus:ring-yellow-500 focus:outline-none appearance-none text-lg leading-10 text-slate-900 placeholder-slate-400 rounded-md pl-3 ring-2 ring-slate-300 shadow-sm"
        value={department}
        onChange={handleDepartmentChange}
      >
        <option value="">직급</option>
        <option value="사원">사원</option>
        <option value="대리">대리</option>
        <option value="과장">과장</option>
        <option value="차장">차장</option>
        <option value="리더">리더</option>
        <option value="부장">부장</option>
      </select>
      <button
        onClick={handleApprove}
        className="fixed right-8 top-[117px] font-hyemin-bold text-[18px] bg-[#163760] text-white w-36 p-2 rounded-md m-5"
      >
        {selectedEmployees.length === employees.length
          ? "모두 승인"
          : "선택 승인"}
      </button>
      {/* 버튼누르면 열리는 모달 */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-light-primary-color text-white rounded-lg p-12 text-[40px]">
            <p>
              {selectedEmployees.length === employees.length
                ? "전체 승인 하시겠습니까?"
                : "선택한 항목을 승인하시겠습니까?"}
            </p>
            <p className=" text-[30px] text-center mt-4">
              승인하시면 조회 페이지에서
              <br /> 목록 조회만 가능합니다.
            </p>
            <div className="flex justify-center mt-8">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 px-8 py-2 rounded mr-16 text-[30px]"
              >
                취소
              </button>
              <button
                onClick={() => {
                  // 여기에 승인 처리 로직 추가
                  closeModal(); // 모달 닫기
                }}
                className="text-white bg-[#163760] px-8 py-2  rounded text-[30px] "
              >
                승인
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 모달 끝*/}

      <table
        className="mt-4 text-sm text-left text-gray-500 dark:text-gray-400"
        style={{ width: "115%" }}
      >
        <thead className="text-xs text-gray-700 uppercase bg-yellow-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-6 text-[20px]">
              <input
                type="checkbox"
                checked={
                  selectedEmployees.length === employees.length &&
                  selectedEmployees.length > 0
                }
                onChange={handleAllCheckboxChange}
                className="checkbox"
              />
            </th>
            <th scope="col" className="py-3 px-4 text-[22px]">
              사번
            </th>
            <th scope="col" className="py-3 px-4 text-[22px]">
              이름
            </th>
            <th scope="col" className="py-3 px-6 text-[22px]">
              근무지
            </th>
            <th scope="col" className="py-3 px-6 text-[22px]">
              부서
            </th>
            <th scope="col" className="py-3 px-6 text-[22px]">
              직급
            </th>
            <th scope="col" className="py-3 px-6 text-[22px]">
              총결제금액
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
          {filteredEmployees.map((employee) => (
            <tr
              key={employee.employeeId}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-indigo-500/10 cursor-pointer"
            >
              <td className="py-2 px-4 text-[17px]">
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedEmployees.includes(employee.employeeId)}
                  onChange={() => handleCheckboxChange(employee.employeeId)}
                />
              </td>
              <td className="py-2 px-4 text-[17px]">{employee.employeeId}</td>
              <td className="py-2 px-4 text-[17px]">{employee.name}</td>
              <td className="py-2 px-4 text-[17px]">{employee.workplace}</td>
              <td className="py-2 px-4 text-[17px]">{employee.department}</td>
              <td className="py-2 px-4 text-[17px]">{employee.position}</td>
              <td className="py-2 px-4 text-[17px]">{employee.position}</td>
              <td className="py-2 px-4 text-[17px]">{employee.position}</td>
              <td className="py-2 px-4 text-[17px]">{employee.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Approve;
