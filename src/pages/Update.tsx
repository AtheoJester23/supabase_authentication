import UpdateForm from "../components/UpdateForm";

const Update = () => {
    return (  
        <div className="h-[100vh] flex flex-col justify-center items-center gap-5">
            <h1 className="font-bold text-4xl text-yellow-500">Update:</h1>
            <div className="bg-white p-5 rounded">
                <UpdateForm/>
            </div>
        </div>
    );
}
 
export default Update;