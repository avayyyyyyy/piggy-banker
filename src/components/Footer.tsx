import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div>
      <footer className="border-white/20 w-[80vw] mx-auto  border-t">
        <div className="mx-auto px-3   py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center text-teal-600 sm:justify-start">
              <Logo />
            </div>
            <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
              Copyright &copy; 2024. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
