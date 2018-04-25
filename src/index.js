/* general */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxPromise from "redux-promise";
import reducers from "./reducers";
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
import { AppContainer } from 'react-hot-loader';
import App from './App';
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/*  */
import MunReg from './munReg/MunReg' ;
import ChooseRegGov from './munre/ChooseRegGov' ;
import RegTrackLineRoot from './reg-perfomance/RegTrackLineRoot' ;
import Invalid from './oldInvalid/Invalid' ;
import Turnout from './oldTurnout/Turnout' ;
import TwoMapsRoot from './socioElection/TwoMapsRoot' ;
import Full from './full/Full' ;
import Archive from './archive/Archive' ;
import Empty from './Empty' ;
import About from './About' ;
import VizRoot from './viz/VizRoot' ;
/* Candidates List 2018 */
import ListsOverviewGen from './lists-overview/general/ListsOverviewGen' ;
/* registration2018 */
import DetailedRegGovRoot from './detailed-reg/DetailedRegGovRoot' ;
import DetailedRegGovRootLatest from './detailed-reg-latest/DetailedRegGovRootLatest' ;
/* Aaron Maps */
import OneToOne from './one-to-one/OneToOne' ;
import FinalMap from './one-to-one-direct-final/FinalMap' ;
import FinalMapLeafletDist from './one-to-one-leaflet-final/FinalMapLeafletDist' ;

const customHistory = createBrowserHistory()
const rootEl = document.getElementById('root');
const render = Component =>
  ReactDOM.render(
    
    <Provider store={createStoreWithMiddleware(reducers)}>
    <AppContainer>
    <MuiThemeProvider>
    <Router history={customHistory}>
      <Switch>
      <Route exact path="/" component={App}/>
      <Route  path="/munre" component={ChooseRegGov}/>
      <Route  path="/munreg/:city" component={MunReg}/>

      <Route  path="/lists-overview" component={ListsOverviewGen}/>

      <Route  path="/one-to-one" component={OneToOne}/>
      <Route  path="/final-map-direct" component={FinalMap}/>
      <Route  path="/final-map-lealfet" component={FinalMapLeafletDist}/>

      <Route  path="/detailed-reg" component={DetailedRegGovRoot}/>
      <Route  path="/detailed-reg-latest" component={DetailedRegGovRootLatest}/>

      <Route  path="/reg-performance" component={RegTrackLineRoot}/>
      
      <Route  path="/invalid" component={Invalid}/>
      <Route  path="/turnout" component={Turnout}/>
      <Route  path="/socio" component={TwoMapsRoot}/>

      <Route  path="/full" component={Full}/>
      <Route  path="/archive" component={Archive}/>
      <Route  path="/about" component={About}/>
      <Route  path="/viz" component={VizRoot}/>
      
      <Route  path="/empty/:iframe" component={Empty}/>
      
      </Switch>
    </Router>
    </MuiThemeProvider>
    </AppContainer>
    </Provider>,
    rootEl
  );

render(App);
if (module.hot) module.hot.accept('./App', () => render(App));
