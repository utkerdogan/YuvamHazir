import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, updateUser } from "../store/authSlice";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

const UserProfilePage = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
    });

    const [petData, setPetData] = useState({
        name: "",
        species: "",
        breed: "",
        gender: "Erkek",
        age: "",
        description: "",
        image: ""
    });

    const [showPetForm, setShowPetForm] = useState(false);

    const handleUserChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePetChange = (e) => {
        setPetData({ ...petData, [e.target.name]: e.target.value });
    };

    const handleUserUpdate = (e) => {
        e.preventDefault();
        
        try {
            dispatch(updateUser(formData));
            toast.success('Profil bilgileriniz güncellendi!');
        } catch (error) {
            toast.error('Güncelleme sırasında bir hata oluştu');
        }
    };
    const handlePetSubmit = (e) => {
        e.preventDefault();
        const mockPetData = {
            ...petData,
            id: Date.now().toString(),
            userId: user.id,
        };
        console.log("Gönderilen mock veri:", mockPetData);
        toast.success('Evcil hayvan bilgileri kaydedildi');
        setPetData({
            name: "",
            species: "",
            breed: "",
            gender: "Erkek",
            age: "",
            description: "",
            image: ""
        });
        setShowPetForm(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        toast.info('Çıkış yapılıyor...');
        history.push("/");
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sol Panel - Profil Bilgileri */}
                <div className="w-full md:w-1/4 bg-white shadow rounded-lg p-4">
                    <div className="flex flex-col items-center mb-4">
                        <div className="relative mb-2">
                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-600">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                                {user?.points || 0}
                            </div>
                        </div>
                        <h2 className="font-bold">{user?.name}</h2>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>

                    <div className="space-y-2">
                        <button
                            onClick={() => history.push("/orders")}
                            className="w-full text-left p-2 hover:bg-gray-100 rounded"
                        >
                            🛒 Siparişlerim
                        </button>
                        <button
                            onClick={() => setShowPetForm(!showPetForm)}
                            className="w-full text-left p-2 hover:bg-gray-100 rounded"
                        >
                            🐾 Evcil Hayvan Sahiplendir
                        </button>
                        <button
                            onClick={() => history.push("/favorites")}
                            className="w-full text-left p-2 hover:bg-gray-100 rounded"
                        >
                            ❤️ Favorilerim
                        </button>
                        <button
                            onClick={() => history.push("/addresses")}
                            className="w-full text-left p-2 hover:bg-gray-100 rounded"
                        >
                            📦 Adreslerim
                        </button>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left p-2 hover:bg-gray-100 rounded text-red-500"
                        >
                            🚪 Çıkış Yap
                        </button>
                    </div>
                </div>

                {/* Ana İçerik */}
                <div className="flex-1">
                    {/* Profil Güncelleme Formu */}
                    <div className="bg-white shadow rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-bold mb-4">Profil Bilgileri</h2>
                        <form onSubmit={handleUserUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">İsim</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleUserChange}
                                    className="w-full border rounded p-2"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">E-posta</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleUserChange}
                                    className="w-full border rounded p-2"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Bilgileri Güncelle
                            </button>
                        </form>
                    </div>

                    {/* Evcil Hayvan Formu (Açılır/Kapanır) */}
                    {showPetForm && (
                        <div className="bg-white shadow rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">Evcil Hayvan Sahiplendir</h2>
                            <form onSubmit={handlePetSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="İsim"
                                    value={petData.name}
                                    onChange={handlePetChange}
                                    required
                                    className="border rounded p-2"
                                />
                                <input
                                    type="text"
                                    name="species"
                                    placeholder="Tür (species)"
                                    value={petData.species}
                                    onChange={handlePetChange}
                                    required
                                    className="border rounded p-2"
                                />
                                <input
                                    type="text"
                                    name="breed"
                                    placeholder="Cinsi (breed)"
                                    value={petData.breed}
                                    onChange={handlePetChange}
                                    className="border rounded p-2"
                                />
                                <select
                                    name="gender"
                                    value={petData.gender}
                                    onChange={handlePetChange}
                                    className="border rounded p-2"
                                >
                                    <option value="Erkek">Erkek</option>
                                    <option value="Dişi">Dişi</option>
                                </select>
                                <input
                                    type="number"
                                    name="age"
                                    placeholder="Yaş"
                                    value={petData.age}
                                    onChange={handlePetChange}
                                    className="border rounded p-2"
                                />
                                <input
                                    type="text"
                                    name="image"
                                    placeholder="Fotoğraf URL"
                                    value={petData.image}
                                    onChange={handlePetChange}
                                    className="border rounded p-2"
                                />
                                <textarea
                                    name="description"
                                    placeholder="Açıklama"
                                    value={petData.description}
                                    onChange={handlePetChange}
                                    rows={3}
                                    className="col-span-1 sm:col-span-2 border rounded p-2"
                                />
                                <div className="col-span-1 sm:col-span-2 flex justify-end space-x-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowPetForm(false)}
                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                                    >
                                        İptal
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                    >
                                        Sahiplendirmeye Ekle
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;