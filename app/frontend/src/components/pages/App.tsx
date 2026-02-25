import { useState } from 'react';
import { NavBar } from '../ui/NavBar';
import { ReuseButton } from '../ui/ReusableButton';
import axios from 'axios';
import bg from '../../assets/bg.jpg';

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [result, setResult] = useState<{ label: string; confidence: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    setImageSrc(URL.createObjectURL(file));
    setResult(null);

    const formData = new FormData();
    formData.append('image', file);

    try {
      setLoading(true);
      const response = await axios.post(
        'http://localhost:5293/api/veggie/classify',
        formData
      );
      setResult(response.data);
      console.log("API response:", response.data);
      console.log("Confidence:", response.data.confidence);
      console.log("Classification:", response.data.classification);
    } catch (error) {
      console.error("Error fetching API data:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <NavBar />
      <div className="relative bg-fixed min-h-screen bg-cover bg-center overflow-hidden flex flex-col" style={{ backgroundImage: `url(${bg})` }}>
      {/* Hero section */}
      <section className="bg-linear-to-br from-green-100/70 to-teal-300/70 backdrop-blur-sm pt-20 pb-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">Reduce Food Waste with AI 🪴</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload a photo of your vegetable and instantly find out whether it’s
            still fresh or should be composted.
          </p>
        </div>
      </section>

      {/* Actual app card */}
      <section className="py-3">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center gap-6">
          
          {/* Upload area */}
          <div className="w-full border-2 border-dashed border-teal-500 rounded-xl p-6 text-center hover:bg-teal-50 transition">
            <ReuseButton
              intent="secondaryButton"
              className="mx-auto border-2 px-6 rounded-lg text-teal-700 font-semibold hover:bg-teal-500 hover:text-white transition"
            >
              <label htmlFor="fileInput" className="cursor-pointer">
                📷 Upload an Image
              </label>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </ReuseButton>

            <p className="text-sm text-gray-500 mt-3">JPG or PNG · Max 5MB</p>
          </div>

          {/* Preview */}
          {imageSrc && (
            <div className="flex flex-col items-center">
              <img
                src={imageSrc}
                alt="Preview"
                className="max-w-xs max-h-64 rounded-xl border-4 border-teal-400 shadow-md"
              />
            </div>
          )}

          {/* Loading */}
          {loading && (
            <p className="text-teal-600 font-medium animate-pulse">Analyzing image…</p>
          )}

          {/* Result */}
          {result && (
            <div className="w-full bg-teal-100 rounded-xl p-2 text-center">
              <p className="text-xl font-bold text-gray-800">{result.label === 'fresh' ? '🌽 Fresh' : '🗑️ Rotten'}</p>
              <p className="text-gray-600 mt-1">Confidence: {(result.confidence).toFixed(2)}%</p>
            </div>
          )}
        </div>
      </section>
      {/* Credits */}
      <footer className='text-gray-800 text-sm italic pb-4 mt-auto'>
        <p className='ml-4 italic text-sm mb-auto'>Credits:</p>
        <p><a href="https://github.com/Flying-Tea" className= 'ml-4 italic text-sm hover:text-blue-400'>Web App Produced by Jackson Osmond</a></p>
        <a href="http://www.freepik.com" className= 'ml-4 italic text-sm hover:text-blue-400' target="_blank" rel="noopener noreferrer">Background Image Designed by macrovector_official / Freepik</a>
      </footer>
      </div>
      
    </>
  );
}

export default App;