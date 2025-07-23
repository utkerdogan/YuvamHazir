import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './layout/layout';
import Home from './pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import UserProfilePage from './pages/UserProfilePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';
import PetList from './pages/PetList';
import PetDetail from './pages/PetDetail';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div>
      <Layout onSearch={setSearchTerm}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/About" component={AboutPage} />
          <Route path="/Products" render={() => <Products searchTerm={searchTerm} />} />
          <Route path="/Product/:id" component={ProductDetails} />
          <Route path="/Cart" component={CartPage} />
          <Route path="/Contact" component={ContactPage} />
          <ProtectedRoute path="/Profile" component={UserProfilePage} />
          <Route path="/Pets" component={PetList} />
          <Route path="/Pet/:id" component={PetDetail} />
          <Route path="/favorites" component={FavoritesPage} />
        </Switch>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Layout>
    </div>
  );
}

export default App;
