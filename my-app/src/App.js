import React from 'react';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom'
import './App.css';
import { Provider } from 'react-redux'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/landing'
import Signup from './components/auth/signup'
import Login from './components/auth/login'
import Dashboard from './components/dashboard/DashBoard'
import store from './store'
import jwt_decode from 'jwt-decode'
import Cookies from 'js-cookie'
import { SetUser } from './action/authAction';
import { removeProfile } from './action/profileAction';
import PrivateRoute from './components/commen/Privateroute'
import CreateProfile from './components/profile/Create-Profile'
import EditProfile from './components/profile/editProfile'
import AddExperience from './components/profile/addExperience'
import AddEducation from './components/profile/addEducation'
import Profile from './components/mainProfile/profile/profile'
import Profiles from './components/mainProfile/profile'
import Post from './components/post/post'
import PageNotFound from './components/NotFound/pageNotFound'
import SinglePost from './components/singlePost/singlepost'
function App() {
  if (Cookies.get('jwt')) {
    const decode = jwt_decode(Cookies.get('jwt'))
    // console.log(decode.exp > Date.now())
  
    if (decode.exp > Date.now()/1000) {
      store.dispatch(SetUser(decode.user))
    }else{
      Cookies.remove('jwt')
      store.dispatch(removeProfile())
    }
  }
  return (
    <Provider store={store}>

      <Router>
        <div className="App">

          <Navbar />

          <Route exact path="/" render={()=><Landing />} />
          <div className="container">

            <Route exact path="/signup" render={() => <Signup />} />
            <Route exact path="/login" render={() => <Login />} />
            <Route exact path="/profiles" render={() => <Profiles />} />
            <Route exact path="/profile/:id" render={props => <Profile {...props} />} />
            <Route exact path="/not-found" component={PageNotFound} />
            <Switch>

            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>

            <PrivateRoute exact path="/create-profile" component={CreateProfile} />
            </Switch>
            
            <Switch>
            <PrivateRoute exact path="/edit-profile" component={EditProfile} />
            </Switch>
            
            <Switch>
            <PrivateRoute exact path="/add-experience" component={AddExperience} />
            </Switch>
            <Switch>
            <PrivateRoute exact path="/add-education" component={AddEducation} />
            </Switch>
            <Switch>
            <PrivateRoute exact path="/post" component={Post} />
            </Switch>
            <Switch>
            <PrivateRoute exact path="/post/:id" component={SinglePost} />
            </Switch>

          </div>

          <Footer />

        </div>
      </Router>
    </Provider>
  );
}

export default App;
