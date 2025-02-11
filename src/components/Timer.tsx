import React, { useEffect, useState } from 'react';

const CountdownTimer: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
  const calculateDaysLeft = (): number => {
    const difference = +targetDate - +new Date();
    const daysLeft = Math.floor(difference / (1000 * 60 * 60 * 24)); // Calcula os dias restantes
    return daysLeft > 0 ? daysLeft : 0; // Retorna 0 se a data já passou
  };

  const [daysLeft, setDaysLeft] = useState<number>(calculateDaysLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setDaysLeft(calculateDaysLeft());
    }, 1000);

    return () => clearInterval(timer); // Limpa o intervalo ao desmontar o componente
  }, [targetDate]);

  return (
    <div className='text-6xl mt-32 font-mea  '>
      <h1>Faltam: {daysLeft} dia(s)</h1>
    </div>
  );
};

export default CountdownTimer;