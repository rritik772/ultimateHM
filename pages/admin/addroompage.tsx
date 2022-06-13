import { useState } from "react";
import Navbar from "../../components/admin/appbar/Navbar";

const AddRoomPage = () => {
    const [roomNo, setRoomNo] = useState<number>(-1);
    return (
        <div>
            <Navbar />
            <div className="d-flex justify-content-center align-items-center my-5">
                <span className="dmdisplay-regular border border-2 border-primary fs-1 shadow rounded px-5 py-2">Add Room</span>
            </div>
            <section className="mx-auto col-sm-12 col-md-4">
                <div className="form-floating mb-3">
                    <input type="number" className="form-control" id="roomno" placeholder="101" value={roomNo} onChange={e => setRoomNo(parseInt(e.target.value))} />
                    <label htmlFor="roomno">Room No</label>
                </div>
                <div className="border border-primary rounded p-3">

                </div>
            </section>
        </div>
    )
}

export default AddRoomPage;