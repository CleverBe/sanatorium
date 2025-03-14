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
import { useQueryClient } from "@tanstack/react-query"
import { defaultImageUrl } from "@/constants"

export const Header = ({
  setShowSidebar,
}: {
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { clearTokens } = useAuth()
  const { data: user } = useGetCurrentUser()
  const navigate = useNavigate()

  const queryClient = useQueryClient()

  const handleLogout = () => {
    queryClient.clear()
    clearTokens()
    navigate("/login")
  }

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-gray-200 bg-primary text-primary-foreground">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center rounded-lg p-2 text-sm text-primary-foreground focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
              onClick={(e) => {
                e.stopPropagation()

                setShowSidebar((prev) => !prev)
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/dashboard" className="ms-2 flex md:me-24">
              <SanatoriumIcon className="me-3 size-10 text-white" />
              <span className="self-center whitespace-nowrap text-xl font-semibold sm:text-2xl">
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
                    <span className="sr-only">Open user menu</span>
                    <img
                      width={60}
                      height={60}
                      className="size-10 rounded-full"
                      src={user?.image || defaultImageUrl}
                      alt="User profile image"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuLabel>{`${user?.name}`}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleLogout}>
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
