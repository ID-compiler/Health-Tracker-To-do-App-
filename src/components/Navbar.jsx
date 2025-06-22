import React from "react";
const Navbar = () => {
  return (
    <div className="bg-purple-700 text-white px-7 py-2">
      <ul className="flex flex-row justify-between items-center">
        <li className="font-bold text-lg">Health-tracker</li>
        <li>
          <ul className="flex flex-row space-x-8">
            <li className="hover:scale-110 transform transition-transform duration-300 cursor-pointer">
              Home
            </li>
            <li className="hover:scale-110 transform transition-transform duration-300 cursor-pointer">
              Your Plans
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
export default Navbar;
