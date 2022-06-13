import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Footbar from "../components/appbar/Footbar";
import Loading from "../components/loading/Loading";
import useAuth from "../context/auth/AuthContext";
import { SignupModal } from "../model/UserModel";
import NavBar from "./../components/appbar/Navbar";

const SignupPage = () => {
    const [hotelName, setHotelName] = useState<string>("");
    const [ownerName, setOwnerName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [phone, setPhone] = useState<number>(0);
    const [adminKey, setAdminKey] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    const { signup_new_user } = useAuth();
    const router = useRouter();

    const handleSignUp = async () => {
        setLoading(true);

        if (hotelName.length < 3) toast.warning("Hotel name too short");
        else if (ownerName.length < 4) toast.warning("Owner name too short")
        else if (email.length < 5) toast.warning("Email too short");
        else if (password.length < 5) toast.warning("Password too short");
        else if (confirmPassword.length < 5) toast.warning("Confirm password too short");
        else if (phone.toString().length < 10) toast.warning("phone number too short");
        else if (adminKey.length != 8) toast.warning("Wrong admin key length");
        else if (password !== confirmPassword) toast.warning("Confirm password and password does not match");
        else {
            const signupModal: SignupModal = {
                hotel_name: hotelName,
                owner_name: ownerName,
                email: email,
                reception_ph: phone,
                password: password,
                admin_key: adminKey
            }
    
            const response = await signup_new_user(signupModal);
            if (response === 'User created'){
                toast.success('User created');
                router.push('/loginpage')
            } else if (response === 'Wrong admin key') toast.warning('Wrong admin key');
            else toast.error(response);
        }

        setLoading(false);
    };

    return (
        <div>
            <NavBar />
            <div className="d-flex justify-content-center align-items-center">
                <span className="dmdisplay-regular border border-2 border-primary fs-1 shadow rounded px-5 py-2">
                    Create Account
                </span>
            </div>

            <div className="d-flex justify-content-center">
                <form className="col-lg-4 col-sm-9 m-3 p-4 border border-2 border-primary rounded shadow bg-light">
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="hotelname"
                            placeholder="ultimatehotel"
                            value={hotelName}
                            onChange={(e) => setHotelName(e.target.value)}
                        />
                        <label htmlFor="hotelname">Hotel Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="ownername"
                            placeholder="someone otherone"
                            value={ownerName}
                            onChange={(e) => setOwnerName(e.target.value)}
                        />
                        <label htmlFor="ownername">Owner Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="someone@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="email">Email address</label>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="confirmpassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <label htmlFor="confirmpassword">Confirm Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="phone"
                                    value={phone}
                                    onChange={(e) => setPhone(parseInt(e.target.value))}
                                />
                                <label htmlFor="phone">Reception PH. no.</label>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="admin-key"
                                    value={adminKey}
                                    onChange={(e) => setAdminKey(e.target.value)}
                                />
                                <label htmlFor="admin-key">Admin Key</label>
                            </div>
                        </div>
                    </div>
                    <button
                        className="btn btn-primary"
                        type="button"
                        disabled={loading ? true : false}
                        onClick={handleSignUp}
                    >
                        {loading && (
                            <span
                                className="spinner-border spinner-border-sm me-2"
                                role="status"
                                aria-hidden="true"
                            ></span>
                        )}
                        Submit
                    </button>
                </form>
            </div>
            <Footbar />
        </div>
    );
};

export default SignupPage;
