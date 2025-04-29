import { Player } from "@lottiefiles/react-lottie-player";

interface ErrorProps {
  message?: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fef2f2] px-4 text-center">
      <Player
        autoplay
        loop
        src="https://lottie.host/3f9c4d3d-9b7a-4f76-8dc3-3fc3c6a52e34/ekJKAG9VZf.json"
        style={{ height: "300px", width: "300px" }}
      />
      <h1 className="text-3xl font-bold text-red-600 mt-4">Something Went Wrong</h1>
      <p className="text-gray-600 mt-2">{message || "Please try again later."}</p>
    </div>
  );
};

export default Error;
