import { useEffect } from "react";
import { Navigate } from "react-router-dom";

function AuthenticatedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("is_authenticated")
  
  useEffect(() => {

  })
  
  return (
    <>
      {isAuthenticated === "true" ? children : (
        <Navigate to={"/login"} replace />
      )}
    </>
  )
}

export default AuthenticatedRoute
