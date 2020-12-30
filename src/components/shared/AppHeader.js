import React from "react";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import {Link} from 'react-router-dom'
import useStyles from "./AppHeader.style";

const AppHeader = () => {
  const anchor = "left";
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDrawer = (toggle) => (event) => {
    if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }

    setIsOpen(toggle);
  };

  const navigationRoutes = [
    { url: "/", label: "Registration Form" },
    { url: "/participants", label: "Participants" },
    { url: "/scoreboard", label: "Scoreboard" },
    // { url: "/games", label: "Games" },
  ];

  const renderSideNav = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navigationRoutes.map((link, index) => (
          <Link style={{textDecoration: 'none', color: '#000'}} key={link.url} to={link.url} onClick={()=>setIsOpen(false)}>
            <ListItem button>
              <ListItemText primary={link.label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={anchor}>
        <AppBar color="secondary" position="static">
          <Toolbar>
            <IconButton
              onClick={toggleDrawer(true)}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Family Day 2020
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer anchor={anchor} open={isOpen} onClose={toggleDrawer(false)}>
          {renderSideNav()}
        </Drawer>
      </React.Fragment>
    </div>
  );
};
export default AppHeader;
