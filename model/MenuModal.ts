import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore"

export interface MenuModal {
    id: string
    name: string
    items: string[]
    price: number
    category: string
    is_veg: boolean
}

export const menuConverter = {
    toFirestore: (menu: MenuModal) => {
        return {
            id: menu.id,
            name: menu.name,
            items: menu.items,
            price: menu.price,
            category: menu.category,
            is_veg: menu.is_veg
        }
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions): MenuModal => {
        const data = snapshot.data(options);
        return {
            id: data.id,
            name: data.name,
            items: data.items,
            price: data.price,
            category: data.category,
            is_veg: data.is_veg
        }
    }
}