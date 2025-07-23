import React, { useEffect, useState } from "react";
import api from "../api/api";
import PetCard from "../components/PetCard";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [speciesOptions, setSpeciesOptions] = useState([]);
  const [selectedSpecies, setSelectedSpecies] = useState("Hepsi");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const history = useHistory();

  useEffect(() => {
    api.get("/Pet")
      .then((res) => {
        setPets(res.data);
        setLoading(false);

        // Tüm türleri (species) ayıkla ve unique olanları bul
        const species = ["Hepsi", ...Array.from(new Set(res.data.map(p => p.species)))];
        setSpeciesOptions(species);
        setFilteredPets(res.data);
      })
      .catch((err) => {
        setError("Hayvanlar yüklenemedi.");
        setLoading(false);
        console.error("Pet fetch error:", err);
      });
  }, []);

  // Tür seçildikçe filtrele
  useEffect(() => {
    if (selectedSpecies === "Hepsi") {
      setFilteredPets(pets);
    } else {
      setFilteredPets(pets.filter(pet => pet.species === selectedSpecies));
    }
  }, [selectedSpecies, pets]);

  const handleDetail = (pet) => {
    toast(`${pet.name} detayına gidiyor!`);
    history.push(`/Pet/${pet.id}`);
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      {/* Tür (species) filtresi */}
      <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
        <label htmlFor="species" className="font-semibold">Tür Seç:</label>
        <select
          id="species"
          value={selectedSpecies}
          onChange={e => setSelectedSpecies(e.target.value)}
          className="border p-2 rounded shadow-sm min-w-[150px]"
        >
          {speciesOptions.map(sp => (
            <option key={sp} value={sp}>{sp}</option>
          ))}
        </select>
      </div>

      {/* Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPets.length === 0 ? (
          <div className="col-span-full text-gray-600">Bu türe ait hayvan bulunamadı.</div>
        ) : (
          filteredPets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              onDetail={handleDetail}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default PetList;
