import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (  
        <div className="h-[100vh] grid place-items-center">
            <div className="flex flex-col justify-center items-center gap-5">
                <p className='text-5xl text-center font-bold text-red-500'>404 page...</p>
                <Link to={"/"} className="text-blue-500 -translate-y-1 hover:translate-none duration-500 cursor-pointer">Go back home...</Link>
            </div>
        </div>
    );
}
 
export default PageNotFound;