import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState } from "react";
import Logo from "@/assets/Logo.png";

const menu = [
  {
    name: "Dashboard",
    href: "/dashboard/overview",
    accessibleBy: ["admin", "agent", "manager", "product"],
  },
  {
    name: "File Upload",
    href: "/dashboard/upload",
    accessibleBy: ["admin", "manager", "product"],
  },
  {
    name: "File Details",
    href: "/dashboard/details",
    accessibleBy: ["admin", "agent", "manager", "product"],
  },
];

const getIcon = (linkName: string) => {
  switch (linkName) {
    case "Dashboard":
      return <Icon icon="mage:dashboard-fill"></Icon>;
    case "File Upload":
      return <Icon icon="ic:baseline-file-upload"></Icon>;
    case "File Details":
      return <Icon icon="mdi:information-outline"></Icon>;
    default:
      return null;
  }
};

const SideBar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <aside className="z-[20] lg:min-w-60 border-r border-[#EFF1FF]">
      <header className=" border-b border-[#EFF1FF] px-[25px] py-6 bg-white w-full fixed flex items-center justify-between lg:relative z-[8]">
        <button
          onClick={() => navigate("/dashboard/overview")}
          className="flex p-0 h-[28px] items-center text-white justify-start"
        >
          <img src={Logo} alt="" className="w-[50px]" />
        </button>

        <button
          className={`lg:hidden transition-all active:scale-95 ${
            sidebarOpen ? "rotate-180" : ""
          }`}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Icon
            icon={sidebarOpen ? "mingcute:close-line" : "ci:menu-duo-lg"}
            width={28}
            color="#40196D"
          />
        </button>
      </header>

      <div
        className={`menu fixed top-[5px] z-[7] lg:top-0 w-full h-[calc(100%-5px)] lg:h-[calc(100%-335px)] bg-white lg:relative ${
          sidebarOpen ? "block" : "hidden lg:block"
        }`}
      >
        <p className="px-7 py-6 pt-7 text-sm text-[#979797]">MENU</p>

        <div className="menu-items flex flex-col gap-0">
          {menu.map((item, index) => (
            <NavLink
              to={item.href}
              key={index}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive, isPending }) =>
                isActive
                  ? "active relative bg-primary/10 text-primary menu-item px-7 py-4 flex items-center gap-2 after:absolute after:w-2 after:h-full after:bg-primary after:-right-1 after:rounded-[10px] overflow-x-hidden"
                  : isPending
                  ? "pending"
                  : "menu-item px-7 py-4 flex items-center gap-2 text-[#979797]"
              }
            >
              <div className="menu-icon">{getIcon(item.name)}</div>
              <p className="menu-name text-sm">{item.name}</p>
            </NavLink>
          ))}
        </div>

        <div className="logout px-7">
          <div className="divider bg-[#EFF1FF] h-[1px] my-7" />
          <button
            className="menu-item py-4 flex items-center gap-2 text-[#979797] transition-all active:scale-95"
            onClick={() => navigate("/auth/login")}
          >
            <Icon icon="carbon:logout" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
