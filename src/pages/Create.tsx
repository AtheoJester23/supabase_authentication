import CreateForm from '../components/CreateForm'

const Create = () => {
    return (  
        <div className="h-[100vh] flex flex-col justify-center items-center gap-5">
            <h1 className="font-bold text-4xl text-yellow-500">Create:</h1>
            <div className="bg-white p-5 rounded">
                <CreateForm/>
            </div>
        </div>
    );
}
 
export default Create;