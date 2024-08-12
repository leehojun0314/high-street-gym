import Footer from '../organisms/Footer';
import Header from '../organisms/Header';
import { Outlet } from 'react-router-dom';
export default function Layout() {
	return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<div className='flex-grow'>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}
