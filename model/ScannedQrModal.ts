import { MenuModal } from "./MenuModal"

interface ScannedQrModal {
    room_no: string
    hotel_name: string
    uid: string
}

export interface OrderModal {
    item: MenuModal
    quantity: number
    status: boolean
}

export interface FirebaseOrdersModel {
    date: string
    item: MenuModal
    quantity: number
    room_no: string
    status: boolean
    doc_id: string
}

export default ScannedQrModal;