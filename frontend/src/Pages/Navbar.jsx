import { useState } from 'react';
import toonflix from "../images/toonflix.jpg";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios'; // Import Axios
import {useNavigate} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Navbar = () => {
 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate=useNavigate()
  const msisdn = Cookies.get('msisdn');
  const url = `https://wap.globocom.info/mglobopay/genericUnsub?msisdn=${msisdn}&serviceId=1545`;
  console.log("url", url)

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  
  const handleUnsubscribe = async () => {
  
    try {
      const response = await axios.get(url);
      console.log("response", response)
      console.log('Unsubscribe response:', response.data);
  
      if (response.data == 'true') {
        toast.success("Désabonnement réussi");
        Cookies.remove('msisdn'); 
        navigate('/login'); 
      }
      else{
        toast.error("désabonnement échoué")
      }
     
    } catch (error) {
      console.error('Error during unsubscribe:', error);
    }
  };

  return (
    <div className="flex justify-between">
      <div className="w-full h-20 bg-zinc-900 py-5 shadow-2xl mb-8">
        <nav className="flex flex-row justify-around">
          <div>
            <Link to="/Home">
              <img
                className="h-[50px] w-[200px] hover:scale-110"
                src={toonflix}
                alt="Toonflix logo"
              />
            </Link>
          </div>
          <div>
            <button
              id="dropdownDefaultButton"
              onClick={toggleDropdown}
              className="text-white bg-[#FF4003] hover:bg-orange-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              type="button"
            >
              Mon compte <svg className="w-2.5 h-2.5 ml-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <div id="dropdown" className={`z-10 ${isDropdownOpen ? 'block' : 'hidden'} bg-white divide-y divide-gray-100 rounded-lg shadow mt-2 w-40 dark:bg-gray-700`}>
              <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                <li>
                  <a href="#" onClick={handleUnsubscribe} className="block px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Se désabonner</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Navbar;
