import Head from 'next/head';
import Calendar from '../components/Calendar';
import BottomNavBar from '../components/BottomNavBar';
import '../styles/globals.css'
export default function Home() {
    return (
        <div>
            <Head>
                <title>Calendar PWA</title>
                <meta name="description" content="Calendar PWA with Next.js" />
                <link rel="icon" href="../app/favicon.ico" />
            </Head>

            <main>
                <Calendar />
            </main>
            <BottomNavBar />
        </div>
    );
}