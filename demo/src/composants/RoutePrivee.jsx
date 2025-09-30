import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoutePrivee({ children, requireSubscription = false }) {
  const { user, isSubscribed } = useSelector((state) => state.app);
  const location = useLocation();

  const isUserValid = !!user && (!requireSubscription || isSubscribed);

  if (!isUserValid) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return children;
}
