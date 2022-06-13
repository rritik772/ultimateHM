import { createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, database } from "../../firebase"
import { LoginModal, SignupModal, UserModalDefault, UserModal } from "../../model/UserModel"

const get_admin_key = async (): Promise<string> => {
    const secrets = await getDoc(doc(database, 'projectInfo', 'secrets'))
    if (secrets.exists()) 
        return secrets.data()['admin_key'];
    return '';
}

const saveNewUserInfo = async (uid: string, signupModel: SignupModal): Promise<string> => {
    const userInfo: UserModal = {
        uid: uid,
        hotel_name: signupModel.hotel_name,
        owner_name: signupModel.owner_name,
        email: signupModel.email,
        reception_ph: signupModel.reception_ph
    }

    return await setDoc(doc(database, 'users', uid), userInfo)
        .then(() => 'User created')
        .catch(() => 'Cannot add User Info')
}

export const signup_new_user = async (signupModel: SignupModal): Promise<string> => {
    const is_admin_key_correct = await get_admin_key() === signupModel.admin_key;
    if (!is_admin_key_correct) return 'Wrong admin key';

    return await createUserWithEmailAndPassword(auth, signupModel.email, signupModel.password)
        .then(async (userCred) => {
            const {user} = userCred;
            return await saveNewUserInfo(user.uid, signupModel);
        })
        .catch((err) => {
            console.error(err);
            return 'Something went wrong';
        })
}

export const login_user = async (loginModal: LoginModal): Promise<string> => {
    return await signInWithEmailAndPassword(auth, loginModal.email, loginModal.password)
        .then(() => 'Logged in')
        .catch(() => 'Something went wrong')
}

export const get_user_details = async (uid: string): Promise<UserModal> => {
    const docSnap = await getDoc(
        doc(database, 'users', uid)
    );
    if (docSnap.exists()) return docSnap.data() as UserModal;
    return UserModalDefault;
}