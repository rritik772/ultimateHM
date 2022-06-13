import { FirebaseOrdersModel } from "../../model/ScannedQrModal";

const get_roomnos = (menu_json: FirebaseOrdersModel[]): string[] => {
    return Array.from(
        new Set(
            menu_json.map(item => item.room_no)
        )
    )
}

const get_orders_as_roomno = (
    room_nos: string[],
    orders_json: FirebaseOrdersModel[]
): Map<string, FirebaseOrdersModel[]> => {
    const filtered_with_category = new Map();

    for (let room_no of room_nos) {
        filtered_with_category.set(
            room_no, orders_json.filter(
                item => item.room_no === room_no
            )
        )
    }

    return filtered_with_category;
}

const filterOrders = (orders_json: FirebaseOrdersModel[]): Map<string, FirebaseOrdersModel[]> => {
    const room_nos = get_roomnos(orders_json)
    const filtered_with_category = get_orders_as_roomno(room_nos, orders_json);

    return filtered_with_category;
}


export default filterOrders;