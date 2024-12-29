import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

const QrCodeScanner = () => {
  const [qrResult, setQrResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);  // State to manage if scanner is active

  const startScanner = () => {
    setIsScanning(true);
  };

  const stopScanner = () => {
    setIsScanning(false);
    setQrResult(null); // Optionally clear the result when stopping the scanner
  };

  const handleScan = (result) => {
    if (result) {
      setQrResult(result[0].rawValue);
      console.log('Scanned result:', result[0].rawValue);
    }
  };

  const handleError = (err) => {
    console.error('Scanning error:', err);
  };

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      <div className="flex space-x-4">
        <button
          onClick={startScanner}
          disabled={isScanning}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg disabled:bg-gray-400"
        >
          Start Scanner
        </button>
        <button
          onClick={stopScanner}
          disabled={!isScanning}
          className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg disabled:bg-gray-400"
        >
          Stop Scanner
        </button>
      </div>

      {/* Show the scanner if it's active */}
      {isScanning && (
        <div className="w-full max-w-md h-96  rounded-lg overflow-hidden shadow-md">
          <Scanner
            onScan={handleScan}
            onError={handleError}
            scanDelay={300}
            formats={['qr_code', 'ean_13', 'upc_a']}
            paused={false}
          />
        </div>
      )}

      <div className="text-center mt-2">
        {qrResult ? (
          <div>
            <h3 className="text-xl font-bold">Scanned Result:</h3>
            <p className="text-lg">{qrResult}</p>
          </div>
        ) : (
          <p className="text-gray-500">No result yet. Please scan a QR code or barcode!</p>
        )}
      </div>
    </div>
  );
};

export default QrCodeScanner;
