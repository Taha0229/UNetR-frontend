"use client";
import { IoImagesSharp } from "react-icons/io5";
import { Button } from "@nextui-org/react";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  // const BASE_URL = "http://107.22.155.211:8000";
  const BASE_URL = "http://127.0.0.1:8000";
  const [base64Image, setBase64Image] = useState(null);
  const [fileName, setFileName] = useState("default")
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);

  // Function to handle file input change
  const handleFileChange = async (event) => {
    const file = event.target.files[0]; // Get the first file uploaded
    const ipFileName = file.name
    
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = function (e) {
        const base64String = e.target.result;
        setBase64Image(base64String);
        setFileName(ipFileName)
      };

      // Start reading the file
      reader.readAsDataURL(file);
    }
  };

  const handlePredict = async () => {
    setLoading(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({image: base64Image.replace(/^data:image.+;base64,/, ""), imgname: fileName}),
    };

    try {
      // Send the POST request using fetch
      const response = await fetch(`${BASE_URL}/inference/`, options);
      setLoading(false);
      // Check if the response status is OK
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Parse the JSON response
      const responseData = await response.json();
      setResponse(responseData.output);
      // Display the response data
      console.log(`Data posted successfully: ${JSON.stringify(responseData)}`);
    } catch (err) {
      // Handle any errors
      console.log(`Error: ${err.message}`);
      // setError(`Error: ${err.message}`);
    }
  };

  return (
    <div className="flex items-center flex-col mt-14">
      <p className="text-4xl font-bold">Upload an Image</p>
      <p className="text-xl">
        upload by clicking or by drag and drop an image to segment facial
        features
      </p>
      {base64Image === null ? (
        <div className="border-2 border-gray-400/90 w-[50%] h-[35rem] border-dashed rounded-sm flex flex-col gap-4 mt-10">
          <div className="flex flex-col items-center h-1/2 justify-end">
            <IoImagesSharp size={30} />
            <p>Drag & Drop or browse</p>
          </div>
          <input
            type="file"
            accept="image/*"
            className="h-1/2 relative mx-auto"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="mt-10 flex flex-col border-2 border-gray-400/90 border-dashed rounded-sm p-4 gap-4 w-[50%]">
          <p className="text-lg font-semibold">
            Uploaded Image Preview (contained):
          </p>
          <div className="img-container relative h-[35rem] w-[40vw] mx-auto">
            <Image
              fill
              src={base64Image}
              alt="Base64 Representation"
              className="object-contain"
            />
            {/* <img src={base64Image} alt="Base64 Representation" className=""/> */}
          </div>
          <div className="mx-auto">
            <Button color="primary" isLoading={loading} onClick={handlePredict}>
              Predict
            </Button>
          </div>
        </div>
      )}

      {response && (
        <div className="mt-10 flex flex-col border-2 border-gray-400/90 border-dashed rounded-sm p-4 gap-4 w-[50%]">
          <p className="text-lg font-semibold">
            Predicted Output Preview (contained):
          </p>
          <div className="img-container relative h-[35rem] w-[40vw] mx-auto">
            <Image
              fill
              src={`data:image/png;base64,${response}`}
              alt="Base64 Representation"
              className="object-contain"
            />
          </div>
        </div>
      )}

      {base64Image && (
        <div className="mt-5">
          <h3>Base64 String:</h3>
          <textarea value={base64Image} readOnly rows="4" cols="105" />
        </div>
      )}
    </div>
  );
}
