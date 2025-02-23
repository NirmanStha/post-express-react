import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";
import { useAuthApi } from "../../api/auth/auth.api";

const NavBar = () => {
  const { user } = useAuthApi();
  const navLinks = [
    {
      title: "Home",
      url: "/",
    },

    {
      title: "Profile",
      url: "/profile",
    },
  ];

  return (
    <header>
      <nav>
        <div className="nav-container w-full flex items-center justify-between  py-2 px-4 md:px-6">
          <div className="logo bg-primary">Logo</div>
          <div className="nav-links">
            <div className=" lg:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      src={user?.profilePic}
                      alt={user?.firstName?.charAt(1)}
                    />
                    <AvatarFallback>{user?.firstName || "NA"}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {navLinks?.map((item, i) => (
                    <DropdownMenuItem key={i}>
                      <Link to={item.url || "#"}>{item.title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="hidden lg:flex justify-between items-center">
              {navLinks?.map((item, i) => (
                <Link
                  key={i}
                  to={item.url || "#"}
                  className="px-4 py-2 text-white"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
