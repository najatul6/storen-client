import Loading from "@/components/common/Loading";
import useAuth from "@/hooks/useAuth";
import useRole from "@/hooks/useRole";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [userRole, isLoading] = useRole();
  const location = useLocation();

  if (loading || isLoading) return <Loading />;
  if (user && userRole !== "admin") {
    return <Navigate to="/un-auth" replace />;
  }
  if (user && userRole === "admin") {
    return children;
  } else {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
};

AdminRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminRoute;
