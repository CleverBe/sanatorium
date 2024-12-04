import { cn } from "@/lib/utils"
import { AxeIcon, BanIcon, BoxIcon, LucideIcon } from "lucide-react"
import { Link } from "react-router-dom"

const menuItems = [
  {
    title: "Usuarios",
    LucideIc: AxeIcon,
    url: "/usuarios",
  },
  {
    title: "Proyectos",
    LucideIc: BanIcon,
    url: "/proyectos",
  },
  {
    title: "Reportes",
    LucideIc: BoxIcon,
    url: "/reportes",
  },
]

const SidebarItem = ({
  title,
  Icon,
  url,
}: {
  title: string
  Icon: LucideIcon
  url: string
}) => {
  return (
    <li>
      <Link
        to={url}
        className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
      >
        <Icon className="size-5" />
        <span className="ms-3">{title}</span>
      </Link>
    </li>
  )
}

export const Sidebar = ({ showSidebar }: { showSidebar: boolean }) => {
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
              Icon={item.LucideIc}
              url={item.url}
            />
          ))}
        </ul>
      </div>
    </aside>
  )
}
