import { Route, Routes } from "react-router-dom";
import "./App.css";

// components
import Footer from "./components/Footer";
import Header from "./components/Header";

// pages
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Products from "./pages/Products";
import About from "./pages/About";
import Categories from "./pages/Categories";

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:title" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/about" element={<About />} />
                <Route path="/categories" element={<Categories />} />
                categories
                <Route path="*" element={<h1>UNknow page</h1>} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
