import React from "react";

const Header = ({ title }: { title: string }) => {
  return <h3 className="mb-8 text-xl font-semibold tracking-tight">{title}</h3>;
};

export default Header;
