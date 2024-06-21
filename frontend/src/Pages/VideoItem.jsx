import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player/lazy";
import Navbar from "../Pages/Navbar";
import SubHeader from "./SubHeader";
import Footer from "./Footer";
import SimilarVideos from "./SimilarVideos";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { FaHome } from "react-icons/fa";
import Comments from "./Comments";


const VideoItem = () => {
  
  const translatedNames = {
    "Pedestrian Traffic Light": "Feu de circulation pour piétons",
    "Wear Seat Belt": "Porter une ceinture de sécurité",
    "Getting Out Of The Car": "Sortir de la voiture",
    "Traffic Police": "Police de la route",
    "Getting Off A Bus": "Descendre d'un bus",
    "Eyes-Closed Friday": "Les yeux fermés vendredi",
    "Fear Itself": "Peur de lui-même",
    "Crazy In Love": "Fou amoureux",
    "Indecision": "Indécision",
    "Sabotage": "Sabotage",
    "The Electric Current": "Le courant électrique",
    "Lost": "Perdu",
    "The Wise Fluoride": "Le sage fluorure",
    "The Periodic Table": "Le tableau périodique",
    "Stuffed Toys": "Peluches",
    "Multicoloured Bottles": "Bouteilles multicolores",
    "Paper Animals": "Animaux en papier",
    "Space Rocket": "Fusée spatiale",
    "Coloured Fish": "Poisson coloré",
    "Fresh Fruit Salad": "Salade de fruits frais",
    "Healthy Muesli": "Muesli santé",
    "Apple Toast & Kiwi Shake": "Toast aux pommes et shake au kiwi",
    "Chocolate Cake": "Gateau au chocolat",
    "Anchovie Sandwich & Strawberry Shake": "Sandwich aux anchois et shake aux fraises",
    "A Day At The Beach": "Une journée à la plage",
    "The Egg": "L'œuf",
    "Night Of Terror": "Nuit de terreur",
    "Ski Day": "Journée de ski",
    "Skate": "Patin",
    "Raindrops Birth": "Naissance des gouttes de pluie",
    "The Cloud Castle": "Le château des nuages",
    "Welcome Mr.Hydrogen": "Bienvenue Monsieur Hydrogène",
    "Raindrop The Builder": "Goutte de pluie le constructeur",
    "Frosty The Snow Lord": "Frosty Le Seigneur des Neiges",
    "Yellow Submarine": "Sous-marin jaune",
    "Clown fishing": "Pêche au clown",
    "Beach Dancer": "Danseuse de plage",
    "Baby turtle": "Bébé tortue",
    "Princess and Bear": "Princesse et ours",
  };
  const [videoData, setVideoData] = useState(null);
  const params = useParams();

  useEffect(() => {
    const reloaded = localStorage.getItem("need-reloaded");
    if (reloaded == null || !reloaded) {
      localStorage.setItem('need-reloaded', true);
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    window.scroll({
      top: 0,
      behavior: "instant"
    });
  }, [params.id]);



  const fetchDataFromBackend = async () => {
    try {
      const res = await axios.get(`https://mali.toon-flix.com/api/little/${params.id}`);
      console.log(res, "res");
      const videoDetails = res.data.videos;
      setVideoData(videoDetails);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Internal server error");
    }
  };
  useEffect(() => {
    fetchDataFromBackend();
  }, [params.id]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-[1140px] px-4 py-12 flex gap-4">
        <Link to="/Home">
          <div className="px-6 bg-white active md:active lg:active hover:bg-orange-600 rounded-xl font-bold shadow-lg shadow-zinc-700 hover:text-white active:bg-bg-black p-2">
            <FaHome size={20} />
          </div>
        </Link>
        <div className="px-6 active md:active lg:active bg-white hover:bg-orange-600 rounded-xl font-bold shadow-lg shadow-zinc-700 hover:text-white active:bg-bg-black p-2 w-full">
          {translatedNames[videoData?.name]}
        </div>
      </div>
      <div className="max-w-[1100px] mx-auto h-[550px] md:[300px] bg-zinc-700">
        <div className="w-full">
          <div
            onClick={() => {
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            className="h-[550px]"
          >
            {videoData && (
              <ReactPlayer
                url={videoData.vurl}
                controls={true}
                width="100%"
                height="100%"
                loop={true}
                playsinline={true}
                className=""
              />
            )}
          </div>
        </div>
      </div>
      <div>
        <Comments videoId={params.id} />
      </div>
      <SubHeader />
      <SimilarVideos videos={videoData?.videos} />
      <Footer />
    </>
  );
};

export default VideoItem;
