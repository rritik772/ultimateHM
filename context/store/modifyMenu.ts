import { addDoc, collection, doc, getDocs, query, setDoc } from "firebase/firestore"
import { database } from "../../firebase"
import { MenuModal } from "../../model/MenuModal"
import { UserModal } from "../../model/UserModel"

export const add_menu = async (user: UserModal, menuModal: MenuModal): Promise<string> => {
    const path = `menu/${user.uid}/${user.hotel_name}`
    return addDoc(collection(database, path), menuModal)
        .then(async (docRef) => {
            const { id } = docRef;
            return await setDoc(doc(database, `${path}/${id}`), {id: id}, {merge: true})
                .then(() => 'Added Successfully')
                .catch(() => 'Error while modifying')
        })
        .catch(() => 'Not able add menu')
} 

export const get_menu = async (user: UserModal): Promise<MenuModal[]> => {
    const result: MenuModal[] = []
    const path = `menu/${user.uid}/${user.hotel_name}`;

    const querySnap = await getDocs(query(collection(database, path)));
    querySnap.forEach(item => {
        result.push(item.data() as MenuModal);
    })

    return result
}

const add_hotel_detail_to_menu = async (user: UserModal) => {
    return await setDoc(doc(database, 'users', user.uid), user, {merge: true})
        .then(() => 'User created')
        .catch(() => 'Cannot add User Info')
}

export const modify_menu = async (user: UserModal, menuModal: MenuModal): Promise<string> => {
    const path = `menu/${user.uid}/${user.hotel_name}/${menuModal.id}`
    return await setDoc(doc(database, path), menuModal)
        .then(() => 'Updated Successfully')
        .catch(() => 'Cannot update menu')
}