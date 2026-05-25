import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import { Box, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

const drawerWidth = 260;

const AdminWrapper = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: 0, md: drawerWidth }, // ❗ hide on mobile, fixed on desktop
          flexShrink: 0,
        }}
      >
        <AdminSidebar open={open} setOpen={setOpen} isMobile={isMobile} />
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          p: 2,
          overflow: "auto",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default AdminWrapper;