import { useState } from "react";
import ShowMenu from "./ShowMenu";

const ModifyItems = () => {
    const [loading, setLoading] = useState<boolean>(false)
    return (
        <div className="d-flex flex-column gap-3 col-12">

            <div className="d-flex justify-content-center align-items-center">
                <span className="dmdisplay-regular border border-2 border-primary fs-1 shadow rounded px-5 py-2">Modify Menu</span>
            </div>
            <div className="container mb-5 d-flex flex-column justify-content-center align-items-center">
                <ShowMenu />
            </div>
        </div>
    )
}

export default ModifyItems;
