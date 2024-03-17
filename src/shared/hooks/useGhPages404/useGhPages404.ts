import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useGhPages404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const currentURL = window.location.pathname + window.location.search;
    // Detect if we are in the GitHub Pages redirect scenario
    if (currentURL.includes('/?/')) {
      // Extract the path after the '/?/'
      const newPath = currentURL.split('/?/')[1] || '';
      // Use navigate to go to the correct path without leading slash
      navigate(newPath, { replace: true });
    }
  }, [navigate]);
};

export default useGhPages404;
