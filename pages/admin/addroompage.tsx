import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../../components/admin/appbar/Navbar";
import Loading from "../../components/loading/Loading";
import useAuth from "../../context/auth/AuthContext";

const AddRoomPage = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [roomNo, setRoomNo] = useState<number>(-1);
    const [baseUrl, setbaseURL] = useState<string>('');
    const [size, setSize] = useState<number>(200);

    const { loading, currentUser } = useAuth();

    useEffect(() => {
        setLoading(true);

        if (currentUser) {
            const origin = window.location.origin;
            const uid = currentUser!.uid;
            setbaseURL(`${origin}/menupage?id=${uid}`)
        } else {
            toast.error('Please sign in')
        }

        setLoading(false);
    }, [currentUser])

    return (
        <div>
            <Navbar />
            <div className="d-flex justify-content-center align-items-center my-5">
                <span className="dmdisplay-regular border border-2 border-primary fs-1 shadow rounded px-5 py-2">Add Room</span>
            </div>
            {
                isLoading && <Loading />
            }
            {!isLoading &&
                <section className="mx-auto col-sm-12 col-md-4">
                    <div className="form-floating mb-3">
                        <input type="number" className="form-control" id="roomno" placeholder="101" value={roomNo} onChange={e => setRoomNo(parseInt(e.target.value))} />
                        <label htmlFor="roomno">Room No</label>
                    </div>
                    {
                        roomNo >= 0 && !isNaN(roomNo) &&
                        <div className="d-flex flex-column justify-content-center align-items-center mt-3 gap-3">
                            <span className="fs-3 text-uppercase mont-semibold">barcode</span>
                            <QRCodeCanvas
                                value={`${baseUrl}&room_no=${roomNo}`}
                                size={size}
                            />
                            <div className="d-flex gap-3 align-items-center">
                                <button className="btn btn-dark rounded-circle bi bi-dash-circle-fill fs-3" onClick={() => setSize(size - 50)}></button>
                                <span className="fs-4 mont-semibold">size</span>
                                <i className="btn btn-dark rounded-circle bi bi-plus-circle-fill fs-3" onClick={() => setSize(size + 50)}></i>
                            </div>
                        </div>
                    }
                </section>
            }
        </div>
    )
}

export default AddRoomPage;