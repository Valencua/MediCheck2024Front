import Head from 'next/head';
import BottomNavBar from '../components/BottomNavBar/BottomNavBar';
import '../styles/globals.css'
import Calendar from "../components/Calendar/Calendar";

export default function Home() {
    return (
        <div>
            <Head>
                <title>HabitosSaludables PWA</title>
                <meta name="description" content="HabitosSaludables PWA with Next.js" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Calendar />
            </main>
            <BottomNavBar />
        </div>
    );
}
