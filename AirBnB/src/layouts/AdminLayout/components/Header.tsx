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

import { RootState } from "../../../store/store";
import { logout } from "../../../store/slices/user.slice";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../routes/path";
import { LoginModal } from "../../../modules/auth/Login";
import RegisterModal from "../../../modules/auth/Register/RegisterModal";

const Header: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const data = currentUser?.user
  console.log("dataComponent",currentUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    navigate(PATH.HOME)
  }



  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "white" }}
      className="px-24 shadow-none border-b border-gray-200"
    >
      <Toolbar className="flex justify-between items-center">
        <div className="flex items-center">
        </div>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <IconButton onClick={handleAvatarClick}>
                <Avatar src={data?.avatar || 'https://cdn-icons-png.flaticon.com/512/6596/6596121.png'} alt="User Avatar" />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
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
