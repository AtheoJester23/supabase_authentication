import { useState, type FormEvent } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../state/store";
import { setSession } from "../state/Session/sessionSlice";

const SigninForm = () => {
    const [errs, setErrs] = useState<string | null>("")
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()

    //Sign up:
    const handleSignin = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        console.log(email, password);

        try {
            setLoading(true);
            setErrs(null)

            const {data, error} = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if(error){
                console.error("Sign in error: ", error);
                throw new Error(`${error}`)
            }
            console.log(data);
            dispatch(setSession(data));

            navigate("/Dashboard")
        } catch (error) {
            setErrs((error as Error).message)
            console.error("Error occured: ", error)
        }finally{
            setLoading(false)
        }
    }

    return (  
        <form onSubmit={(e)=>handleSignin(e)} className="bg-white p-5 rounded flex flex-col gap-3">
            <div className="flex flex-col">
                <label htmlFor="email" className="font-bold">Email:</label>
                <input type="text" name="email" placeholder="Enter email address" className="border border-gray-500 p-3 rounded"/>
            </div>
            <div className="flex flex-col">
                <label htmlFor="password" className="font-bold">Password:</label>
                <input type="password" name="password" placeholder="*******" className="border border-gray-500 p-3 rounded" />
            </div>
            <button className="bg-green-500 p-2 rounded font-bold text-white -translate-y-0.25 hover:translate-none cursor-pointer duration-300">Signup</button>
        </form>
    );
}
 
export default SigninForm;