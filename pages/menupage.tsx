import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Menu from "../components/menu/Menu";
import { get_user_details } from "../context/auth/UserAuth";
import { UserModal, UserModalDefault } from "../model/UserModel";

const MenuPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [uid, setUid] = useState<string>('');
    const [roomNo, setRoomNo] = useState<string>('');
    const [user, setUser] = useState<UserModal>(UserModalDefault);
    const router = useRouter()

    const get_user = async (uid: string) => {
        if (uid)
            setUser(await get_user_details(uid));
    }

    useEffect(() => {
        const { id, room_no } = router.query;
        setUid(id as string);
        setRoomNo(room_no as string);

        get_user(id as string);

    }, [router.query, uid, roomNo])

    return (
        <div className="container d-flex flex-column gap-5 justify-content-center align-items-center mt-5">
            <span
                className="dmdisplay-regular fs-1 px-5 py-3 border border-2 border-primary bg-light rounded shadow">
                    {user.hotel_name}
            </span>

            <section className="d-flex flex-wrap gap-2 justify-content-center">
                <span className="px-3 py-2 border border-2 border-primary rounded bg-light shadow">
                    Email: 
                    <span className="mont-semibold mx-2">{user.email}</span>
                </span>
                <span className="px-3 py-2 border border-2 border-primary rounded bg-light shadow">
                    Phone: 
                    <span className="mont-semibold mx-2">{user.reception_ph}</span>
                </span>
            </section>
            <div className="mb-5 col-12 d-flex flex-column justify-content-center align-items-center">
                {
                    roomNo && uid && roomNo.length > 0 && uid.length > 0 && 
                    <Menu uid={uid} room_no={roomNo} />
                }
            </div>

        </div>
    )
}

export default MenuPage;
