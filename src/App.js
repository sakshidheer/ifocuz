import './App.css';
import Home from './containers/Home';
import Tasks from './containers/Tasks/Tasks'
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Header from './components/Header/Header'
import { useState } from 'react';
import SideDrawer from './components/SideDrawer/SideDrawer';
import classes from './App.module.css';

function App() {
  const [showSideBar, setShowSideBar] = useState(true);

  
  return (
    <BrowserRouter>
      <div className={classes.app}>
        <Header onListIconClick={()=> setShowSideBar(!showSideBar)}/>
        <div className={classes.main}>
          <SideDrawer 
          visible={showSideBar}/>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/tasks" exact>
            <Tasks />
          </Route>
        </div>


      </div>
    </BrowserRouter>
  );
}

export default App;
