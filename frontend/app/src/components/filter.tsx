import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Employee {
  employeeId: number;
  name: string;
  location: string;
  rank: string;
  department: string;
}

const employees: Employee[] = [
  {
    employeeId: 1,
    name: "홍길동",
    location: "서울역 그랜드센트럴",
    rank: "부장",
    department: "섹션리더",
  },
  {
    employeeId: 2,
    name: "김철수",
    location: "서울역 그랜드센트럴",
    rank: "차장",
    department: "섹션리더",
  },
  {
    employeeId: 3,
    name: "이영희",
    location: "송도본사",
    rank: "과장",
    department: "실장",
  },
  {
    employeeId: 4,
    name: "박영진",
    location: "포스코센터",
    rank: "과장",
    department: "사장",
  },
  {
    employeeId: 5,
    name: "조혜원",
    location: "포스코센터",
    rank: "과장",
    department: "본부장",
  },
];

function EmployeeSearch(): JSX.Element {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] =
    useState<string>("");
  const [location, setLocation] =
    useState<string>("");
  const [rank, setRank] = useState<string>("");
  const [department, setDepartment] =
    useState<string>("");

  const handleSearch = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
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

  const goToEmployeeDetails = (
    employeeId: number
  ) => {
    navigate(`/employee/${employeeId}`);
  };

  const filteredEmployees = employees.filter(
    (employee) => {
      return (
        employee.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) &&
        employee.location.includes(location) &&
        employee.rank.includes(rank) &&
        employee.department.includes(department)
      );
    }
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
        <option value="포스코센터">
          포스코센터{" "}
        </option>
        <option value="서울역 그랜드센트럴">
          서울역 그랜드센트럴
        </option>
        <option value="청라 인천발전소">
          청라 인천발전소{" "}
        </option>
        <option value="광양 LNG터미널">
          광양 LNG터미널{" "}
        </option>
      </select>
      <select
        className="font-hyemin-bold mt-2 mr-4 text-[17px] w-1/5 focus:ring-2 focus:ring-yellow-500 focus:outline-none appearance-none text-lg leading-10 text-slate-900 placeholder-slate-400 rounded-md pl-3 ring-2 ring-slate-300 shadow-sm"
        value={rank}
        onChange={handleRankChange}
      >
        <option value="">직급</option>
        <option value="사원">사원</option>
        <option value="대리">대리</option>
        <option value="과장">과장</option>
        <option value="차장">차장</option>
        <option value="리더">리더</option>
        <option value="부장">부장</option>
      </select>
      <select
        className="font-hyemin-bold mt-2 mr-2 text-[17px] w-1/5 focus:ring-2 focus:ring-yellow-500 focus:outline-none appearance-none text-lg leading-10 text-slate-900 placeholder-slate-400 rounded-md pl-3 ring-2 ring-slate-300 shadow-sm"
        value={department}
        onChange={handleDepartmentChange}
      >
        <option value="">직책</option>
        <option value="섹션리더">섹션리더</option>
        <option value="그룹장">그룹장</option>
        <option value="실장">실장</option>
        <option value="본부장">본부장</option>
        <option value="사장">사장</option>
      </select>
      <table className="mt-4 w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-yellow-100 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th
              scope="col"
              className="py-3 px-6 text-[20px] "
            >
              사번
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-[20px]"
            >
              이름
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-[20px]"
            >
              근무지
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-[20px]"
            >
              직급
            </th>
            <th
              scope="col"
              className="py-3 px-6 text-[20px]"
            >
              직책
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee) => (
            <tr
              key={employee.employeeId}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-indigo-500/10"
              onClick={() =>
                goToEmployeeDetails(
                  employee.employeeId
                )
              }
            >
              <td className="py-4 px-6 text-[18px]">
                {employee.employeeId}
              </td>
              <td className="py-4 px-6 text-[18px]">
                {employee.name}
              </td>
              <td className="py-4 px-6 text-[18px]">
                {employee.location}
              </td>
              <td className="py-4 px-6 text-[18px]">
                {employee.rank}
              </td>
              <td className="py-4 px-6 text-[18px]">
                {employee.department}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeSearch;
