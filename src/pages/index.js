import Head from 'next/head';
import '../styles/globals.css';
import Login from "../components/Login/Login";
import { EventsProvider } from '../utils/EventsProvider';

export default function Home() {
    return (
        <EventsProvider>
            <div>
                <Head>
                    <title>HabitosSaludables PWA</title>
                    <meta name="description" content="HabitosSaludables PWA with Next.js" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <main>
                    <Login />
                </main>
            </div>
        </EventsProvider>
    );
}
