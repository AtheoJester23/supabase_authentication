import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../state/store";
import { setSession } from "../state/Session/sessionSlice";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const session = useSelector((state: RootState) => state.session.value)

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if(error){
            console.error("Error ocurred in logout: ", error)
        }
        navigate("/")
        dispatch(setSession(null))
    }    

    return (  
        <div className="h-[100vh] grid place-items-center">
            <div className="flex flex-col bg-white p-5 rounded ">
                <h1 className="font-bold text-4xl">User Info:</h1>
                <p>Email: {session?.user.email}</p>
            </div>
            <button onClick={() => handleLogout()} className="bg-red-500 p-5 rounded font-bold -translate-y-0.5 hover:translate-none duration-200 cursor-pointer">Logout</button>
        </div>
    );
}
 
export default Dashboard;