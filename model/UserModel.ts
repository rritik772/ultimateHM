export interface SignupModal {
    hotel_name: string
    owner_name: string
    email: string
    reception_ph: number
    password: string
    admin_key: string
}

export interface LoginModal {
    email: string
    password: string
}

export interface UserModal {
    uid: string
    hotel_name: string
    owner_name: string
    email: string
    reception_ph: number
}

export const UserModalDefault: UserModal = {
    uid: '',
    hotel_name: '',
    owner_name: '',
    email: '',
    reception_ph: 0
}
