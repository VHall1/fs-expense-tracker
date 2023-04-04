import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useMeQuery } from "../gql";
import { useAuthStore } from "../shared-store/auth-store";

export const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data, loading } = useMeQuery();
  const setUser = useAuthStore((state) => state.setUser);

  const LoginOrLogout = useMemo(() => {
    if (loading) {
      return <div>Loading...</div>;
    }

    if (data?.me) {
      setUser(data.me);
      return (
        <>
          <IconButton
            id="profile-avatar"
            aria-controls={open ? "profile-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Avatar>{data.me.username?.charAt(0)}</Avatar>
          </IconButton>
          <Menu
            id="profile-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "profile-avatar",
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </>
      );
    }

    setUser(null);
    return (
      <Button color="inherit" href="/auth/login">
        Login
      </Button>
    );
  }, [data, loading, open, anchorEl]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          expense-tracker
        </Typography>

        {LoginOrLogout}
      </Toolbar>
    </AppBar>
  );
};
