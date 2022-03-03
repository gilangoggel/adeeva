import * as React from "react";
import { detectSidebar } from "./utils/detect-sidebar";
import { useAuth } from "../../hooks/use-auth";
import type {
  SidebarContentItem,
  SidebarContent,
} from "./utils/sidebar-contents";
import { Box, Button, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Item = ({ path, label }: SidebarContentItem) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = () => navigate(path);

  console.log(path, location.pathname === path);

  return (
    <Button
      onClick={handleClick}
      fullWidth
      sx={{
        textTransform: "none",
        justifyContent: "flex-start",
      }}
    >
      {label}
    </Button>
  );
};

const Content = ({ label, items }: SidebarContent) => {
  return (
    <>
      <Typography variant="body1" sx={{ fontWeight: "bolder" }}>
        {label}
      </Typography>
      {items.map((item) => (
        <Item {...item} />
      ))}
    </>
  );
};

export const Sidebar = () => {
  const auth = useAuth().user;

  const contents = detectSidebar(auth);

  return (
    <Box sx={{ px: 2, pt: 3 }}>
      <Item path="/backoffice/dashboard" label="Dashboard" />

      {contents.map((item) => {
        if ("path" in item) return <Item {...item} key={item.path} />;
        return <Content {...item} key={item.label} />;
      })}
    </Box>
  );
};
