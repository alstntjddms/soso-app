"use client";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useRecoilState } from "recoil";
import { sidebarOpen } from "@/app/store/atoms";
import MuiDrawer from "@mui/material/Drawer";
import { styled } from "@mui/material/styles";
import Link from "next/link";

const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(8)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  height: 64,
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const [open, setOpen] = useRecoilState(sidebarOpen);

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menu = [
    { 이름: "대시보드", URI: "/pages/dashboard" },
    { 이름: "멤버 초대", URI: "/pages/indivisual" },
    { 이름: "테스트", URI: "/pages/teamleader" },
  ];

  return (
    <div className="z-0">
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <img
            style={{ width: "120px" }}
            src="https://nacredit.kz/wp-content/uploads/2022/12/soso.png"
            alt="로고4"
          />
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List className="overflow-y-auto overflow-x-hidden">
          {menu.map((m, index) => (
            <Link key={m.이름} href={m.URI}>
              <ListItem disablePadding sx={{ display: "block", height: 36 }}>
                <ListItemButton
                  sx={{
                    minHeight: 36,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    paddingTop: 0,
                    paddingBottom: 0,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText
                    primary={m.이름}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block", height: 36 }}
            >
              <ListItemButton
                sx={{
                  minHeight: 36,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  paddingTop: 0,
                  paddingBottom: 0,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
