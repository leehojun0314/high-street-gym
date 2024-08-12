import Logo from '../atoms/Logo';
import twitter from '@/assets/twitter.svg';
import youtube from '@/assets/youtube.svg';
import facebook from '@/assets/facebook.svg';
import instagram from '@/assets/instagram.svg';
import { Link, useNavigate } from 'react-router-dom';
import FooterNav from '../molecules/FooterNav';
import { useCallback, useContext } from 'react';
import { AppContext } from '@/contexts/AppContext';
export default function Footer() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);
  const handleLogout = useCallback(
    (evt: React.MouseEvent<HTMLAnchorElement>) => {
      evt.stopPropagation();
      evt.preventDefault();
      localStorage.removeItem('token');
      setUser(undefined);
      navigate('/');
    },
    [navigate, setUser],
  );
  return (
    <footer className='bg-black text-white p-4 w-full'>
      <div className='flex-col gap-2 flex md:flex-row md:justify-around items-center text-white text-2xl'>
        <Logo className='flex-1' />
        <ul className='flex-1 flex flex-row list-none p-0 m-0 gap-[10px] justify-center'>
          <li>
            <img src={twitter} alt='twitter' />
          </li>
          <li>
            <img src={youtube} alt='youtube' />
          </li>
          <li>
            <img src={facebook} alt='facebook' />
          </li>
          <li>
            <img src={instagram} alt='instagram' />
          </li>
        </ul>
      </div>
      <div className='flex flex-row text-white mt-5 items-center text-center font-bold'>
        {/* navs */}
        <FooterNav>
          {/* left */}
          <Link to={'/'}>Home</Link>
          <Link to={'activity'}>Activities</Link>
          {user ? (
            <a onClick={handleLogout}>Log out</a>
          ) : (
            <Link to={'login'}>Log In</Link>
          )}

          {user?.user_role === 'ADMIN' && (
            <Link to={'management'}>Management</Link>
          )}
        </FooterNav>
        <div className='h-[150px] w-[2px] bg-white'>{/* divider */}</div>
        <FooterNav>
          {/* right */}
          <Link to='#'>Privacy Policy</Link>
          <Link to='#'>Terms and Conditions</Link>
          <Link to='#'>Accessibility</Link>
        </FooterNav>
      </div>
      <div className='flex flex-row w-full justify-center gap-5 mt-6'>
        <span>© 2024 All Rights Reserved.</span>
        <Link to={'https://www.w3.org/WAI/WCAG2AA-Conformance'}>
          <img
            height='32'
            width='88'
            src='https://www.w3.org/WAI/WCAG21/wcag2.1AA-v'
            alt='Level AA conformance,
            W3C WAI Web Content Accessibility Guidelines 2.1'
          />
        </Link>
      </div>
    </footer>
  );
}
