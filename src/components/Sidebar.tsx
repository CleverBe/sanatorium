import { cn } from "@/lib/utils"
import { useGetCurrentUser } from "@/pages/Profile/api/useGetCurrentUser"
import { RoleEnum } from "@/pages/Users/types"
import { BookCheck, Clipboard, LucideIcon, User, Users } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { useOnClickOutside } from "usehooks-ts"
import { useRef } from "react"

interface RouteItem {
  title: string
  Icon: LucideIcon
  url: string
}

interface SidebarItemProps extends RouteItem {
  setShowSidebar: (showSidebar: boolean) => void
}

const SidebarItem = ({
  title,
  Icon,
  url,
  setShowSidebar,
}: SidebarItemProps) => {
  const location = useLocation()

  const isActive = location.pathname.startsWith(url)

  return (
    <li>
      <Link
        to={url}
        onClick={() => {
          setShowSidebar(false)
        }}
        className={cn(
          "group flex items-center rounded-lg p-2 text-white hover:bg-secondary hover:text-secondary-foreground",
          isActive && "bg-secondary text-secondary-foreground",
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

export const Sidebar = ({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean
  setShowSidebar: (showSidebar: boolean) => void
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null)

  const { data: user } = useGetCurrentUser()

  const adminRoutes: RouteItem[] = [
    {
      title: "Distribución de trabajo",
      Icon: Users,
      url: "/trabajos",
    },
    {
      title: "Usuarios",
      Icon: Users,
      url: "/usuarios",
    },
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

  const managerRoutes: RouteItem[] = [
    {
      title: "Distribución de trabajo",
      Icon: Users,
      url: "/trabajos",
    },
    {
      title: "Empleados",
      Icon: Users,
      url: "/empleados",
    },
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

  const employeeRoutes: RouteItem[] = [
    {
      title: "Proyectos",
      Icon: BookCheck,
      url: "/myprojects",
    },
  ]

  const roleBasedRoutes =
    user?.role === RoleEnum.ADMIN
      ? adminRoutes
      : user?.role === RoleEnum.MANAGER
        ? managerRoutes
        : user?.role === RoleEnum.EMPLOYEE
          ? employeeRoutes
          : []

  const menuItems: RouteItem[] = [
    ...roleBasedRoutes,
    {
      title: "Perfil",
      Icon: User,
      url: "/perfil",
    },
  ]

  const handleClickOutside = () => {
    setShowSidebar(false)
  }

  useOnClickOutside(sidebarRef, handleClickOutside)

  return (
    <aside
      ref={sidebarRef}
      id="logo-sidebar"
      className={cn(
        "fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-primary pt-20 transition-transform md:translate-x-0",
        showSidebar && "transform-none",
      )}
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-primary px-3 pb-4">
        <ul className="space-y-2 font-medium">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.title}
              title={item.title}
              Icon={item.Icon}
              url={item.url}
              setShowSidebar={setShowSidebar}
            />
          ))}
        </ul>
      </div>
    </aside>
  )
}
