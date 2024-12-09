import { cn } from "@/lib/utils"
import { useGetCurrentUser } from "@/pages/Profile/api/useGetCurrentUser"
import { RoleEnum } from "@/pages/Users/types"
import { BookCheck, Clipboard, LucideIcon, Users } from "lucide-react"
import { Link, useLocation } from "react-router-dom"

interface SidebarItemProps {
  title: string
  Icon: LucideIcon
  url: string
}

const SidebarItem = ({ title, Icon, url }: SidebarItemProps) => {
  const location = useLocation()

  const isActive = location.pathname.startsWith(url)

  return (
    <li>
      <Link
        to={url}
        className={cn(
          "group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
          isActive && "bg-gray-100 dark:bg-gray-700",
        )}
      >
        <Icon className="size-5" />
        <span className={cn("ms-3", isActive && "font-extrabold")}>
          {title}
        </span>
      </Link>
    </li>
  )
}

export const Sidebar = ({ showSidebar }: { showSidebar: boolean }) => {
  const { data: user } = useGetCurrentUser()

  const adminRoutes: SidebarItemProps[] = [
    {
      title: "Usuarios",
      Icon: Users,
      url: "/usuarios",
    },
  ]

  const managerRoutes: SidebarItemProps[] = [
    {
      title: "Empleados",
      Icon: Users,
      url: "/empleados",
    },
  ]

  const employeeRoutes: SidebarItemProps[] = []

  const roleBasedRoutes =
    user?.role === RoleEnum.ADMIN
      ? adminRoutes
      : user?.role === RoleEnum.MANAGER
        ? managerRoutes
        : user?.role === RoleEnum.EMPLOYEE
          ? employeeRoutes
          : []

  const menuItems: SidebarItemProps[] = [
    ...roleBasedRoutes,
    {
      title: "Proyectos",
      Icon: BookCheck,
      url: "/proyectos",
    },
    {
      title: "Reportes",
      Icon: Clipboard,
      url: "/reportes",
    },
  ]

  return (
    <aside
      id="logo-sidebar"
      className={cn(
        "absolute left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0",
        showSidebar && "transform-none",
      )}
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.title}
              title={item.title}
              Icon={item.Icon}
              url={item.url}
            />
          ))}
        </ul>
      </div>
    </aside>
  )
}
