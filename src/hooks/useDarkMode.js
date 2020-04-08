import useLocalStorage from './useLocalStorage';
import { useEffect } from 'react';

const useDarkMode = (value) => {
    const [dark, setDark] = useLocalStorage("darkmode", value);
    
    useEffect(() => {
        if (dark) {
            document.body.classList.add("dark-mode");
        } else document.body.classList.remove('dark-mode');
    }, [dark])

    return [dark, setDark];
}

export default useDarkMode;