import React from 'react';
import Modal from './modal/Modal';

export default function Card({ region }) {
  return (
    <div className='card'>
      <ul>
        <li>
          Name: <span>{region.name}</span>
        </li>
        <li>
          Icao: <span>{region.icao}</span>
        </li>
        <li>
          Altitude: <span>{region.position.altitude}</span>
        </li>
        <li>
          Longitude: <span>{region.position.longitude}</span>
        </li>
        <li>
          Latitude: <span>{region.position.latitude}</span>
        </li>
      </ul>
      <div className='btn'>
        <Modal airport={region.name} icao={region.icao} />
      </div>
    </div>
  );
}
