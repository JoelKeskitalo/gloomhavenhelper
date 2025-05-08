import { Navigate } from 'react-router-dom';
import { useAuthSelector } from '../../redux/store';

const RequireCharacter = ({ children }: { children: JSX.Element }) => {
    const user = useAuthSelector((state) => state.auth.user);
    const isAuthenticated = useAuthSelector((state) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (!user?.character) {
        return <Navigate to="/choose-hero" />;
    }

    return children;
};

export default RequireCharacter;
