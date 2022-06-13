import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Menu from "../components/menu/Menu";

const MenuPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [uid, setUid] = useState<string>('');
    const [roomNo, setRoomNo] = useState<string>('');
    const router = useRouter()

    useEffect(() => {
        const { id, room_no } = router.query;
        setUid(id as string);
        setRoomNo(room_no as string);
    }, [router.query, uid, roomNo])

    return (
        <div className="container d-flex flex-column gap-5 justify-content-center align-items-center mt-5">
            <span
                className="dmdisplay-regular fs-1 px-5 py-3 border border-2 border-primary bg-light rounded shadow">
                The UltimateHM
            </span>

            <section className="d-flex flex-wrap gap-2 justify-content-center">
                <span className="px-3 py-2 border border-2 border-primary rounded bg-light shadow">
                    Email:
                    <span className="mont-semibold mx-2">someone@gmail.com</span>
                </span>
                <span className="px-3 py-2 border border-2 border-primary rounded bg-light shadow">
                    Phone:
                    <span className="mont-semibold mx-2">+91 1231 2312 33</span>
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
