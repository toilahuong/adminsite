import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import { getUser } from './redux/slices/user';
import './App.css';
const Layout = React.lazy(() => import('./pages/layout/Layout'))
const Login = React.lazy(() => import('./pages/Login'))
const Register = React.lazy(() => import('./pages/Register'))
function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  },[dispatch])
  return user.isLoading ? <Loading />
  :
  (
    <Router>
      <React.Suspense fallback={<Loading />}>
        <Switch>
          <GuestRoute path="/login" component={Login}/>
          <GuestRoute path="/register" component={Register}/>
          <AdminRoute path="*" component={Layout}/>
        </Switch>
      </React.Suspense>
      
    </Router>
  );
}

export default App;

function GuestRoute(props) {
  const user = useSelector((state) => state.user);
  return user.isAdmin ? <Redirect to="/" /> : <Route {...props} /> 
}
function AdminRoute(props) {
  const user = useSelector((state) => state.user);

  return user.isAdmin ? <Route {...props} /> : <Redirect to="/login" />
}
function Loading() {
  return (
    <h1>
      Loading ...
    </h1>
  )
}