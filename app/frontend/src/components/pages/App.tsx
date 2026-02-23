import { useState } from 'react';
import { NavBar } from '../ui/NavBar'
import { ReuseButton } from '../ui/ReusableButton'
import axios from 'axios';

function App() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && !e.target.files[0]) return; 

    const file = e.target.files![0];
    // Create a temporary URL
    setImageSrc(URL.createObjectURL(file));
    console.log("Selected file:", file);

    const formData = new FormData();
    formData.append('image', file);
    
    try {
      const response = await axios.post('http://localhost:5293/api/veggie/classify', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Classification result:", response.data);
    } catch (error) {
      console.error("Error fetching API data:", error);
    }
  };

  return (
    <>
      <div>
        <NavBar></NavBar>
      </div>
      <div className='grid place-items-center gap-6'>
        <div className="p-6" style={{ marginTop: "60px" }}>
          <h1 className="text-3xl font-bold mb-4">Welcome to VeggieWaste!</h1>
          <p className="text-lg">Your one-stop solution for reducing food waste and promoting sustainable living.</p>
        </div>
        <div className='flex flex-col items-center gap-6 bg-blue-200 p-10 rounded-lg shadow-md w-100% max-w-2xl'>
          <div className='flex-1 items-center'>
            <div className='border-2 border-dashed border-gray-400 rounded-lg p-6 w-full max-w-md'>
            <ReuseButton
              intent="secondaryButton"
              className="flex justify-center gap-2 border-2 p-2 rounded-lg hover:bg-teal-500 max-w-xs "
              >
                <label htmlFor="fileInput" className="cursor-pointer">
                  <span>Select an Image</span>
                </label>
                <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </ReuseButton>
            </div>
          </div>
          {imageSrc && <img src={imageSrc} alt="Preview" style={{maxWidth: '300px', borderRadius: '10px', borderColor: 'turquoise', borderWidth: '3px'}} />}
        </div>
      </div>
    </>
  )
}

export default App
