import { User } from "firebase/auth";
import { login_user, signup_new_user } from "../context/auth/UserAuth";
import { LoginModal, SignupModel } from "./UserModel";

export const defaultAuthContextModal: AuthContextModal = {
    loading: false,
    isLoggedIn: false,
    currentUser: undefined,
    signup_new_user: signup_new_user,
    login_user: login_user
}

interface AuthContextModal {
    loading: boolean
    isLoggedIn: boolean
    currentUser: User | undefined
    signup_new_user: (signupModel: SignupModel) => Promise<string>
    login_user: (loginModal: LoginModal) => Promise<string>
}

export default AuthContextModal;