import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Toolbar from './components/toolbar/toolbar';
import Nova from './components/Nova/Nova';
import ProductDetail from './components/product/productDetail';
import Add from './components/AddProduct/Add';
import Tv from './components/tv/tv';
import Fridge from './components/fridge/fridge';
import Cutter from './components/cutter/cutter';
import NotFound from './components/NotFound';

function App() {
  return (
      <div className="App">
        <header>
          <Toolbar/>
        </header>
        <main>
          <div className="p-4 container-md">
            <Routes>
              <Route path="/" element={<Nova/>}/>
              <Route path="/product/:id" element={<ProductDetail/>}/>
              <Route path="/product/add" element={<Add/>}/>
              <Route path="/product/:id/edit" element={<Add/>}/>
              <Route path="/tv" element={<Tv/>}/>
              <Route path="/fridge" element={<Fridge/>}/>
              <Route path="/cutter" element={<Cutter/>}/>
              <Route path="*" element={<NotFound/>}/>
            </Routes>
          </div>
        </main>
      </div>
  );
}

export default App;
