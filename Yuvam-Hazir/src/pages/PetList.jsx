import React, { useEffect, useState } from "react";
import api from "../api/api";
import PetCard from "../components/PetCard";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const PetList = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const history = useHistory();

  useEffect(() => {
    api.get("/Pet")
      .then((res) => {
        setPets(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Hayvanlar yüklenemedi.");
        setLoading(false);
        console.error("Pet fetch error:", err);
      });
  }, []);

  const handleDetail = (pet) => {
    toast(`${pet.name} detayına gidiyor!`);
    history.push(`/Pet/${pet.id}`);
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {pets.map((pet) => (
        <PetCard
          key={pet.id}
          pet={pet}
          onDetail={handleDetail}
        />
      ))}
    </div>
  );
};

export default PetList;
