import React from 'react';
import AddBook from './components/books/AddBook';
import Home from './components/Home';
import PrivateRoute from './PrivateRoute';
import { Route, Link, Routes, useNavigate } from 'react-router-dom';
import EditBook from './components/books/EditBook';
import Register from './components/user/Register';
import Login from './components/user/Login';
import Profile from './components/user/Profile';
import Cookies from 'js-cookie';

function App() {
  const [userInfo, setUserInfo] = React.useState(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      setUserInfo(token);
    }
  }, [userInfo]);

  const handleLogout = () => {
    try {
      Cookies.remove('token');
      setUserInfo(null);
      location.reload();
      navigate('/user/login');
    } catch (error) {
      console.log('Logout error:', error);
      // Handle error case if needed
    }
  };

  return (
    <div className="bg-slate-600">
      <header className="bg-white py-10">
        <nav className="h-full">
          <div className="container mx-auto flex justify-between items-center">
            <h3 className="text-2xl font-bold">Gabi Books</h3>
            <ul className="hidden md:flex space-x-6">
              <li>
                <Link
                  to="/"
                  className="bg-red-400 px-4 py-2 rounded-3xl hover:bg-red-500 text-white"
                >
                  Home
                </Link>
              </li>
              {userInfo && (
                <>
                  <li>
                    <Link
                      to="/books/add_book"
                      className="bg-red-400 px-4 py-2 rounded-3xl hover:bg-red-500 text-white"
                    >
                      Add Book
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/profile"
                      className="bg-red-400 px-4 py-2 rounded-3xl hover:bg-red-500 text-white"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={handleLogout}
                      className="bg-red-600 px-4 py-2 rounded-3xl hover:bg-red-500 text-white"
                    >
                      Logout
                    </Link>
                  </li>
                </>
              )}
              {!userInfo && (
                <>
                  <li>
                    <Link
                      to="/user/login"
                      className="bg-red-400 px-4 py-2 rounded-3xl hover:bg-red-500 text-white"
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user/register"
                      className="bg-red-400 px-4 py-2 rounded-3xl hover:bg-red-500 text-white"
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>

      <Routes>
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/register" element={<Register />} />
        <Route path="/books/edit_book/:id" element={<PrivateRoute />}>
          <Route path="/books/edit_book/:id" element={<EditBook />} />
        </Route>
        <Route path="/books/add_book" element={<PrivateRoute />}>
          <Route path="/books/add_book" element={<AddBook />} />
        </Route>
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
