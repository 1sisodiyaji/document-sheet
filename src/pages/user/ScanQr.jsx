import React, { Suspense, lazy } from 'react';
import Skeleton from '../../components/common/Skeleton';
import { Helmet } from 'react-helmet';
const ScanHero = lazy(() => import('../../components/core/user/scan-qr/ScanHero'));
const ScanTabs = lazy(() => import('../../components/core/user/scan-qr/ScanTab'));
const CardGrid = lazy(() => import('../../components/core/user/scan-qr/CardGrid'));

const ScanQr = () => {
  return (
    <>
      <Helmet>
        <title>Scan QR Code | Document Sheet</title>
        <meta name="description" content="Easily scan and store QR codes with Document Sheet. Access, organize, and manage your QR code data seamlessly." />

        <meta property="og:title" content="Scan QR Code - Simplify Your Digital Management" />
        <meta property="og:description" content="Effortlessly scan QR codes with Document Sheet. Organize and access your QR code data anytime, anywhere." />
        <meta property="og:image" content="https://documentsheet.com/android-chrome-192x192.png" />
        <meta property="og:url" content="https://documentsheet.com/scan-qr" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Scan QR Code - Simplify Your Digital Management" />
        <meta name="twitter:description" content="Streamline your QR code scanning and organization with Document Sheet. Scan, store, and manage with ease." />
        <meta name="twitter:image" content="https://documentsheet.com/android-chrome-192x192.png" />
        <meta name="twitter:url" content="https://documentsheet.com/scan-qr" />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href="https://documentsheet.com/scan-qr" />

        <meta name="author" content="Somashekhar Chalavadi" />
      </Helmet>


      <Suspense fallback={<Skeleton />}>  <ScanHero />  </Suspense>
      <Suspense fallback={<Skeleton />}>  <ScanTabs />  </Suspense>
      <Suspense fallback={<Skeleton />}>   <CardGrid />  </Suspense>


    </>
  )
}

export default ScanQr