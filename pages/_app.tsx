import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'react-toastify/dist/ReactToastify.css'


import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { AuthProvider } from '../context/auth/AuthContext';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap")
    })

    return (
        <div className="mont-regular">
            <ToastContainer
                position="top-right"
                autoClose={4000}
                closeButton={true}
                closeOnClick={true}
                draggable={true}
                newestOnTop={true}
            />

            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </div>
    )
}

export default MyApp
