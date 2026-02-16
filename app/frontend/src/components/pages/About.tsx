import { NavBar } from "../ui/NavBar";


export default function About() {
    return (
        <div>
            <div>
                <NavBar></NavBar>
            </div>
            <div className="p-6" style={{ marginTop: "60px" }}>
                <h1 className="text-3xl font-bold mb-4">About Us</h1>
                <p className="text-lg">Welcome to our platform dedicated to reducing food waste and promoting sustainable living.</p>
            </div>
        </div>
    )
}
