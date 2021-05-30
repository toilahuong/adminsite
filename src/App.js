import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Loading from './pages/loading/Loading';
import { getUser } from './redux/slices/user';
const Layout = React.lazy(() => import('./pages/layout/Layout'))
const Login = React.lazy(() => import('./pages/Login'))
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
