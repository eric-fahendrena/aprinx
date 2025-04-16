import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { ProfileContext } from "./contexts/ProfileContext";

function AuthenticatedRoute({ children }) {
  const { profile } = useContext(ProfileContext)
  
  return (
    <>
      {profile ? children : (
        <Navigate to={"/login"} replace />
      )}
    </>
  )
}

export default AuthenticatedRoute
