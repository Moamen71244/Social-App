import { Outlet } from "react-router";

export default function Layout() {
  return (

  <>
    {/* <AppNavbar/> */}
    <div className="min-h-screen bg-modern-gradient text-slate-900 dark:text-slate-100 overflow-auto">
         <Outlet />
    </div>
    
    </>
  )
}
