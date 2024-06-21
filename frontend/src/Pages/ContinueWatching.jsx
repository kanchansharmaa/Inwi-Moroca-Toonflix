import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect,useState } from 'react'
import { Link } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";



const translatedContinue = {
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


const ContinueWatching = () => {
    const [loading, setLoading] = useState(true);
    const[continueVideos,setcontinueVideos] = useState([]);
   
    useEffect(() => {

      const reloaded = localStorage.getItem("need-reloaded2");
      if(reloaded) {
        console.log("not needed2")
      } else if(reloaded === undefined || !reloaded) {
        localStorage.setItem('need-reloaded2', true);
        window.location.reload();
      }
    }, []);

    const fetchData = async () => {
      try {
        const ani=Cookies.get('number')
        // const response = await axios.get(`http://localhost:4000/api/little/watching/${ani}`);
        const response = await axios.get(`https://mali.toon-flix.com/api/little/watching/${ani}`);
        setcontinueVideos(response.data)
       console.log(response.data,"continueVideos");

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    useEffect(() => {
        fetchData();
      }, []);
  return (
    <div className="container mx-auto max-w-[1140px] px-4 py-12">
        <div className='p-2 text-xl text-orange-600 font-bold'>   <p>Continuer à regarder <span className='text-black'>.....</span></p>
    </div>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          
          <SyncLoader color="#FFA500"  loading={loading} size={15} />
        </div>
      ) : (
     
        <div  className="grid grid-cols-4 lg:grid-cols-4 gap-4 mt-0 mb-0">
              
          {continueVideos.videos?.map((data) => (
            
            <div key={data.id} className="text-white cursor-pointer">
              <Link to={`/video/${data.videoid}`}>
                <div className="relative w-full overflow-hidden rounded-xl">
                  <img
                    src={data.imageurl}
                    alt={data.vurl}
                    width={500}
                    height={300}
                    // layout="responsive"
                    className="w-full h-[100px] object-cover rounded-t-lg relative backdrop-blur-3xl"
                  />
                  <div className="absolute bottom-0 left-0 w-full text-center bg-black bg-opacity-80 p-1">
                    <p className="text-white sm:text-sm ">{translatedContinue[data.title]}</p>
                  </div>
                </div>
              </Link>
            </div>
            
          ))}
        </div>
    
      )}
     <div className='py-4'> 
            <hr className=''/>
     </div>
    </div>
  )
}

export default ContinueWatching