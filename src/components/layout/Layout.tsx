import { Outlet } from 'react-router-dom';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <Breadcrumbs />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}