import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../state/store";
import { setSession } from "../state/Session/sessionSlice";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()
    const session = useSelector((state: RootState) => state.session.value)
    const [smoothies, setSmoothies] = useState([])

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if(error){
            console.error("Error ocurred in logout: ", error)
        }
        navigate("/")
        dispatch(setSession(null))
    }    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data, error} = await supabase.from('smoothies').select();

                if(error){
                    throw new Error(`${error}`)
                }


                setSmoothies(data)
                console.log(data);
            } catch (error) {
                console.error((error as Error).message)
            }
        }

        fetchData();

    }, [])

    return (  
        <div className="h-[100vh] grid place-items-center">
            <div className="flex flex-col bg-white p-5 rounded ">
                <h1 className="font-bold text-4xl">User Info:</h1>
                <p>Email: {session?.user.email}</p>
            </div>
            {smoothies.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 ">
                    {smoothies.map(item => (
                        <Link to={`/${item.id}`} key={item.id} className="bg-white p-5 text-center rounded -translate-y-1 hover:translate-none duration-500 cursor-pointer shadow">
                            <p className="font-bold">{item.title}</p>
                        </Link>
                    ))}
                </div>
            ): (
                <p>Loading...</p>
            )}

            <Link to={"/create"} className="flex text-white justify-center items-center border border-white rounded-full py-1 px-3 -translate-y-1 hover:translate-none duration-500 cursor-pointer">
                <Plus className="w-[32px] h-auto" size={100}/>
                <p>Create</p>
            </Link>

            <button onClick={() => console.log(smoothies)}>Test</button>
            <button onClick={() => handleLogout()} className="bg-red-500 p-5 rounded font-bold -translate-y-0.5 hover:translate-none duration-200 cursor-pointer">Logout</button>
        </div>
    );
}
 
export default Dashboard;