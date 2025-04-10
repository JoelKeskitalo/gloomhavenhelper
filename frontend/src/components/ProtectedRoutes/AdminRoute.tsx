import { Navigate } from 'react-router-dom';
import { useAuthSelector } from '../../redux/store';

const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const user = useAuthSelector((state) => state.auth.user);
    const isAuthenticated = useAuthSelector((state) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!user?.isAdmin) {
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminRoute;
