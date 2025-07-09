import { Navigate } from 'react-router-dom';
import useStore from '../../store';

const PublicOnlyRouter = ({ children }) => {
  const { isLoggedIn, loader } = useStore();

  if (loader) return <div>Loading...</div>;

  // If logged in, redirect to /boards
  return isLoggedIn ? <Navigate to="/boards" replace /> : children;
};

export default PublicOnlyRouter;
