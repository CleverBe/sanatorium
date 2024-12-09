import { SanatoriumIcon } from "./icons/sanatoriumIcon"
import { Link, useNavigate } from "react-router-dom"
import { Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { useAuth } from "@/hooks/useAuth"
import { useGetCurrentUser } from "@/pages/Profile/api/useGetCurrentUser"

export const Header = ({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean
  setShowSidebar: (showSidebar: boolean) => void
}) => {
  const { setAccessToken } = useAuth()
  const { data: user } = useGetCurrentUser()
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-50 mx-auto w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="ms-2 flex md:me-24">
              <SanatoriumIcon className="me-3 size-10" />
              <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl">
                Sanatorium
              </span>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="ms-3 flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="select-none rounded-full"
                  >
                    <span className="sr-only">Abrir menu de usuario</span>
                    <img
                      width={60}
                      height={60}
                      className="size-10 rounded-full"
                      src={
                        user?.image ||
                        "https://res.cloudinary.com/dldf8bt5g/image/upload/v1686697003/Users/default_user_jr8kfs.png"
                      }
                      alt="user profile image"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuLabel>{`${user?.firstname} ${user?.lastname}`}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      onClick={() => {
                        navigate("/perfil")
                      }}
                    >
                      Mi perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        localStorage.removeItem("token")
                        setAccessToken(null)
                      }}
                    >
                      Cerrar sesión
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
                <DropdownMenuSeparator />
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
