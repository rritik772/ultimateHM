import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Footbar from '../components/appbar/Footbar';
import Loading from '../components/loading/Loading';
import useAuth from '../context/auth/AuthContext';
import { LoginModal } from '../model/UserModel';
import NavBar from './../components/appbar/Navbar';

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const { isLoggedIn, login_user } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        setLoading(true);

        if (email.length < 4) toast.warning('Email too short');
        else if (password.length < 3) toast.warning('Password too short.');
        else {
            const loginModal: LoginModal = {
                email: email,
                password: password
            }

            const response = await login_user(loginModal);
            if (response === 'Logged in') {
                toast.success(response);
                router.push('/admin/menupage')
            }
            else toast.error(response);
        }

        setLoading(false);
    }

    useEffect(() => {
        if (isLoggedIn) router.push('/admin/menupage')
    }, [isLoggedIn])

    return (
        <div>
            <NavBar />

            <div className="d-flex justify-content-center align-items-center">
                <span className="dmdisplay-regular border border-2 border-primary fs-1 shadow rounded px-5 py-2">Login</span>
            </div>

            <div className="d-flex justify-content-center">
                <form className="col-lg-4 col-sm-9 m-3 p-4 border border-2 border-primary rounded shadow bg-light">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control mont-semibold"
                            id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            aria-describedby="email"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control mont-semibold"
                            id="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="btn btn-primary" type="button" disabled={(loading)?true:false} onClick={handleLogin}>
                        {
                            loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        }
                        Submit
                    </button>
                </form>
            </div>
            <Footbar />
        </div>
    )
}

export default Login;
