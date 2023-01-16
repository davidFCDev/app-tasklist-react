import React, { useEffect } from 'react';
import Tasklist from './list/TaskList';
import Settings from './settings/Settings';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Función Anónima para crear un Componente principal
 * @returns {React.Component} Componente principal de nuestra aplicación
 */
const App = () => {
    const [dark, setDark] = React.useState(false);
    const [showSettings, setshowSettings] = React.useState(false);

/**
* Documentación del useEffect
* Se crea una variable de estado donde se almacena el valor de la configuración en localStorage
*/

useEffect(() => {
    const config = JSON.parse(localStorage.getItem('config'));
    setDark(config.theme);
}, []);

/**
* Función para intercambiar la variable de estado light <-> dark
*/

const toggleDark = () => setDark(!dark);

return (
    <div className={`${dark ? "dark" : ""}`}>
        <div className={`h-screen p-4 flex flex-col  bg-gray-300 dark:bg-slate-800 transition
            dark:text-gray-50`}>
            <Tasklist showSettings={showSettings} setshowSettings={setshowSettings} className="tasklist" />
            {/* <hr style={{ marginTop: 20, marginBottom: 20 }} /> */}
            <AnimatePresence
                initial={false}
                exitBeforeEnter={true}
                onExitComplete={() => null}
            >
                {showSettings && (<Settings toggleDark={toggleDark}/>)}
            </AnimatePresence>
        </div>
    </div>
    );
};

export default App;