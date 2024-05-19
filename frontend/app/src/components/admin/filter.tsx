import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./approval.css";
import Pagination from "./pagination";
import { fetchEmployees, Employee, fetchCategoryData, Workplace, Department, Position } from "../../api/hradminAPI";

// const employees: Employee[] = [
//   {
//     employeeId: 101,
//     name: "홍길동",
//     workplace: "서울역 그랜드센트럴",
//     position: "부장",
//     department: "섹션리더",
//   },
//   {
//     employeeId: 102,
//     name: "김철수",
//     workplace: "서울역 그랜드센트럴",
//     position: "차장",
//     department: "섹션리더",
//   },
//   {
//     employeeId: 103,
//     name: "이영희",
//     workplace: "송도본사",
//     position: "과장",
//     department: "실장",
//   },
//   {
//     employeeId: 104,
//     name: "박영진",
//     workplace: "포스코센터",
//     position: "과장",
//     department: "사장",
//   },
//   {
//     employeeId: 105,
//     name: "조혜원",
//     workplace: "포스코센터",
//     position: "과장",
//     department: "본부장",
//   },
//   {
//     employeeId: 106,
//     name: "홍길동",
//     workplace: "서울역 그랜드센트럴",
//     position: "부장",
//     department: "섹션리더",
//   },
//   {
//     employeeId: 107,
//     name: "김철수",
//     workplace: "서울역 그랜드센트럴",
//     position: "차장",
//     department: "섹션리더",
//   },
//   {
//     employeeId: 108,
//     name: "이영희",
//     workplace: "송도본사",
//     position: "과장",
//     department: "실장",
//   },
//   {
//     employeeId: 109,
//     name: "박영진",
//     workplace: "포스코센터",
//     position: "과장",
//     department: "사장",
//   },
//   {
//     employeeId: 110,
//     name: "조혜원",
//     workplace: "포스코센터",
//     position: "과장",
//     department: "본부장",
//   },
//   {
//     employeeId: 111,
//     name: "홍길동",
//     workplace: "서울역 그랜드센트럴",
//     position: "부장",
//     department: "섹션리더",
//   },
//   {
//     employeeId: 112,
//     name: "김철수",
//     workplace: "서울역 그랜드센트럴",
//     position: "차장",
//     department: "섹션리더",
//   },
//   {
//     employeeId: 113,
//     name: "이영희",
//     workplace: "송도본사",
//     position: "과장",
//     department: "실장",
//   },
//   {
//     employeeId: 114,
//     name: "박영진",
//     workplace: "포스코센터",
//     position: "과장",
//     department: "사장",
//   },
//   {
//     employeeId: 115,
//     name: "조혜원",
//     workplace: "포스코센터",
//     position: "과장",
//     department: "본부장",
//   },
//   {
//     employeeId: 116,
//     name: "조혜원",
//     workplace: "포스코센터",
//     position: "과장",
//     department: "본부장",
//   },
//   {
//     employeeId: 117,
//     name: "조혜원",
//     workplace: "포스코센터",
//     position: "과장",
//     department: "본부장",
//   },
//   {
//     employeeId: 118,
//     name: "조혜원",
//     workplace: "포스코센터",
//     position: "과장",
//     department: "본부장",
//   },
//   {
//     employeeId: 119,
//     name: "조혜원",
//     workplace: "포스코센터",
//     position: "과장",
//     department: "본부장",
//   },
//   {
//     employeeId: 120,
//     name: "조혜원",
//     workplace: "포스코센터",
//     position: "과장",
//     department: "본부장",
//   },
//   {
//     employeeId: 121,
//     name: "조혜원",
//     workplace: "포스코센터",
//     position: "과장",
//     department: "본부장",
//   },
//   {
//     employeeId: 122,
//     name: "조혜원",
//     workplace: "포스코센터",
//     position: "과장",
//     department: "본부장",
//   },
// ];

function EmployeeSearch(): JSX.Element {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [rank, setRank] = useState<string>("");
  const [department, setDepartment] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [workplaceList, setWorkplaceList] = useState<Workplace[]>([]);
  const [departmentList, setDepartmentList] = useState<Department[]>([]);
  const [positionList, setPositionList] = useState<Position[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filters = {
          name: searchTerm || undefined,
          workplaceId: location ? parseInt(location) : undefined,
          positionId: rank ? parseInt(rank) : undefined,
          departmentId: department ? parseInt(department) : undefined,
        };

        const activeFilters = Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== undefined)
        );

        const response = await fetchEmployees(activeFilters);
        setEmployees(response.data.employeeList);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchData();
  }, [searchTerm, location, rank, department]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetchCategoryData();
        setWorkplaceList(response.data.workplaceList);
        setDepartmentList(response.data.departmentList);
        setPositionList(response.data.positionList);

      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchCategory();
  }, []);

  console.log(employees);
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

  const goToEmployeeDetails = (
    employeeId: number,
    employeeName: string,
    empNo: string
  ) => {
    navigate(`/employee/${employeeId}`, {
      state: { empName: employeeName, empNo: empNo },
    });
  };

  // 페이지당 열의 개수
  const rowsPerPage = 10;
  const totalFilteredEmployees = employees.length;
  const totalPages = Math.ceil(totalFilteredEmployees / rowsPerPage);
  const indexOfLastEmployee = currentPage * rowsPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
  const currentEmployees = employees.slice(
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
        {workplaceList.map((workplace) => (
          <option key={workplace.workplaceId} value={workplace.workplaceId}>
            {workplace.workplaceName}
          </option>
        ))}
      </select>
      <select
        className="font-hyemin-bold mt-2 mr-4 text-[17px] w-1/5 focus:ring-2 focus:ring-yellow-500 focus:outline-none appearance-none text-lg leading-10 text-slate-900 placeholder-slate-400 rounded-md pl-3 ring-2 ring-slate-300 shadow-sm"
        value={department}
        onChange={handleDepartmentChange}
      >
        <option value="">부서</option>
        {departmentList.map((department) => (
          <option key={department.departmentId} value={department.departmentId}>
            {department.departmentName}
          </option>
        ))}
      </select>
      <select
        className="font-hyemin-bold mt-2 mr-2 text-[17px] w-1/5 focus:ring-2 focus:ring-yellow-500 focus:outline-none appearance-none text-lg leading-10 text-slate-900 placeholder-slate-400 rounded-md pl-3 ring-2 ring-slate-300 shadow-sm"
        value={rank}
        onChange={handleRankChange}
      >
        <option value="">직급</option>
        {positionList.map((position) => (
          <option key={position.positionId} value={position.positionId}>
            {position.positionName}
          </option>
        ))}
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
          {currentEmployees.length === 0 ? (
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
                key={employee.empId}
                onClick={() =>
                  goToEmployeeDetails(
                    employee.empId,
                    employee.empName,
                    employee.empNo
                  )
                }
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-indigo-500/10 cursor-pointer"
              >
                <td className="py-2 px-4 text-[17px] ">{employee.empNo}</td>
                <td className="py-2 px-4 text-[17px] ">{employee.empName}</td>
                <td className="py-2 px-4 text-[17px] ">
                  {employee.workplaceName}
                </td>
                <td className="py-2 px-4 text-[17px] ">
                  {employee.departmentName}
                </td>
                <td className="py-2 px-4 text-[17px] ">
                  {employee.positionName}
                </td>
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
