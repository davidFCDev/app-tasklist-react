import React from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

const defaultConfig = {
  theme: 'dark',
  lang: 'es',
};

export default function Settings({ toggleDark }) {
  const [config, setConfig] = useLocalStorage('config', defaultConfig);

  /**
   * Función para intercambiar light <-> dark tanto en localStorage como en estado de la aplicación
   * @param {*} event - Evento de click proveniente de React
   */

  const toggleMode = (event) => {
    event.preventDefault();
    setConfig((oldConfig) => ({
      ...oldConfig,
      theme: oldConfig.theme === 'light' ? 'dark' : 'light',
    }));
    toggleDark();
  };

  return (
    <div className='text-right mr-2'>
      <hr className="my-4"/>
      <h1 className="title">Settings</h1>
      <button className="btn mt-4" type="button" onClick={toggleMode}>
        DarkMode
      </button>
    </div>
  );
}
