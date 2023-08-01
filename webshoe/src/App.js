import { Route, Routes, useLocation } from 'react-router-dom';
import React from "react";
import { animateScroll as scroll } from 'react-scroll';
import Header from './component/Header';
import Footer from './component/Footer';
import Index from './component/Index';
import Collections from './component/Collections';
import Search from './component/Search';
import CollectionsFilter from './component/CollectionsFilter';
import Product from './component/Product';
import Login from './component/Login';
import Logup from './component/Logup';
import Cart from './component/Cart';
import Delivery from './component/Delivery';
import NotFoundPage from './component/NotFoundPage';
import Payment from './component/Payment';
import Infomation from './component/Infomation';
import Bill from './component/Bill';
import AdminForm from './admin/AdminForm';
import AdminListProduct from './admin/AdminListProduct';
import AdminProduct from './admin/AdminProduct';
import AdminListUser from './admin/AdminListUser';
import AdminStatByDay from './admin/AdminStatByDay';
import AdminStatByPro from './admin/AdminStatByPro';
import AdminBillsPro from './admin/AdminBillsPro';
import AdminBillsDay from './admin/AdminBillsDay';
import AdminUser from './admin/AdminUser';
import AdminSize from './admin/AdminSize';
import AdminListSize from './admin/AdminListSize';
import ManagerBill from './admin/ManagerBill';

function App() {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'));

  // Scroll đến phần header khi chuyển trang mới
  React.useEffect(() => {
    scroll.scrollToTop({
      duration: 500,
      smooth: true
    });
  }, [location]);

  const showHeader = !location.pathname.startsWith("/admin");

  return (
    <div className='App'>
      {showHeader && <Header user={user} />}
      <Routes>
        <Route path='/admin/bill' element={user?.position === 'Admin' ? <ManagerBill user={user} /> : <NotFoundPage />} />
        <Route path='/admin/product/:idp/sizes' element={user?.position === 'Admin' ? <AdminListSize user={user} /> : <NotFoundPage />} />
        <Route path='/admin/product/:idp/size/:id' element={user?.position === 'Admin' ? <AdminSize user={user} /> : <NotFoundPage />} />
        <Route path='/admin/user/:id' element={user?.position === 'Admin' ? <AdminUser user={user} /> : <NotFoundPage />} />
        <Route path='/admin/statByDay/bills/:day' element={user?.position === 'Admin' ? <AdminBillsDay user={user} /> : <NotFoundPage />} />
        <Route path='/admin/statByPro/bills/:time' element={user?.position === 'Admin' ? <AdminBillsPro user={user} /> : <NotFoundPage />} />
        <Route path='/admin/statByDay' element={user?.position === 'Admin' ? <AdminStatByDay user={user} /> : <NotFoundPage />} />
        <Route path='/admin/statByPro' element={user?.position === 'Admin' ? <AdminStatByPro user={user} /> : <NotFoundPage />} />
        <Route path='/admin' element={user?.position === 'Admin' ? <AdminForm user={user} /> : <NotFoundPage />} />
        <Route path='/admin/products' element={user?.position === 'Admin' ? <AdminListProduct user={user} /> : <NotFoundPage />} />
        <Route path='/admin/product/:id' element={user?.position === 'Admin' ? <AdminProduct user={user} /> : <NotFoundPage />} />
        <Route path='/admin/users' element={user?.position === 'Admin' ? <AdminListUser user={user} /> : <NotFoundPage />} />
        <Route path='/' element={<Index user={user} />}></Route>
        <Route path='/trang-chủ' element={<Index user={user} />}></Route>
        <Route path='/collections' element={<Collections user={user} />}></Route>
        <Route path='/collections/:cate' element={<CollectionsFilter user={user} />}></Route>
        <Route path='/search/:key' element={<Search user={user} />}></Route>
        <Route path='/product/:name' element={<Product user={user} />}></Route>
        <Route path='/login' element={<Login user={user} />}></Route>
        <Route path='/logup' element={<Logup user={user} />}></Route>
        <Route path='/cart' element={<Cart user={user} />}></Route>
        <Route path='/delivery' element={<Delivery user={user} />}></Route>
        <Route path='/payment' element={<Payment user={user} />}></Route>
        <Route path='/infomation' element={<Infomation user={user} />}></Route>
        <Route path='/bills' element={<Bill user={user} />}></Route>
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
      {showHeader && <Footer />}
    </div>
  );
}

export default App;
