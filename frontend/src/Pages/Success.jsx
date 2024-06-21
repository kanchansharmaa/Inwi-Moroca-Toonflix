import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import axios from 'axios';
import * as animationData from './AnimationLoading.json';
import Cookies from 'js-cookie'
const DoiRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const url = '/redirectlogs';
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const getParams = (search) => {
    const params = new URLSearchParams(search);
    return {
      clickid: params.get('clickid'),
      reason: params.get('reason'),
      msisdn: params.get('msisdn')
    };
  };

  useEffect(() => {
    const { clickid, reason, msisdn } = getParams(location.search);
    const currentUrl = window.location.href;
    console.log("url", currentUrl)
    const adjustedNumber = msisdn.trim().startsWith('212') ? msisdn.trim() : `212${msisdn.trim()}`;
    axios.post(url, { clickid, reason, adjustedNumber, currentUrl })
      .then(response => {
        setLoading(true)
        if (response.data=='Success') {
          console.log("response", response.data)
          if (reason.toLowerCase() === 'success' || reason.toLowerCase() === 'already_subscribed') {
            Cookies.set('msisdn',adjustedNumber)
            setTimeout(() => {
              setLoading(true)
              navigate('/home');
            }, 1000);
          } else if (reason.toLowerCase() === 'failure') {
            setTimeout(() => {
              navigate('/error');
            }, 2000);
          } else {
            navigate('/login');
          }
        } else {
          // handle the case where the POST request did not succeed
          navigate('/error');
        }
      })
      .catch(error => {
        console.error('There was an error making the POST request!', error);
        navigate('/error');
      })
      .finally(() => {
        setLoading(false);
      });

  }, [location, navigate]);

  return (
    <div>
      {loading && <Lottie options={defaultOptions} height={500} width={500} className="px-5" />}
    </div>
  );
};

export default DoiRedirect;
