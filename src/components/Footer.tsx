import React from "react";
import Logo from "./Logo";

const Footer = () => {
  return (
    <div>
      <footer className="">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
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
