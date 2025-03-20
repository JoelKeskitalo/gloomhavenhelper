import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Account from './components/Account/Account';
import Decks from './components/Decks/Decks';
import Hero from './components/Hero/Hero';
import Navbar from './components/Navbar/Navbar';
import Rules from './components/Rules/Rules';
import ChooseHero from './pages/ChooseHero/ChooseHero';

const Router = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/hero" element={<Hero />} />
                    <Route path="/decks" element={<Decks />} />
                    <Route path="/rules" element={<Rules />} />
                    <Route path="/account" element={<Account />} />
                    <Route path="/choose-hero" element={<ChooseHero />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default Router;
