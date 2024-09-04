import React, { useState, useEffect, useRef } from "react";

function FileUploader() {
  const [videoSrc, setVideoSrc] = useState(""); // State to store the video source
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const videoRef = useRef(null); // Reference to the video element

  // Handler to update the video source when a new file is selected
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoSrc(videoURL);
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    const handlePlay = () => {
      // Show the modal after 3 seconds of video play
      const showModalTimer = setTimeout(() => {
        setIsModalVisible(true);
      }, 3000);

      // Hide the modal after 5 seconds of it being shown
      const hideModalTimer = setTimeout(() => {
        setIsModalVisible(false);
      }, 8000); // 3 seconds delay + 5 seconds visible

      // Cleanup timers when video is paused or component unmounts
      const cleanup = () => {
        clearTimeout(showModalTimer);
        clearTimeout(hideModalTimer);
      };

      videoElement.addEventListener("pause", cleanup);
      videoElement.addEventListener("ended", cleanup);

      return cleanup;
    };

    videoElement.addEventListener("play", handlePlay);

    // Cleanup on component unmount or if video changes
    return () => {
      videoElement.removeEventListener("play", handlePlay);
    };
  }, [videoSrc]);

  return (
    <>
  <div className="grid gap-4 max-w-2xl mx-auto p-4">
    {/* Upload Section */}
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium">Upload a Video</h2>
      </div>
      <div className="p-4 grid gap-4">
        <div className="grid gap-2">
          <label htmlFor="video-file" className="text-gray-700">
            Select a video file
          </label>
          <br />
          <input
            id="video-file"
            type="file"
            accept="video/*"
            className="border border-gray-300 rounded p-2"
            onChange={handleFileChange} // Capture file input changes
          />
        </div>
      </div>
    </div>

    {/* Video Preview Section */}
    <div className="bg-white rounded-lg overflow-hidden shadow-md relative"> {/* Added relative position */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-medium">Video Preview</h2>
      </div>
      <div className="aspect-video relative"> {/* Set relative position */}
        <video
          className="w-full h-full object-cover"
          controls
          poster="/placeholder.svg?height=300&width=300"
          ref={videoRef} // Reference to the video element
          src={
            videoSrc ||
            "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          } // Fallback video source
        />
        {/* Modal Overlay */}
        {isModalVisible && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10"> {/* Ensure modal is above the video */}
            <div className="bg-white p-4 rounded shadow-md">
              <h2 className="text-lg font-medium">Modal Message</h2>
              <p>
                This modal pops up after 3 seconds and closes after 5 seconds,
                and you can create anything according to your requirement.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
</>
  );
}

export default FileUploader;
