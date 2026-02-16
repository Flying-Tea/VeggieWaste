import { NavBar } from '../ui/NavBar'

function App() {
  return (
    <>
      <div>
        <NavBar></NavBar>
      </div>
      <div className="p-6" style={{ marginTop: "60px" }}>
        <h1 className="text-3xl font-bold mb-4">Welcome to VeggieWaste!</h1>
        <p className="text-lg">Your one-stop solution for reducing food waste and promoting sustainable living.</p>
      </div>
    </>
  )
}

export default App
