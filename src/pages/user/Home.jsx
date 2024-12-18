import React, { Suspense, lazy } from 'react';
import Skeleton from '../../components/common/Skeleton';
import { Helmet } from 'react-helmet';
const FiveCards = lazy(() => import ('../../components/core/user/home/FiveCards'));
const Hero = lazy(() => import('../../components/core/user/home/Hero'));
const Cards = lazy(() => import('../../components/core/user/home/Cards'));
const Scan = lazy(() => import('../../components/core/user/home/Scan'));
const Empowering = lazy(() => import('../../components/core/user/home/Empowering'));
const Testimonial = lazy(() => import('../../components/common/Testimonial'));
const FAQ = lazy(() => import('../../components/core/user/home/FAQ'));

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Document Sheet - Your Digital Document Manager</title>
                <meta name="description" content="Document Sheet is your ultimate note management solution. Easily store, organize, and access your documents and notes." />
                 
                <meta property="og:title" content="Document Sheet - Your Digital Document Manager" />
                <meta property="og:description" content="Organize and manage your notes with ease using Document Sheet. Create, share, and collaborate on notes." />
                <meta property="og:image" content="https://documentsheet.com/android-chrome-192x192.png" />
                <meta property="og:url" content="https://documentsheet.com" />
                <meta property="og:type" content="website" />
                 
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Document Sheet - Your Digital Document Manager" />
                <meta name="twitter:description" content="Organize and manage your notes with ease using Document Sheet. Create, share, and collaborate on notes." />
                <meta name="twitter:image" content="https://documentsheet.com/android-chrome-192x192.png" />
                <meta name="twitter:url" content="https://documentsheet.com" />
 
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://documentsheet.com" />
                <meta name="author" content="Somashekhar chalavadi" />
            </Helmet>
            <Suspense fallback={<Skeleton />}>  <Hero />  </Suspense>
            <Suspense fallback={<Skeleton />}> <Cards /> </Suspense>
            <Suspense fallback={<Skeleton />}>  <Scan />  </Suspense>
            <Suspense fallback={<Skeleton />}> <Empowering /> </Suspense>
            <Suspense fallback={<Skeleton />}> <FiveCards /> </Suspense>
            <Suspense fallback={<Skeleton />}>  <Testimonial />  </Suspense>
            <Suspense fallback={<Skeleton />}> <FAQ />  </Suspense>

        </>
    );
};

export default Home;
