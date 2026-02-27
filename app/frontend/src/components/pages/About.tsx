import { NavBar } from "../ui/NavBar";


export default function About() {
    return (
        <div className="bg-linear-to-br from-green-100/70 to-teal-300/70 min-h-screen overflow-hidden">
            <div>
                <NavBar></NavBar>
            </div>
            <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-xl flex flex-col items-center gap-6 text-center" style={{ marginTop: "60px" }}>
                <h1 className="text-3xl font-bold mb-2">About The Developer</h1>
                <p className="text-lg">Welcome to my platform dedicated to reducing food waste and promoting sustainable living.</p>
                <line className="w-full border-t border-gray-500"></line>
                <h2 className="text-xl font-semibold">My Mission</h2>
                <p className="text-base">My aim to help individuals and communities reduce food waste by providing tools and resources for better food management and sustainability practices. 
                    This app was built by a solo highschool developer as a side project to learn more about AI and computer vision, and to contribute to the fight against food waste. I hope it can make a positive impact on the environment and inspire others to take action.</p>
                <line className="w-full border-t border-gray-500"></line>
                <h2 className="text-xl font-semibold">Contact Us</h2>
                <p className="text-base">If you have any questions, feedback, or would like to get involved, please feel free to reach out to us at <a href="mailto:ThisEmailIsFake@veggiewaste.com" className="text-blue-600 hover:underline">ThisEmailIsFake@veggiewaste.com</a>
                </p>
            </div>
        </div>
    )
}
