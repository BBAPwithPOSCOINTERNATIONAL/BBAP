import styled from "styled-components";
import { FaBackward } from "react-icons/fa";
import { IoCaretBackOutline } from "react-icons/io5";

interface PaginationProps {
  totalPages: number;
  onPageChange: (newPage: number) => void;
  currentPage: number;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 10px;
  width: 73vw;
`;

const PaginationButton = styled.button<{ isActive?: boolean }>`
  margin: 0 5px;
  cursor: pointer;
  background-color: ${(props) => (props.isActive ? "#163760" : "#ffffff")};
  color: ${(props) => (props.isActive ? "#ffffff" : "#163760")};
  border: none;
  border-radius: 5px;
  outline: none;
  min-width: 30px;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
  currentPage,
}) => {
  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (totalPages <= 5) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 3) {
        endPage = 5;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <PaginationContainer>
      <div>
        <PaginationButton
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          style={{ fontSize: "15px", padding: "6px" }}
        >
          <FaBackward />
        </PaginationButton>

        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ fontSize: "15px", padding: "6px" }}
        >
          <IoCaretBackOutline />
        </PaginationButton>
      </div>
      <div>
        {generatePageNumbers().map((pageNumber) => (
          <PaginationButton
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            isActive={currentPage === pageNumber}
            style={{ fontSize: "20px" }}
          >
            {pageNumber}
          </PaginationButton>
        ))}
      </div>
      <div>
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ fontSize: "15px", padding: "6px", transform: "scaleX(-1)" }}
        >
          <IoCaretBackOutline />
        </PaginationButton>

        <PaginationButton
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          style={{ fontSize: "15px", padding: "6px", transform: "scaleX(-1)" }}
        >
          <FaBackward />
        </PaginationButton>
      </div>
    </PaginationContainer>
  );
};

export default Pagination;
