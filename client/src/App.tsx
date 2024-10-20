import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/templates/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Activity from './pages/Activity';
import Register from './pages/Register';
import NewBooking from './pages/NewBooking';
import MyBooking from './pages/MyBooking';
import useAuthenticate from './hooks/useAuthenticate';
import { AppContext } from './contexts/AppContext';
import Management from './pages/Management';
import ViewBlogs from './pages/ViewBlogs';
import MyPosts from './pages/MyPosts';
import NewPost from './pages/NewPost';
import BlogDetail from './pages/BlogDetail';
import MyProfile from './pages/MyProfile';
export default function App() {
  const { user, isLoading, setUser, setIsLoading } = useAuthenticate();
  return (
    <>
      <AppContext.Provider
        value={{ user: user, isLoading, setUser, setIsLoading }}
      >
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='/activity' element={<Activity />} />
              <Route path='/booking/new' element={<NewBooking />} />
              <Route path='/booking/my' element={<MyBooking />} />
              <Route path='/management' element={<Management />} />
              <Route path='/blog/view' element={<ViewBlogs />} />
              <Route path='/blog/view/:id' element={<BlogDetail />} />
              <Route path='/blog/my' element={<MyPosts />} />
              <Route path='/blog/new' element={<NewPost />} />
              <Route path='/profile' element={<MyProfile />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </BrowserRouter>
      </AppContext.Provider>
    </>
  );
}
