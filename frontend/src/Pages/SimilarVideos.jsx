import axios from "axios";
import Cookies from "js-cookie";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const translatedSimilarvideo = {
  "Pedestrian Traffic Light": "Feu de circulation pour piétons",
  "Wear Seat Belt": "Porter une ceinture de sécurité",
  "Getting Out Of The Car": "Sortir de la voiture",
  "Traffic Police": "Police de la route",
  "Getting Off A Bus": "Descendre d'un bus",
  "Eyes-Closed Friday": "Les yeux fermés vendredi",
  "Fear Itself": "Peur de lui-même",
  "Crazy In Love": "Fou amoureux",
  Indecision: "Indécision",
  Sabotage: "Sabotage",
  "The Electric Current": "Le courant électrique",
  Lost: "Perdu",
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
  "Anchovie Sandwich & Strawberry Shake":
    "Sandwich aux anchois et shake aux fraises",
  "A Day At The Beach": "Une journée à la plage",
  "The Egg": "L'œuf",
  "Night Of Terror": "Nuit de terreur",
  "Ski Day": "Journée de ski",
  Skate: "Patin",
  "Raindrops Birth": "Naissance des gouttes de pluie",
  "The Cloud Castle": "Le château des nuages",
  "Welcome Mr.Hydrogen": "Bienvenue Monsieur Hydrogène",
  "Raindrop The Builder": "Goutte de pluie le constructeur",
  "Frosty The Snow Lord": "Frosty Le Seigneur des Neiges",

  "Beach Dancer": "Danseuse de plage",
  "Baby turtle": "Bébé tortue",
  "Princess and Bear": "Princesse et ours",
  "Yellow Submarine": "Sous-marin jaune",
  "Clown fishing": "Pêche au clown",
};

const VideoCards = () => {
  const storeFilteredVideos = useSelector((state) => state.category.videos);
  console.log("fijhg", storeFilteredVideos);
  const navigate = useNavigate();

  const fetchContinuevideos = async (videoid, name, image, vurl) => {
    const ani = Cookies.get("number");
    console.log("data ", name, videoid, image, vurl);
    try {
      const data = {
        ani: ani,
        videoid: videoid,
        imageurl: image,
        title: name,
        vurl: vurl,
      };
      console.log("data", data);
      const res = await axios.post(`https://mali.toon-flix.com/api/little/continue-watching`, data);
      // const res = await axios.post(`http://localhost:4000/api/little/continue-watching`,data);
      console.log("res", res.data);

      navigate(`/video/${videoid}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="container mx-auto max-w-[1140px] px-4 py-1">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-0 mb-2">
        {storeFilteredVideos.map((data) => (
          <div key={data.id} className="text-white cursor-pointer">
            <div
              className="relative w-full overflow-hidden rounded-xl"
              onClick={() =>
                fetchContinuevideos(
                  data.id,
                  data.name,
                  data.imgurl,
                  data.vurl,
                  data.videoId
                )
              }
            >
              <img
                src={data.imgurl}
                alt={data.name}
                width={500}
                height={300}
                // layout="responsive"
                className="w-full h-[200px] object-cover rounded-t-lg relative backdrop-blur-3xl"
              />
              <div className="absolute bottom-0 left-0 w-full text-center bg-black bg-opacity-80 p-1">
              <p className="text-white">{translatedSimilarvideo[data.name] || data.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoCards;
