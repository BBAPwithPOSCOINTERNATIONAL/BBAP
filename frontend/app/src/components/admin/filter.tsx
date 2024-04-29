import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./approval.css";
import Pagination from "./pagination";

interface Employee {
  employeeId: number;
  name: string;
  workplace: string;
  position: string;
  department: string;
}

const employees: Employee[] = [
  {
    employeeId: 101,
    name: "홍길동",
    workplace: "서울역 그랜드센트럴",
    position: "부장",
    department: "섹션리더",
  },
  {
    employeeId: 102,
    name: "김철수",
    workplace: "서울역 그랜드센트럴",
    position: "차장",
    department: "섹션리더",
  },
  {
    employeeId: 103,
    name: "이영희",
    workplace: "송도본사",
    position: "과장",
    department: "실장",
  },
  {
    employeeId: 104,
    name: "박영진",
    workplace: "포스코센터",
    position: "과장",
    department: "사장",
  },
  {
    employeeId: 105,
    name: "조혜원",
    workplace: "포스코센터",
    position: "과장",
    department: "본부장",
  },
  {
    employeeId: 106,
    name: "홍길동",
    workplace: "서울역 그랜드센트럴",
    position: "부장",
    department: "섹션리더",
  },
  {
    employeeId: 107,
    name: "김철수",
    workplace: "서울역 그랜드센트럴",
    position: "차장",
    department: "섹션리더",
  },
  {
    employeeId: 108,
    name: "이영희",
    workplace: "송도본사",
    position: "과장",
    department: "실장",
  },
  {
    employeeId: 109,
    name: "박영진",
    workplace: "포스코센터",
    position: "과장",
    department: "사장",
  },
  {
    employeeId: 110,
    name: "조혜원",
    workplace: "포스코센터",
    position: "과장",
    department: "본부장",
  },
  {
    employeeId: 111,
    name: "홍길동",
    workplace: "서울역 그랜드센트럴",
    position: "부장",
    department: "섹션리더",
  },
  {
    employeeId: 112,
    name: "김철수",
    workplace: "서울역 그랜드센트럴",
    position: "차장",
    department: "섹션리더",
  },
  {
    employeeId: 113,
    name: "이영희",
    workplace: "송도본사",
    position: "과장",
    department: "실장",
  },
  {
    employeeId: 114,
    name: "박영진",
    workplace: "포스코센터",
    position: "과장",
    department: "사장",
  },
  {
    employeeId: 115,
    name: "조혜원",
    workplace: "포스코센터",
    position: "과장",
    department: "본부장",
  },
  {
    employeeId: 116,
    name: "조혜원",
    workplace: "포스코센터",
    position: "과장",
    department: "본부장",
  },
  {
    employeeId: 117,
    name: "조혜원",
    workplace: "포스코센터",
    position: "과장",
    department: "본부장",
  },
  {
    employeeId: 118,
    name: "조혜원",
    workplace: "포스코센터",
    position: "과장",
    department: "본부장",
  },
  {
    employeeId: 119,
    name: "조혜원",
    workplace: "포스코센터",
    position: "과장",
    department: "본부장",
  },
  {
    employeeId: 120,
    name: "조혜원",
    workplace: "포스코센터",
    position: "과장",
    department: "본부장",
  },
  {
    employeeId: 121,
    name: "조혜원",
    workplace: "포스코센터",
    position: "과장",
    department: "본부장",
  },
  {
    employeeId: 122,
    name: "조혜원",
    workplace: "포스코센터",
    position: "과장",
    department: "본부장",
  },
];

function EmployeeSearch(): JSX.Element {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [rank, setRank] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setLocation(event.target.value);
    setCurrentPage(1);
  };

  const handleRankChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setRank(event.target.value);
    setCurrentPage(1);
  };

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setDepartment(event.target.value);
    setCurrentPage(1);
  };

  const goToEmployeeDetails = (employeeId: number) => {
    navigate(`/employee/${employeeId}`);
  };

  // 페이지당 열의 개수
  const rowsPerPage = 10;
  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      employee.workplace.includes(location) &&
      employee.position.includes(rank) &&
      employee.department.includes(department)
    );
  });
  const totalFilteredEmployees = filteredEmployees.length;
  const totalPages = Math.ceil(totalFilteredEmployees / rowsPerPage);
  const indexOfLastEmployee = currentPage * rowsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  return (
    <div className="w-5/6 text-[30px] ">
      <input
        className="font-hyemin-bold mt-2 mr-4 text-[30px] w-1/5 focus:ring-2 focus:ring-yellow-500 focus:outline-none appearance-none text-lg leading-10 text-slate-900 placeholder-slate-400 rounded-md pl-3 ring-2 ring-slate-300 shadow-sm"
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
        className="font-hyemin-bold mt-2 mr-4 text-[17px] w-1/5 focus:ring-2 focus:ring-yellow-500 focus:outline-none appearance-none text-lg leading-10 text-slate-900 placeholder-slate-400 rounded-md pl-3 ring-2 ring-slate-300 shadow-sm"
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
        className="font-hyemin-bold mt-2 mr-2 text-[17px] w-1/5 focus:ring-2 focus:ring-yellow-500 focus:outline-none appearance-none text-lg leading-10 text-slate-900 placeholder-slate-400 rounded-md pl-3 ring-2 ring-slate-300 shadow-sm"
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
      <table
        style={{ width: "115%" }}
        className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400"
      >
        <thead className="text-xs text-gray-700 uppercase bg-yellow-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="py-3 px-4 text-[22px] ">
              사번
            </th>
            <th scope="col" className="py-3 px-4 text-[22px]">
              이름
            </th>
            <th scope="col" className="py-3 px-8 text-[22px]">
              근무지
            </th>
            <th scope="col" className="py-3 px-6 text-[22px]">
              부서
            </th>
            <th scope="col" className="py-3 px-6 text-[22px]">
              직급
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="py-4 px-6 text-[20px] text-center text-gray-500 dark:text-gray-400"
              >
                해당조건에 일치하는 검색내역이 없습니다.
              </td>
            </tr>
          ) : (
            currentEmployees.map((employee) => (
              <tr
                key={employee.employeeId}
                onClick={() => goToEmployeeDetails(employee.employeeId)}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-indigo-500/10 cursor-pointer"
              >
                <td className="py-2 px-4 text-[17px] ">
                  {employee.employeeId}
                </td>
                <td className="py-2 px-4 text-[17px] ">{employee.name}</td>
                <td className="py-2 px-4 text-[17px] ">{employee.workplace}</td>
                <td className="py-2 px-4 text-[17px] ">
                  {employee.department}
                </td>
                <td className="py-2 px-4 text-[17px] ">{employee.position}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* 페이지네이션 */}
      <Pagination
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        currentPage={currentPage}
      />
    </div>
  );
}

export default EmployeeSearch;
