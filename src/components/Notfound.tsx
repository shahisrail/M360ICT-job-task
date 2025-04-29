import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";

interface NotfoundProps {
  message?: string;
}

const Notfound = ({ message }: NotfoundProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fef2f2] px-4">
      <Player
        autoplay
        loop
        src="https://lottie.host/3f9c4d3d-9b7a-4f76-8dc3-3fc3c6a52e34/ekJKAG9VZf.json"
        style={{ height: "300px", width: "300px" }}
      />
      <h1 className="text-3xl font-bold text-red-600 mt-6">
        {message || "Something went wrong"}
      </h1>
      <p className="text-gray-600 mt-2">
        Please check the URL or try again later.
      </p>
      <Link to="/">
        <button className="bg-red-700 mt-5 p-5 rounded-4xl text-white">please back to home page </button>
      </Link>
    </div>
  );
};

export default Notfound;
