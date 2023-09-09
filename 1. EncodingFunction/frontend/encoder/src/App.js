import React, { useState } from 'react';

function App() {
  const [hj, setHj] = useState('');
  const [hji, setHji] = useState('');
  const [ht, setHt] = useState('');
  const [result, setResult] = useState('');

  const encodeBaju = () => {
    try {
      if (ht >= translateKode(hji)) {
        setResult('GOOD, customer terbaik gak pake nawar');
      } else if (ht >= translateKode(hj)) {
        setResult('ACCEPT, terima kasih sudah berbelanja');
      } else {
        setResult('REJECT, belum balik modal nih');
      }
    } catch (e) {
      setResult(e.message);
    }
  };

  const translateKode = (x) => {
    const encoding = 'TEDUHASYIK';
    let result = '';

    for (let c of x) {
      let index = encoding.indexOf(c);
      if (index !== -1) {
        result += index;
      } else {
        throw new Error('Invalid character');
      }
    }
    return parseInt(result) * 1000;
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4">Encode Baju Function</h1>
        <div className="mb-4">
          <label htmlFor="hj" className="block text-sm font-semibold">
            Harga Jual:
          </label>
          <input
            type="text"
            id="hj"
            value={hj}
            onChange={(e) => setHj(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="hji" className="block text-sm font-semibold">
            Harga Jual Ideal:
          </label>
          <input
            type="text"
            id="hji"
            value={hji}
            onChange={(e) => setHji(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ht" className="block text-sm font-semibold">
            Harga Ditawar:
          </label>
          <input
            type="number"
            id="ht"
            value={ht}
            onChange={(e) => setHt(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={encodeBaju}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Encode
        </button>
        <div className="mt-4 text-lg font-semibold">{result}</div>
      </div>
    </div>
  );
}

export default App;
