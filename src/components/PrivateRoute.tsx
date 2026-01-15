import type { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../state/store";
import { Navigate, useNavigate } from "react-router-dom";

const PrivateRoute = ({children}: {children: ReactNode}) => {
    const session = useSelector((state: RootState) => state.session.value);

    console.log(session)

    if(session == null){
        return <p>Loading...</p>
    }

    if(!session){
        return <Navigate to={"/"} replace/>
    }
    
    return <>{children}</>    
}
 
export default PrivateRoute;