import './App.css';
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Symptoms from './pages/Symptoms';
import News from './pages/News';
import Diagnose from './pages/Diagnose';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import { NotificationContainer } from 'react-notifications';
import PreviousReports from './pages/PreviousReports';

function App() {
  const { loading } = useLoadingWithRefresh();
  const { user } = useSelector(state => state.auth) || {};
  console.log(user, 'User app');
  return (
    loading ? <h1>Loading...</h1> : (
    <Router>
      {
        user && (
          <Navbar />
        )
      }
      <Routes>
        <Route exact path="/register" element={<GuestRoute>
          <Register />
        </GuestRoute>} />
        <Route exact path="/login" element={<GuestRoute>
          <Login />
        </GuestRoute>} />
        <Route exact path="/" element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>} />
        <Route exact path="/symptoms" element={<ProtectedRoute>
          <Symptoms />
        </ProtectedRoute>} />

        <Route exact path="/diagnose" element={<ProtectedRoute>
          <Diagnose />
        </ProtectedRoute>} />

        <Route path="/previous-reports" element={<ProtectedRoute>
          <PreviousReports />
        </ProtectedRoute>} />

        <Route exact path="/profile" element={<ProtectedRoute>
          <Profile />
        </ProtectedRoute>} />

        <Route path="/news" element={<PublicRoute>
          <News />
        </PublicRoute>} />
      </Routes>

      <NotificationContainer />
    </Router>
    )
  );
}


const GuestRoute = ({ children }) => {
  const location = useLocation();
  const { isAuth } = useSelector(state => state.auth);

  return isAuth ? <Navigate replace to={
    {
      pathname: '/',
      state: { from: location },
    }
  } /> : children
}

const PublicRoute = ({ children }) => {
  const location = useLocation();
  const { isAuth } = useSelector(state => state.auth);

  return children
}

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isAuth } = useSelector(state => state.auth);
  return !isAuth ? <Navigate replace to={
    {
      pathname: '/login',
      state: { from: location },
    }
  } /> : children
}

export default App;
