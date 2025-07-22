
import { useHistory } from "react-router-dom";

const HeroSection = () => {
  const history = useHistory();

  return (
    <section className="flex bg-blue-100 my-4 py-28 px-4 md:w-full border-solid rounded-lg shadow-lg">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Hayvan Dostlarımızla Yeni Bir Başlangıç
        </h1>
        <p className="text-gray-600 text-lg mb-6">
          Sitemizde sahiplendirme, bakım ve destek süreçlerini keşfedin.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => history.push("/Pets")}
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700"
          >
            Hayvanlarımız
          </button>
          <button
            onClick={() => history.push("/Contact")}
            className="bg-white border border-blue-600 text-blue-600 px-6 py-3 rounded-full hover:bg-blue-100"
          >
            İletişime Geçin!
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
