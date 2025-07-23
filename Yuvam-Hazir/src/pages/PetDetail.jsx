import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { FaPaw, FaVenusMars, FaBirthdayCake, FaPhone, FaUser } from "react-icons/fa";
import { GiDogBowl, GiCat } from "react-icons/gi";

const PetDetail = () => {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get(`/Pet/${id}`)
        .then((res) => {
            setPet(res.data);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Pet detail fetch error:", err);
            setError("Hayvan bilgisi getirilemedi.");
            setLoading(false);
        });
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
    );
    
    if (error) return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 max-w-6xl mx-auto my-6">
            <p>{error}</p>
        </div>
    );
    
    if (!pet) return null;

    // Tür ikonu seçimi
    const speciesIcon = pet.species === "Köpek" ? (
        <GiDogBowl className="text-amber-600" />
    ) : pet.species === "Kedi" ? (
        <GiCat className="text-gray-600" />
    ) : (
        <FaPaw className="text-green-600" />
    );

    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
            {/* Sol: Pet Bilgisi */}
            <div className="md:col-span-2 space-y-6">
                <div className="relative">
                    <img
                        src={pet.imageUrl || "https://via.placeholder.com/800x500?text=Pet+Image"}
                        alt={pet.name}
                        className="w-full h-80 md:h-96 object-cover rounded-lg shadow-lg"
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/800x500?text=Pet+Image"
                        }}
                    />
                    <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                        <span className="font-semibold text-gray-800">{pet.species}</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{pet.name}</h2>
                    
                    <div className="flex flex-wrap gap-4 my-4">
                        <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-full">
                            {speciesIcon}
                            <span className="text-gray-700">{pet.species}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-pink-50 px-3 py-2 rounded-full">
                            <FaVenusMars className="text-pink-500" />
                            <span className="text-gray-700">{pet.gender}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-amber-50 px-3 py-2 rounded-full">
                            <FaBirthdayCake className="text-amber-500" />
                            <span className="text-gray-700">{pet.age} yaşında</span>
                        </div>
                    </div>

                    {pet.breed && (
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-700">Cins</h3>
                            <p className="text-gray-600">{pet.breed}</p>
                        </div>
                    )}

                    <div className="mt-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Hakkında</h3>
                        <p className="text-gray-700 leading-relaxed">
                            {pet.description || "Bu sevimli dostumuz hakkında henüz bir açıklama eklenmemiş."}
                        </p>
                    </div>
                </div>

                {/* Ekstra bilgiler bölümü */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Sağlık ve Bakım Bilgileri</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h4 className="font-medium text-gray-700">Aşı Durumu</h4>
                            <p className="text-gray-600">{pet.vaccinationStatus || "Bilinmiyor"}</p>
                        </div>
                        <div>
                            <h4 className="font-medium text-gray-700">Özel İhtiyaçlar</h4>
                            <p className="text-gray-600">{pet.specialNeeds || "Yok"}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sağ: Sahip Bilgisi ve İletişim */}
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                        <FaUser className="text-blue-500" />
                        <span>Sahip Bilgileri</span>
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Ad Soyad</p>
                            <p className="font-medium">{pet.owner?.fullName || "Bilinmiyor"}</p>
                        </div>
                        
                        <div>
                            <p className="text-sm text-gray-500">İletişim</p>
                            <div className="flex justify-center items-center space-x-2 mt-1">
                                <FaPhone className="text-green-500" />
                                <a 
                                    href={`tel:${pet.owner?.phoneNumber}`} 
                                    className="font-medium hover:text-blue-600 transition-colors"
                                >
                                    {pet.owner?.phoneNumber || "Belirtilmemiş"}
                                </a>
                            </div>
                        </div>
                    </div>

                    <button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2">
                        <FaPhone />
                        <span>Mesaj Gönder</span>
                    </button>
                </div>

                {/* İlginç Bilgiler */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                        <FaPaw className="text-amber-500" />
                        <span>İlginç Bilgiler</span>
                    </h3>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start space-x-2">
                            <span className="text-amber-500">•</span>
                            <span>{pet.species === "Köpek" ? "Köpekler" : pet.species === "Kedi" ? "Kediler" : "Evcil hayvanlar"} insan duygularını anlayabilir.</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="text-amber-500">•</span>
                            <span>{pet.age} yaş, insan yaşına göre yaklaşık {pet.species === "Köpek" ? pet.age * 7 : pet.species === "Kedi" ? pet.age * 4 : pet.age * 5} yıla denk gelir.</span>
                        </li>
                        <li className="flex items-start space-x-2">
                            <span className="text-amber-500">•</span>
                            <span>{pet.species === "Kedi" ? "Kediler" : "Evcil dostlarımız"} günde ortalama 12-16 saat uyurlar.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PetDetail;