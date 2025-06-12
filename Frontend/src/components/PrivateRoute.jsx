import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

/**
 * Route privée : redirige vers /signin si pas authentifié
 */
const PrivateRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);

  return token ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
