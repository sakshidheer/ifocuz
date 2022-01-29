import './App.css';
import Home from './containers/Home';
import Tasks from './containers/Tasks/Tasks'
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Header from './components/Header/Header'
import { useState } from 'react';
import SideDrawer from './components/SideDrawer/SideDrawer';
import classes from './App.module.css';
import Project from './containers/Project/Project';
import { isMobile } from 'react-device-detect';
import DrawerContext from './Drawer-context';

function App() {
  const [showSideBar, setShowSideBar] = useState(isMobile ? false : true);
  const hideSideBarIfMobile = ()=>{
    if(isMobile) setShowSideBar(false);
  }
  return (
    <BrowserRouter basename="/ifocuz">
      <DrawerContext.Provider value={{hideSideBarIfMobile}}>
        <div className={classes.app}>

          <Header onListIconClick={() => setShowSideBar(!showSideBar)} />
          <div className={classes.main}>
            <SideDrawer
              visible={showSideBar} />
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/tasks" exact>
              <Tasks />
            </Route>
            <Route path="/projects/:projectName" exact>
              <Project />
            </Route>
          </div>


        </div >
      </DrawerContext.Provider>
    </BrowserRouter >
  );
}

export default App;
