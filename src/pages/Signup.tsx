import SignupForm from "../components/SignupForm";
import { supabase } from "../supabaseClient";

const Signup = () => {
    console.log(supabase)

    return (
        <div className="w-full h-[100vh] flex flex-col gap-3 justify-center items-center">
            <h1 className="text-yellow-500 text-4xl font-bold">Sign-up</h1>
            <SignupForm/>
        </div>
    )
}
 
export default Signup;