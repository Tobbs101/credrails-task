import { NavLink, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useStoredAppUser } from "@/hooks/use-stored-app-user";

const menu = [
  {
    name: "Dashboard",
    href: "/dashboard/overview",
    accessibleBy: ["admin", "agent", "manager", "product"],
  },
  {
    name: "User Management",
    href: "/dashboard/users",
    accessibleBy: ["admin", "manager", "product"],
  },
  {
    name: "Queue Management",
    href: "/dashboard/queue",
    accessibleBy: ["admin", "agent", "manager", "product"],
  },
];

const getIcon = (linkName: string) => {
  switch (linkName) {
    case "Dashboard":
      return <Icon icon="mage:dashboard-fill"></Icon>;
    case "User Management":
      return <Icon icon="mingcute:group-3-fill"></Icon>;
    case "Queue Management":
      return <Icon icon="solar:document-text-bold"></Icon>;
    default:
      return null;
  }
};

const SideBar = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user] = useStoredAppUser();

  return (
    <aside className="z-[20] lg:min-w-60 border-r border-[#EFF1FF]">
      <header className=" border-b border-[#EFF1FF] px-[25px] py-6 bg-white w-full fixed flex items-center justify-between lg:relative z-[8]">
        <button
          onClick={() => navigate("/dashboard/overview")}
          className="flex p-0 items-center justify-start"
        >
          View
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
          {menu
            .filter((menu) =>
              menu.accessibleBy.some(
                (role) => role === user?.role?.toLowerCase()
              )
            )
            .map((item, index) => (
              <NavLink
                to={item.href}
                key={index}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive, isPending }) => {
                  return isActive
                    ? "active relative bg-[#EFF1FF] text-[#40196D] menu-item px-7 py-4 flex items-center gap-2 after:absolute after:w-2 after:h-full after:bg-[#40196D] after:-right-1 after:rounded-[10px] overflow-x-hidden"
                    : isPending
                    ? "pending"
                    : "menu-item px-7 py-4 flex items-center gap-2 text-[#979797]";
                }}
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
