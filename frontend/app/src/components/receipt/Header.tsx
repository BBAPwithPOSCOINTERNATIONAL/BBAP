import React from "react";

interface HeaderProps {
  formattedDate: string;
}

const Header: React.FC<HeaderProps> = ({ formattedDate }) => {
  return (
    <div
      className="font-hyemin-bold text-2xl"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "13vh",
        backgroundColor: "#EFF7FF",
        boxShadow: "0px 3px 4px rgba(0, 0, 0, 0.3)",
        position: "fixed",
        gap: "0.7rem",
      }}
    >
      <div style={{ marginTop: "3.3rem" }}>
        <p>{formattedDate} 사용내역</p>
      </div>
    </div>
  );
};

export default Header;
