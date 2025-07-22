import React from "react";
import { useSelector } from "react-redux";

const PetCard = ({ pet, onDetail }) => {

  const user = useSelector((state) => state.auth.user);

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition duration-300">
      <img
        src={pet.imageUrl}
        alt={pet.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{pet.name}</h3>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Tür:</span> {pet.species} / {pet.breed}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Cinsiyet:</span> {pet.gender}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Yaş:</span> {pet.age}
        </p>
        <p className="text-sm text-gray-600 mb-1">
          <span className="font-semibold">Açıklama:</span> {pet.description}
        </p>
        <p className="text-xs text-gray-400 mb-2">
          <span className="font-semibold">Sahibi:</span> {pet.ownerName}
        </p>
        <div className="flex justify-center items-center mt-4">
          <button 
            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm" 
            onClick={() => onDetail && onDetail(pet)}
          >
            İncele
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
