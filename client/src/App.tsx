import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/templates/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Activity from './pages/Activity';
import Register from './pages/Register';
import Booking from './pages/Booking';
import MyBooking from './pages/MyBooking';
import useAuthenticate from './hooks/useAuthenticate';
import { AppContext } from './contexts/AppContext';
import Management from './pages/Management';
import ViewBlogs from './pages/ViewBlogs';
export default function App() {
  const { user, isLoading, setUser } = useAuthenticate();
  return (
    <>
      <AppContext.Provider value={{ user: user, isLoading, setUser }}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='/activity' element={<Activity />} />
              <Route path='/booking/new' element={<Booking />} />
              <Route path='/booking/my' element={<MyBooking />} />
              <Route path='/management' element={<Management />} />
              <Route path='/blog/view' element={<ViewBlogs />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}
