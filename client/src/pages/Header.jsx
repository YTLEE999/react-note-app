import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';


import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ListAltIcon from '@material-ui/icons/ListAlt';
import NoteList from "../pages/NoteList";
import CreateArea from "../pages/CreateArea";



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Container>
            <Box>
              {children}
            </Box>
          </Container>
        )}
      </div>
    );
  }
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  
const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: "100%",
      flexGrow: 3
    },
    header: {
        backgroundColor: "#fff",
    },
    padding: {
        padding: theme.spacing(20),
    },
    tabLabel: {
        fontSize: "32px",
        fontFamily: "McLaren"
    }
  }));
  
function Header() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };
  
    return (
      <div className={classes.root}>
        <AppBar className={classes.header}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
            aria-label="full width tabs example"
          >
            <Tab label={<span className={classes.tabLabel}>My Notes <ListAltIcon /></span>} {...a11yProps(0)} />
            <Tab label={<span className={classes.tabLabel}>New <AddCircleOutlineIcon /></span>} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
          className={classes.padding}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <NoteList />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <CreateArea />
          </TabPanel>
        </SwipeableViews>
      </div>
    );
  }
  

export default Header;


