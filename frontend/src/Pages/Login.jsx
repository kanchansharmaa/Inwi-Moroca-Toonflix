import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toonflix from "../images/toonflix.jpg";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [number, setNumber] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
     navigate("/Home")
  }, []);
  // Check for the existence of the loginStatus cookie on component mount
  useEffect(() => {
    const loginStatus = Cookies.get("loginStatus");
    if (loginStatus && loginStatus === "loggedIn") {
      navigate("/Home"); // Redirect to the home page if the user has logged in within the last 2 days
    }
  }, [navigate]);

  const handle = async () => {
    setLoading(true);
    try {
      // Make a GET request to the API
      const response = await axios.get('/check-sub', {
        params: {
          msisdn: number,
        },
      });

      // Check if subExist is 1
      if (response.data && response.data.subExist === 1) {
        // Allow user to proceed
        setApiData(response.data);
        setError(null);

        // Store user information in cookies with a 2-day expiration
        // Cookies.set("number", number, { expires: 2 });
        // Cookies.set("userId", response.data.userId, { expires: 2 });
        // Cookies.set("token", response.data.token, { expires: 2 });

        // Set the loginStatus cookie to indicate a successful login
        // Cookies.set("loginStatus", "loggedIn", { expires: 2 });

        // Perform navigation to the success page
        navigate("/Home"); // Replace "/Home" with your desired path
      } else {
        // Show an error if subExist is not 1
        setError('Subscription does not exist.');
        setApiData(null);
      }
    } catch (error) {
      // Handle errors
      setError('Error submitting data.');
      setApiData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-black/90 flex justify-center items-center z-10">
      <div className="container mx-auto max-w-screen-sm bg-white rounded-md p-4 md:p-8 flex flex-col items-center shadow-lg relative">
        <img
          src={toonflix}
          alt="/"
          className="w-24 h-auto mb-4 md:mb-0 md:w-[200px]"
        />
        <div className="flex flex-col w-full md:w-2/3 px-4 py-4 md:py-8">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Entrez votre numéro de téléphone pour en profiter
              <span className="text-orange-600 font-bold text-2xl md:text-3xl px-2">
              vidéos de dessins animés illimitées
              </span>
            </h1>
            <input
              type="number"
              placeholder="ENTREZ VOTRE N° DE TÉLÉPHONE"
              className="border border-black text-lg md:text-xl mt-3 w-full h-10 p-3 rounded"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
          </div>
          {error && <p className="text-red-600 text-center mt-2">{error}</p>}
          <div className="flex mt-4 md:mt-6">
            <button
              onClick={handle}
              className="w-full bg-orange-600 text-white py-2 px-4 rounded"
              disabled={loading}
            >

              {loading ? "Soumission..." : "Soumettre"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
