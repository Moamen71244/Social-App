import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle } from "@heroui/react";
import { Instagram, Sun1, Moon } from "iconsax-reactjs";
import { useContext, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { userDataContext } from "../../Context/AuthUserData";
import { useTheme } from "../../Context/ThemeContext";
import axios from "axios";

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { userData, setAuthUserData } = useContext(userDataContext);
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const imputUpdateImage = useRef();

  async function updateUserImage(e) {
    const token = localStorage.getItem("token");
    const newImage = e.target.files[0];
    const myFormData = new FormData();
    myFormData.append('photo', newImage);
    
    await axios.put(`${import.meta.env.VITE_BASE_URL}/users/upload-photo`, myFormData, {
      headers: { token: token }
    }).then(() => {
      setAuthUserData();
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      <Navbar 
        className="glass-card fixed shadow-lg border-none" 
        isMenuOpen={isMenuOpen} 
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="xl"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <Link to="/home" className="flex items-center gap-2">
              <Instagram size="32" className="text-primary-500" variant="Bold" />
              <span className="hidden sm:block font-bold text-xl tracking-tight display-font text-primary-600">
                SocialApp
              </span>
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-8" justify="center">
          {userData && (
            <NavbarItem>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors hover:text-primary-500 ${isActive ? "text-primary-600 border-b-2 border-primary-600" : "text-slate-500"}`
                }
              >
                Feed
              </NavLink>
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarContent justify="end" className="gap-2">
          <Button 
            isIconOnly 
            variant="light" 
            onPress={toggleTheme}
            className="text-slate-500 rounded-full"
          >
            {isDarkMode ? <Sun1 size="20" variant="Bold" /> : <Moon size="20" variant="Bold" />}
          </Button>

          {userData ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform ring-offset-2 ring-primary-100 dark:ring-primary-900"
                  color="primary"
                  name={userData?.name}
                  size="sm"
                  src={userData?.photo}
                  showFallback
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat" className="w-64">
                <DropdownItem key="user-info" className="h-14 gap-2 opacity-100">
                  <p className="font-semibold text-xs text-slate-500">Signed in as</p>
                  <p className="font-bold text-sm">{userData?.name}</p>
                </DropdownItem>
                <DropdownItem key="email" className="text-xs text-slate-400">
                  {userData?.email}
                </DropdownItem>
                <DropdownItem as={Link} to="/changepassword" key="password">Change Password</DropdownItem>
                <DropdownItem as={Link} to="/profile" key="profile">My Profile</DropdownItem>
                <DropdownItem key="update-photo" onClick={() => imputUpdateImage.current.click()}>
                  Update Profile Photo
                </DropdownItem>
                <DropdownItem 
                  key="logout" 
                  color="danger" 
                  className="text-danger"
                  onClick={() => {
                    setAuthUserData(null);
                    localStorage.removeItem("userdata");
                    navigate("/login");
                  }}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem>
              <Button as={Link} color="primary" to="/register" variant="shadow" size="sm" className="font-bold">
                Join Now
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>

        <NavbarMenu className="glass-card pt-6">
          {userData ? (
            <NavLink 
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `text-xl font-bold p-2 rounded-xl transition-all ${isActive ? 'bg-primary-50 text-primary-600' : 'text-slate-600'}`}
              to="/home"
            >
              Feed
            </NavLink>
          ) : (
            <NavLink 
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => `text-xl font-bold p-2 rounded-xl transition-all ${isActive ? 'bg-primary-50 text-primary-600' : 'text-slate-600'}`}
              to="/register"
            >
              Sign Up
            </NavLink>
          )}
        </NavbarMenu>
      </Navbar>

      <input type="file" ref={imputUpdateImage} onChange={updateUserImage} className="hidden" />
    </>
  );
}
