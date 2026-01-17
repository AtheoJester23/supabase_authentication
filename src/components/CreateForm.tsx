import type { FormEvent } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const CreateForm = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const title = formData.get("title");
        const method = formData.get("method");
        const ratings = formData.get("ratings")

        console.log(`${title}, ${method}, ${ratings}`)
    
        try {
            const {data, error} = await supabase.from("smoothies").insert({title, method, ratings})

            if(error){
                throw new Error(`${error.message}`)
            }

            console.log(data)
            navigate("/Dashboard")

        } catch (err) {
            console.error((err as Error).message)
        }
    }

    return (  
        <form className="flex flex-col gap-2" onSubmit={(e) => handleSubmit(e)} >
            <div className="flex flex-col">
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" placeholder="Enter title" className="border border-gray-500 p-3 rounded" />

            </div>
            <div className="flex flex-col">
                <label htmlFor="method">Method:</label>
                <input type="text" name="method" placeholder="Enter Method" className="border border-gray-500 p-3 rounded" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="ratings">Rating:</label>
                <input type="number" name="ratings" placeholder="Enter Rating" className="border border-gray-500 p-3 rounded" />
            </div>
            <button className="bg-green font-bold p-3 bg-green-500 rounded cursor-pointer -translate-y-0.25 hover:translate-none duration-300">Submit</button>
        </form>
    );
}
 
export default CreateForm;