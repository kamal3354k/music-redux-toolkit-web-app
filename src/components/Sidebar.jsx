import { useState } from "react";
import { NavLink } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";

import { logo } from "../assets";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({ handClick }) => {
  return (
    <div className="mt-10">
      {links?.map((item) => (
        <NavLink
          to={item.to}
          key={item.name}
          className="flex flex-row justify-start items-center my-8 text-sm font-medium text-gray-400 hover:text-cyan-400"
          onClick={() => handClick && handClick()}
        >
          <item.icon className="w-6 h-6 mr-2" />
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

const Sidebar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <>
      <div className="md:flex hidden flex-col w-[240px] py-10 px-4 bg-[#191624]">
        <img src={logo} alt="logo" className="w-full h-16 object-contain" />
        <NavLinks />
      </div>

      {/* mobile nav */}

      <div className="absolute md:hidden block top-6 right-6 z-10">
        {mobileMenuOpen ? (
          <RiCloseLine  onClick={()=>setMobileMenuOpen(false)} className="text-white w-6 h-6 mr-2" />
        ) : (
          <HiOutlineMenu onClick={()=>setMobileMenuOpen(true)} className="text-white w-6 h-6 mr-2" />
        )}
      </div>

      <div
        className={`absolute top-0 h-screen w-2/3 bg-gradient-to-tl from-white/10 to-[#483d8b] backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobileMenuOpen ? "left-0" : "-left-full"
        } `}
      >
        <img src={logo} alt="logo" className="w-full h-16 object-contain" />
        <NavLinks handClick={()=>setMobileMenuOpen(false)}/>
      </div>
    </>
  );
};

export default Sidebar;
