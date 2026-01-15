import SigninForm from "../components/Signin"

const Home = () => {
  return (
    <div className="flex flex-col gap-2 justify-center items-center h-[100vh]">
        <h1 className="text-yellow-500 text-4xl font-bold">Sign-in</h1>
      <SigninForm/>
    </div>
  )
}

export default Home
