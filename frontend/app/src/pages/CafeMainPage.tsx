import React from "react";
import NavBar from "../components/Navbar";
import menu from "../assets/cafe-menu.json";

function CafeMainPage() {
  return (
    <div>
      <h1>Coffee Menu</h1>
      <ul>
        {menu.coffee.map((item, index) => (
          <li key={index}>
            <h2>
              {item.name} - {item.price}원
            </h2>
            <p>{item.description}</p>
            <img src={item.images} alt={item.name} style={{ width: "100px" }} />
            <div>
              {item.temperature.join(", ")} / Sizes: {item.size.join(", ")}
            </div>
            <div>
              {Object.entries(item.options).map(([key, value]) => (
                <span key={key}>
                  {key}: {value}원,{" "}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CafeMainPage;
