import { useState, useEffect } from 'react';
import data from '../assets/data.json';
import { useVoiceToText } from 'react-speakup';

const Konten = () => {
    const [pencarian, setPencarian] = useState('');
    const [hasilPencarian, setHasilPencarian] = useState([]);
    const [error, setError] = useState(null);
    const { startListening, stopListening, transcript } = useVoiceToText({
        lang: "id-ID",
        continuous: false,
    });
    const [transcriptVoiceKeManual, setTranscriptVoiceKeManual] = useState('');

    useEffect(() => {
        if (error) {
            console.error('Speech recognition error detected:', error);
        }
    }, [error]);

    useEffect(() => {
        if (transcript) {
            // Trim the transcript as needed
            const trimmedTranscript = transcript.trim().toLowerCase();
            setPencarian(trimmedTranscript);
            setTranscriptVoiceKeManual(trimmedTranscript);
        }
    }, [transcript]);

    const handlePencarian = (event) => {
        const nilaiPencarian = event.target.value.trim().toLowerCase();
        setPencarian(nilaiPencarian);
        setTranscriptVoiceKeManual(nilaiPencarian);

        if (nilaiPencarian === '') {
            setHasilPencarian([]);
        } else {
            performSearch(nilaiPencarian);
        }
    };

    const performSearch = (kataKunci) => {
        const hasil = data.filter((item) =>
            item.lembak.toLowerCase().includes(kataKunci) ||
            item.indo.toLowerCase().includes(kataKunci)
        );
        setHasilPencarian(hasil);
    };

    const handleStartListening = () => {
        if (!startListening.isListening) {
            setPencarian('');
            setHasilPencarian([]);
            startListening();
        } else {
            setHasilPencarian([]);
            stopListening();
        }
    };

    const handleStopListening = () => {
        stopListening();
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 bg-[#f1f1f1] h-auto">
            <div className="flex flex-col gap-8 w-full h-full">
                <div className="relative">
                    <input
                        className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                        id="username" type="text" placeholder="Cari kosakata bahasa lembak..." value={pencarian} onChange={handlePencarian} />

                    {/* Voice-to-text button */}
                    <div className="absolute right-0 inset-y-0 flex items-center cursor-pointer" id="speaker-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
                            viewBox="0 0 24 24" fill="none" onClick={handleStartListening}>
                            <path opacity="0.15"
                                d="M13 3L7 8H5C3.89543 8 3 8.89543 3 10V14C3 15.1046 3.89543 16 5 16H7L13 21V3Z"
                                fill="#000000" />
                            <path
                                d="M16 8.99998C16.5 9.49999 17 10.5 17 12C17 13.5 16.5 14.5 16 15M19 6C20.5 7.5 21 10 21 12C21 14 20.5 16.5 19 18M13 3L7 8H5C3.89543 8 3 8.89543 3 10V14C3 15.1046 3.89543 16 5 16H7L13 21V3Z"
                                stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    {/* Search icon */}
                    <div className="absolute left-0 inset-y-0 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-3 text-gray-400 hover:text-gray-500"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {/* Display search results */}
                {hasilPencarian.length > 0 ? (
                    <div>
                        <h2 className="text-lg font-semibold">Hasil Pencarian:</h2>
                        <ul>
                            {hasilPencarian.map((item, index) => (
                                <li key={index} className="p-2 bg-white border-b">
                                    <p className="font-bold">
                                        Bahasa Lembak: {item.lembak} - Bahasa Indonesia: {item.indo}
                                    </p>
                                    <ul>
                                        {item.contohkalimat.map((kalimat, i) => (
                                            <li key={i}>
                                                <p className="mt-2">Contoh Kalimat:</p>
                                                <p>
                                                    {kalimat.lembak} - {kalimat.indo}
                                                </p>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : pencarian.trim() !== '' ? (
                    <p className="text-lg text-red-500 text-center">
                        Kosakata belum dicatat pada sistem kami / belum bisa ditemukan untuk saat ini.
                    </p>
                ) : (
                    <p className="text-lg text-gray-500 text-center">
                        Cari kosakata bahasa lembak disini...
                    </p>
                )}
            </div>
            <div className="flex flex-col gap-8 w-full h-full">
                <section className="py-1">
                    <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-4">
                        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                            <div className="rounded-t mb-0 px-4 py-3 border-0 bg-blueGray-50">
                                <div className="flex flex-wrap items-center">
                                    <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                        <h3 className="font-semibold text-base text-blueGray-700">Kamus</h3>
                                    </div>
                                    <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                        <button
                                            className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button">Bahasa Lembak</button>
                                    </div>
                                </div>
                            </div>

                            <div className="block w-full overflow-x-auto">
                                <table className="items-center w-full bg-transparent border-collapse">
                                    <thead>
                                        <tr>
                                            <th
                                                className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Bahasa Lembak
                                            </th>
                                            <th
                                                className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Bahasa Indonesia
                                            </th>
                                            <th
                                                className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                                Contoh Kalimat
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {data.map((item, index) => (
                                            <tr key={index}>
                                                <th
                                                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                                    {item.lembak}
                                                </th>
                                                <td
                                                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {item.indo}
                                                </td>
                                                <td
                                                    className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                    {item.contohkalimat.map((kalimat, i) => (
                                                        <p key={i}>
                                                            {kalimat.lembak} - {kalimat.indo}
                                                        </p>
                                                    ))}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Konten;
