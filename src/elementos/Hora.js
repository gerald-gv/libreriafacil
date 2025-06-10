import React, { useEffect, useState } from 'react';

const Hora = () => {
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(new Date());
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  let h = hora.getHours();
  let m = hora.getMinutes();
  let s = hora.getSeconds();
  let ampm = h >= 12 ? 'PM' : 'AM';

  h = h % 12;
  h = h ? h : 12; // el 0 se convierte en 12
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;

  return <p style={{ color: '#fff', marginTop: '5px' }}>{h}:{m}:{s} {ampm}</p>;
};

export default Hora;
