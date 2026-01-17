import { Pencil, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

export type fetchedData = {
    id: number,
    title: string,
    method: string,
    ratings: number
}

const Item = () => {
    const { id } = useParams();
    const [data, setData] = useState<fetchedData>({id: 0, title: "", method: "", ratings: 0});
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data, error} = await supabase.from("smoothies").select().eq("id", id).single();

                if(error){
                    throw new Error(`${error.message}`)
                }

                console.log(data)
                setData(data);
            } catch (error) {
                console.error((error as Error).message)
            }
        }

        fetchData();
    }, [])

    const handleDelete = async () => {
        try {
            const {data, error} = await supabase.from('smoothies').delete().eq("id", id);

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
        <div className="h-[100vh] flex justify-center items-center">
            <div className="bg-white p-5 rounded">
                <div className="flex justify-between">
                    <p>item: {id}</p>
                    <Trash onClick={() => handleDelete()} className="-translate-y-0.25 hover:translate-none cursor-pointer text-red-500"/>
                </div>

                <div className="flex flex-col gap-2 justify-center items-center p-5 border rounded m-5 border-gray-500">
                    <p className="font-bold">{data.title}</p>
                    <p>{data.method}</p>
                    <p>{data.ratings}</p>
                </div>

                <Link to={`/update/${id}`} className="flex gap-2 justify-center items-center bg-blue-500 rounded px-5 py-3">
                    <Pencil className={"w-5 h-auto"} size={100}/>
                    <p className="font-bold">
                        Update
                    </p>
                </Link>
            </div>
        </div>
    );
}
 
export default Item;