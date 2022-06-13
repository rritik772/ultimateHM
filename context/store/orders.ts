import { addDoc, collection, deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { database } from "../../firebase";
import ScannedQrModal, { FirebaseOrdersModel, OrderModal } from "../../model/ScannedQrModal";
import { UserModal } from "../../model/UserModel";

export const place_order = async (scannedOrCode: ScannedQrModal, orderModal: OrderModal): Promise<string> => {
    const path = `/orders/${scannedOrCode.uid}/${scannedOrCode.hotel_name}`
    return await addDoc(collection(database, path), {
        room_no: scannedOrCode.room_no,
        item: orderModal.item,
        quantity: orderModal.quantity,
        status: orderModal.status,
        date_time: serverTimestamp()
    })
    .then(() => 'Order placed successfully')
    .catch(() => 'something happned')
}

export const delete_order = async (user: UserModal, orderModal: FirebaseOrdersModel): Promise<string> => {
    const path = `/orders/${user.uid}/${user.hotel_name}/${orderModal.doc_id}`
    return await deleteDoc(doc(database, path))
        .then(() => 'Deleted Succesfully')
        .catch(() => 'Something is wrong')
}

export const modify_order = async (user: UserModal, orderModal: FirebaseOrdersModel): Promise<string> => {
    const path = `/orders/${user.uid}/${user.hotel_name}/${orderModal.doc_id}`
    console.log(path)
    return await setDoc(doc(database, path), orderModal)
        .then(() => 'Order updated')
        .catch(() => 'Cannot update the order')
}
