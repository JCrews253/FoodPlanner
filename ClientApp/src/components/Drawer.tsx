import { Box, List, SwipeableDrawer } from "@mui/material";
import CalendarIcon from "@mui/icons-material/CalendarToday";
import AddIcon from "@mui/icons-material/Add";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import DrawerMenuItem from "./DrawerMenuItem";
import HomeIcon from "@mui/icons-material/Home";

interface DrawerProps {
  open: boolean;
  onClose(): void;
  onOpen(): void;
}

const Drawer = ({ open, onClose, onOpen }: DrawerProps) => {
  return (
    <SwipeableDrawer
      anchor="left"
      open={open}
      onClose={onClose}
      onOpen={onOpen}
    >
      <Box
        sx={{
          width: 250,
        }}
      >
        <List>
          <DrawerMenuItem
            title="Home"
            linkUrl="/"
            Icon={<HomeIcon />}
            onClick={onClose}
          />
          <DrawerMenuItem
            title="Add Recipe"
            linkUrl="/addrecipe"
            Icon={<AddIcon />}
            onClick={onClose}
          />
          <DrawerMenuItem
            title="My Recipes"
            linkUrl="/myrecipes"
            Icon={<FastfoodIcon />}
            onClick={onClose}
          />
          {/* <DrawerMenuItem
            title="Calendar"
            linkUrl="/calendar"
            Icon={<CalendarIcon />}
            onClick={onClose}
          />
          <DrawerMenuItem
            title="Shopping List"
            linkUrl="/shoppinglist"
            Icon={<ShoppingCartIcon />}
            onClick={onClose}
          /> */}
        </List>
      </Box>
    </SwipeableDrawer>
  );
};

export default Drawer;
