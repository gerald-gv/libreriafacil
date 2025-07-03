import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Clock, Calendar, BookOpen, Users,
  Star, MessageCircle, Armchair, TrendingUp
} from 'lucide-react';
import '../estilos/servicios.css';

const Servicios = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const servicios = [
    {
      id: 'venta',
      icono: BookOpen,
      titulo: 'Venta de Libros',
      descripcion: 'Amplia selección de libros nuevos y usados',
      detalles: [
        'Literatura clásica y contemporánea',
        'Libros académicos y de texto',
        'Literatura infantil y juvenil',
        'Autoayuda y desarrollo personal',
        'Libros de segunda mano en buen estado'
      ]
    },
    {
      id: 'espacio',
      icono: Armchair,
      titulo: 'Espacio de Lectura',
      descripcion: 'Ambiente cómodo para leer y hojear libros',
      detalles: [
        'Sillones cómodos y bien iluminados',
        'Zona tranquila para lectura',
        'Puedes revisar libros antes de comprar',
        'Ambiente relajado y acogedor'
      ]
    },
    {
      id: 'asesoria',
      icono: MessageCircle,
      titulo: 'Asesoría Personal',
      descripcion: 'Te ayudamos a encontrar el libro perfecto',
      detalles: [
        'Recomendaciones según tus gustos',
        'Orientación sobre géneros literarios',
        'Sugerencias para regalos',
        'Información sobre autores y obras'
      ]
    }
  ];

  const horarios = [
    { dia: 'Lunes a Viernes', horario: '9:00 AM - 7:00 PM', activo: [1, 2, 3, 4, 5].includes(currentDate.getDay()) },
    { dia: 'Sábados', horario: '10:00 AM - 6:00 PM', activo: currentDate.getDay() === 6 },
    { dia: 'Domingos', horario: 'Cerrado', activo: false }
  ];

  const stats = [
    { icon: BookOpen, value: '2,500+', label: 'Libros disponibles' },
    { icon: TrendingUp, value: '2', label: 'Años de experiencia' },
    { icon: Users, value: '15-20', label: 'Clientes diarios' },
    { icon: Star, value: '90%', label: 'Satisfacción cliente' }
  ];


  return (
    <div className="contenedor">
      {/* Fecha y hora */}
      <div className="header">
        <Calendar size={16} />
        <span>{currentDate.toLocaleDateString('es-ES')}</span>
        <Clock size={16} style={{ marginLeft: '1rem' }} />
        <span>{currentDate.toLocaleTimeString('es-ES')}</span>
      </div>

      {/* Estadísticas */}
      <section className="estadisticas">
        {stats.map((s, i) => (
          <div key={i} className="card">
            <div className="icon-circle"><s.icon /></div>
            <h3>{s.value}</h3>
            <p>{s.label}</p>
          </div>
        ))}
      </section>

      {/* Servicios */}
      <section className="servicios-grid">
        {servicios.map((s) => (
          <div key={s.id} className="card">
            <div className="icon-circle"><s.icono /></div>
            <h2>{s.titulo}</h2>
            <p>{s.descripcion}</p>
            <ul>
              {s.detalles.map((d, i) => <li key={i}>• {d}</li>)}
            </ul>
          </div>
        ))}
      </section>

      {/* Horarios */}
      <section className="horarios">
        {horarios.map((h, i) => (
          <div key={i} className={`horario ${h.horario === 'Cerrado' ? 'cerrado' : (h.activo ? 'abierto' : '')}`}>
            <h4>{h.dia}</h4>
            <p>{h.horario}</p>
            {h.activo && h.horario !== 'Cerrado' && <span className="estado">Abierto ahora</span>}
          </div>
        ))}
      </section>
      {/* Botón volver */}
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Link to="/" className="back-btn">← Volver al Inicio</Link>
      </div>
    </div>
  );
};

export default Servicios;
