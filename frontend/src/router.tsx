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
import AdminPage from './pages/AdminPage/AdminPage';
import RequireAdmin from './components/ProtectedRoutes/AdminRoute';
import RequireCharacter from './components/ProtectedRoutes/RequireCharacter';

const Router = () => {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route
                        path="/"
                        element={
                            <RequireCharacter>
                                <Home />
                            </RequireCharacter>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/choose-hero" element={<ChooseHero />} />

                    <Route
                        path="/account"
                        element={
                            <RequireCharacter>
                                <Account />
                            </RequireCharacter>
                        }
                    />
                    <Route
                        path="/hero"
                        element={
                            <RequireCharacter>
                                <Hero />
                            </RequireCharacter>
                        }
                    />
                    <Route
                        path="/decks"
                        element={
                            <RequireCharacter>
                                <Decks />
                            </RequireCharacter>
                        }
                    />
                    <Route
                        path="/rules"
                        element={
                            <RequireCharacter>
                                <Rules />
                            </RequireCharacter>
                        }
                    />

                    <Route
                        path="/admin"
                        element={
                            <RequireAdmin>
                                <AdminPage />
                            </RequireAdmin>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
};

export default Router;
