import React, { Suspense, lazy } from 'react';
import Skeleton from '../../components/common/Skeleton';
import { Helmet } from 'react-helmet';
const AboutCard = lazy(() => import('../../components/core/user/About/AboutCard'));
const AboutTabs = lazy(() => import('../../components/core/user/About/AboutTabs'));
const CTA = lazy(() => import('../../components/common/CTA'));
const HeroAbout = lazy(() => import('../../components/core/user/About/HeroAbout'));

const About = () => {
    return (
        <>
            <Helmet>
                <title>About Us | Document Sheet</title>
                <meta name="description" content="Learn about Document Sheet, the leading digital solution for organizing and managing your notes and documents. Discover how our innovative platform simplifies collaboration, storage, and accessibility." />

                <meta property="og:title" content="About Document Sheet - The Ultimate Note Manager" />
                <meta property="og:description" content="Learn more about how Document Sheet helps you organize, store, and collaborate on your notes and documents effortlessly." />
                <meta property="og:image" content="https://documentsheet.com/android-chrome-192x192.png" />
                <meta property="og:url" content="https://documentsheet.com/about" />
                <meta property="og:type" content="website" />


                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="About Document Sheet - The Ultimate Note Manager" />
                <meta name="twitter:description" content="Explore how Document Sheet transforms your note-taking and document management experience with powerful features and seamless collaboration." />
                <meta name="twitter:image" content="https://documentsheet.com/android-chrome-192x192.png" />
                <meta name="twitter:url" content="https://documentsheet.com/about" />

                <meta name="robots" content="index, follow" />

                <link rel="canonical" href="https://documentsheet.com/about" />

                <meta name="author" content="Somashekhar chalavadi" />
            </Helmet>

            <Suspense fallback={<Skeleton />}>  <HeroAbout />  </Suspense>
            <Suspense fallback={<Skeleton />}> <AboutTabs /> </Suspense>
            <Suspense fallback={<Skeleton />}>  <AboutCard /> </Suspense>
            <Suspense fallback={<Skeleton />}>  <CTA title="Create Your New Document Sheet with Ease" text=" Start your journey to effortless documentation. Create your sheets in a few clicks, and access them securely anytime, anywhere." btnText="Create Your Sheet" /></Suspense>


        </>
    );
};

export default About;
