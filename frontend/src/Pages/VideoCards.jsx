import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import SyncLoader from "react-spinners/SyncLoader";

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

const VideoCards = () => {
  const [loading, setLoading] = useState(true);
  const storeFilteredVideos = useSelector((state) => state.category.filteredVideos);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate data fetching delay
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchContinueVideos = async (videoId, name, image, videoUrl) => {
    const ani = Cookies.get('number');

    try {
      const data = {
        ani: ani,
        videoid: videoId,
        imageurl: image,
        title: name,
        vurl: videoUrl,
      };

      // Make a POST request to continue-watching endpoint
      const res = await axios.post(`https://mali.toon-flix.com/api/little/continue-watching`, data);
      console.log("Response:", res.data);

      // Navigate to the VideoItem page with the videoId
      navigate(`/video/${videoId}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-[1140px] px-4">
      <div className='py-2 text-orange-600 font-bold'>
        <p className="text-4xl">Explorer<span className='text-orange-600 text-4xl'> Vidéos.</span></p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <SyncLoader color="#FFA500" loading={loading} size={15} />
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-0 mb-2">
          {storeFilteredVideos.map((data) => (
            <div key={data.id} className="text-white cursor-pointer">
              <div className="relative w-full overflow-hidden rounded-xl" onClick={() => fetchContinueVideos(data.id, data.name, data.imgurl, data.vurl)}>
                <img
                  src={data.imgurl}
                  alt={data.name}
                  width={500}
                  height={300}
                  // layout="responsive"
                  className="w-full h-[200px] object-cover rounded-t-lg relative backdrop-blur-3xl"
                />
                <div className="absolute bottom-0 left-0 w-full text-center bg-black bg-opacity-80 p-1">
           
                <p className="text-white">{translatedNames[data.name] || data.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoCards;
