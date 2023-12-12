import { Box, Button, CssBaseline, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useRecoilState } from "recoil";
import { sidebarOpen } from "@/app/store/atoms";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { useRouter } from "next/navigation";

const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  height: 64,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header() {
  const router = useRouter();

  const [open, setOpen] = useRecoilState(sidebarOpen);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const pages = ["Products", "Pricing", "Blog"];

  const handleLogoutClick = (e) => {
    router.replace("/login");
  };

  return (
    <div className="z-10">
      <CssBaseline />
      <AppBar position="fixed" open={open} color="soso">
        <Toolbar disableGutters sx={{ marginLeft: 3 }}>
          <IconButton
            color="white"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: "flex " }}>
            {pages.map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "#FFFFFF", display: "block" }}
              >
                {page}
              </Button>
            ))}
            <Button
              sx={{ my: 2, color: "#FFFFFF", display: "block" }}
              onClick={handleLogoutClick}
            >
              로그아웃
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
