import { Link, useNavigate } from 'react-router-dom';
import headerStyle from '@/css/header.module.css';
import Logo from '../atoms/Logo';
import { useCallback, useContext } from 'react';
import { AppContext } from '@/contexts/AppContext';

export default function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);
  const handleClick = useCallback(() => {
    const navCheckBox = document.getElementById(
      'menu-toggle',
    ) as HTMLInputElement;
    navCheckBox.checked = false;
  }, []);

  function handleLogout(evt: React.MouseEvent<HTMLAnchorElement>) {
    evt.stopPropagation();
    evt.preventDefault();
    console.log('handleLogout');
    localStorage.removeItem('token');
    handleClick();
    setUser(undefined);
    navigate('/');
  }
  return (
    <header className={headerStyle.header}>
      <div className={`${headerStyle.logo} text-2xl`}>
        <Logo />
      </div>
      <input
        type='checkbox'
        id='menu-toggle'
        className={
          headerStyle['menu-toggle'] +
          ' hidden [&:checked~.nav-container.mobile]:h-[100vh]'
        }
      />

      <div className={headerStyle.right}>
        <Link
          className={`${headerStyle.btn} ${headerStyle['book-btn']} ${headerStyle.mobile}`}
          to='/booking/new'
          onClick={handleClick}
        >
          Book Now
        </Link>
        <label
          className={headerStyle['menu-btn-container']}
          htmlFor='menu-toggle'
        >
          <span className={headerStyle['menu-btn']}></span>
        </label>
      </div>
      <nav
        className={`${headerStyle['nav-container']} ${headerStyle.mobile} nav-container mobile`}
      >
        <Link className={headerStyle.link} to='activity' onClick={handleClick}>
          Activity
        </Link>
        <Link className={headerStyle.link} to='blog/view' onClick={handleClick}>
          Blog
        </Link>
        {user ? (
          <>
            <Link
              className={headerStyle.link}
              to={'/booking/my'}
              onClick={handleClick}
            >
              My Bookings
            </Link>
            <a className={headerStyle.link} onClick={handleLogout}>
              Log out
            </a>
          </>
        ) : (
          <Link className={headerStyle.link} to='login' onClick={handleClick}>
            Log In
          </Link>
        )}
        {user && (
          <Link to='profile' className={headerStyle.link} onClick={handleClick}>
            My Profile
          </Link>
        )}
        {user?.user_role === 'ADMIN' && (
          <Link
            className={headerStyle.link}
            to='management'
            onClick={handleClick}
          >
            Management
          </Link>
        )}
      </nav>
      <div className={`${headerStyle['nav-container']} ${headerStyle.desktop}`}>
        <nav>
          <Link className={headerStyle.link} to='activity'>
            Activity
          </Link>
          <Link className={headerStyle.link} to='blog/view'>
            Blog
          </Link>
          {user ? (
            <>
              <Link
                className={headerStyle.link}
                to={'/booking/my'}
                onClick={handleClick}
              >
                My Bookings
              </Link>
              <a className={headerStyle.link} onClick={handleLogout}>
                Log out
              </a>
              <Link
                to='profile'
                className={headerStyle.link}
                onClick={handleClick}
              >
                My Profile
              </Link>
            </>
          ) : (
            <Link className={headerStyle.link} to='login'>
              Log In
            </Link>
          )}
          {(user?.user_role === 'ADMIN' || user?.user_role === 'TRAINER') && (
            <Link
              className={headerStyle.link}
              to='management'
              onClick={handleClick}
            >
              Management
            </Link>
          )}
        </nav>
        <Link
          className={`${headerStyle.btn} ${headerStyle['book-btn']} ${headerStyle.desktop}`}
          to='/booking/new'
        >
          Book Now
        </Link>
      </div>
    </header>
  );
}
