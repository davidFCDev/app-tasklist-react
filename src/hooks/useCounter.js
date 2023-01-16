import { useState } from 'react';

const useCounter = () => {
    const [value, setValue] = useState(0);

    // Incrementar
    const increment = (counter) => {
        setValue(counter + 1);
    };

    // Decrementar
    const decrement = (counter) => {
        setValue(counter - 1);
    };

    // Reset
    const reset = () => value === 0;

    // TODO: Develop more functions for lists

    return {
        increment, decrement, reset,
    };
};

export default useCounter;
