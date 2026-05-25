import {
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Button,
  Box,
  Drawer,
  IconButton,
} from "@mui/material";

import { Home, Calendar, Users, Settings, LogOut, Menu } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/auth/CreateAuthContext";

const AdminSidebar = ({ open, setOpen, isMobile }) => {

  const navigate = useNavigate();
    const authcontext = useContext(AuthContext);
  if (!authcontext) {
    throw new Error("Auth Context Doesn't Provided");
  }
  const menuItems = [
    { text: "Home", icon: <Home size={20} />,path:"/admin/dashboard"},
    { text: "News", icon: <Users size={20} />,path:"/admin/news" },
    { text: "Category", icon: <Calendar size={20} />,path:"/admin/category" },
    { text: "Settings", icon: <Settings size={20} /> },
  ];

  const sidebarContent = (
    <Box
      sx={{
        width: 260,
        height: "100%",
        bgcolor: "#F7F7F8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: "1px solid #E5E7EB",
        p: 2,
      }}
    >
      {/* Top Section */}
      <Box>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 5 }}>
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              bgcolor: "#00695C",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            ◎
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 800, color: "#005B55" }}>
              ADMIN
            </Typography>
            <Typography sx={{ fontSize: "0.7rem", color: "#6B7280" }}>
              DASHBOARD
            </Typography>
          </Box>
        </Box>

        {/* Menu */}
        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={()=>navigate(item.path)}
              sx={{
                borderRadius: 3,
                mb: 1,
                bgcolor: item.active ? "#00695C" : "transparent",
                color: item.active ? "#fff" : "#8A8FA8",
              }}
            >
              <Box sx={{ mr: 2 }}>{item.icon}</Box>
              <ListItemText primary={item.text} />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Bottom */}
      <Button onClick={authcontext.logout} startIcon={<LogOut />}>Logout</Button>
    </Box>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <IconButton
          onClick={() => setOpen(true)}
          sx={{ position: "fixed", top: 10, left: 10, zIndex: 1300 }}
        >
          <Menu />
        </IconButton>
      )}

      {/* Drawer */}
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={isMobile ? open : true}
        onClose={() => setOpen(false)}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
};

export default AdminSidebar;