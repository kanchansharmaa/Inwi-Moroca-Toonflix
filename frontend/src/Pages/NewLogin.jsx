import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toonflix from "../images/toonflix.jpg";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewLogin = () => {
  const navigate = useNavigate();
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmission = async () => {
    if (number.trim() === "") {
      toast.error("S'il vous plaît entrer un numéro de téléphone valide.");
      return;
    }
    setLoading(true);
    const adjustedNumber = number.trim().startsWith('212') ? number.trim() : `212${number.trim()}`;
       console.log("adjusted",adjustedNumber)
    try {
      const response = await axios.get(`/checkuser?msisdn=${adjustedNumber}`);
      console.log("response",response.data)

      if(response.data.status=='1'){
       toast.success("Connexion réussie!");
       Cookies.set('msisdn',adjustedNumber,{expires:1}); // Example of setting a cookie
       navigate('/home'); // Navigate to the home page or dashboard as per your routing setup
      }

      if(response.data.status=='0'){
        toast.error("Vous n'êtes pas abonné");
       setNumber('')

       }
      
    } catch (error) {
      toast.error(`Error:"Échec de la connexion"`);
      // setNumber('')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 px-5 md:px-0 overflow-y-auto bg-black/90 flex justify-center items-center z-10">
      <div className="container mx-auto max-w-screen-sm bg-white rounded-md p-4 md:p-8 flex flex-col items-center shadow-lg relative">
        <img
          src={toonflix}
          alt="Toonflix logo"
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
          <div className="flex mt-4 md:mt-6">
            <button
              onClick={handleSubmission}
              className="w-full bg-orange-600 text-white py-2 px-4 rounded"
              disabled={loading}
            >
              {loading ? "Soumission..." : "Soumettre"}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewLogin;
