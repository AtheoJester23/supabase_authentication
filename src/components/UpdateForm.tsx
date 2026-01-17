import { useEffect, useState, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

const UpdateForm = () => {
    const { id } = useParams();
    const [data, setData] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSmoothie = async () => {
            try {
                const {data, error} = await supabase.from('smoothies').select().eq("id", id).single();

                if(error){
                    throw new Error(`${error.message}`)
                }

                console.log(data);
                setData(data);


            } catch (error) {
                console.error((error as Error).message)
            }
        }
        fetchSmoothie();
    }, [])

    const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const title = formData.get('title');
        const method = formData.get('method');
        const ratings = formData.get('ratings');
        
        try {
            const {data, error} = await supabase.from("smoothies").update({title, method, ratings}).eq("id", id);

            if(error){
                throw new Error(`${error.message}`)
            }

            console.log(data);
            navigate("/Dashboard")
        } catch (error) {
            console.error((error as Error).message)
        }
    }

    return (  
        <form className="flex flex-col gap-2" onSubmit={(e) => handleUpdate(e)}>
            <div className="flex flex-col">
                <label htmlFor="title">Title:</label>
                <input  defaultValue={data?.title} type="text" name="title" placeholder="Enter title" className="border border-gray-500 p-3 rounded" />

            </div>
            <div className="flex flex-col">
                <label htmlFor="method">Method:</label>
                <input defaultValue={data?.method} type="text" name="method" placeholder="Enter Method" className="border border-gray-500 p-3 rounded" />
            </div>
            <div className="flex flex-col">
                <label htmlFor="rating">Rating:</label>
                <input defaultValue={data?.ratings} type="number" name="ratings" placeholder="Enter Rating" className="border border-gray-500 p-3 rounded" />
            </div>
            <button className="bg-green font-bold p-3 bg-green-500 rounded cursor-pointer -translate-y-0.25 hover:translate-none duration-300">Submit</button>
        </form>
    );
}
 
export default UpdateForm;