import React, { useState } from "react";
import {
  AppBar,
  Divider,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/user.slice";
import { RootState } from "../../store/store";
import { LoginModal } from "../../modules/auth/Login";
import RegisterModal from "../../modules/auth/Register/RegisterModal";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../routes/path";
import MenuIcon from '@mui/icons-material/Menu';


const Header: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  console.log("currentUser",currentUser);
  const data = currentUser?.user;
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false);

  // Handlers for modals
  const handleOpenLoginModal = () => setLoginModalOpen(true);
  const handleCloseLoginModal = () => setLoginModalOpen(false);

  const handleOpenRegisterModal = () => setRegisterModalOpen(true);
  const handleCloseRegisterModal = () => setRegisterModalOpen(false);

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
  }

  const navigate = useNavigate()
  const goToPage = () => { 
    navigate(PATH.ADMIN.USERS)
   }


  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white" }}
      className="px-24 shadow-none border-b border-gray-200"
    >
      <Toolbar className="flex justify-between items-center">
        <div className="flex items-center">
        <MenuIcon />
          <img
            src="https://demo4.cybersoft.edu.vn/static/media/airbnb-1.aabeefedaf30b8c7011a022cdb5a6425.svg"
            alt="airbnb"
            className="h-8"
          />
          
          <span className="text-red-400 px-4 font-bold text-2xl">AirBnB</span>
        </div>

        <div className="flex items-center space-x-4">
          {data ? (
            <>
              <IconButton onClick={handleAvatarClick}>
                <Avatar src={data?.avatar || '/path/to/default/avatar.jpg'} alt="User Avatar" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {data?.role === "ADMIN" && (
                  <MenuItem onClick={goToPage}>
                    Go To admin
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Typography
                variant="body2"
                className="text-black cursor-pointer hover:text-gray-700"
                onClick={handleOpenLoginModal}
              >
                Đăng Nhập
              </Typography>
              <Divider orientation="vertical" flexItem className="mx-2" />
              <Typography
                variant="body2"
                className="text-black cursor-pointer hover:text-gray-700"
                onClick={handleOpenRegisterModal}
              >
                Đăng Ký
              </Typography>
            </>
          )}
        </div>
      </Toolbar>

      <LoginModal open={loginModalOpen} onClose={handleCloseLoginModal} />

      <RegisterModal open={registerModalOpen} onClose={handleCloseRegisterModal} />
    </AppBar>
  );
};

export default Header;
