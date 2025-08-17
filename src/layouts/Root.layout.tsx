import { Outlet } from "react-router"
import { Toaster } from "sonner"

export const RootLayout = () => {
  return (
	<div>
    <Outlet />
    <Toaster position="top-center" richColors/>
  </div>
  )
}