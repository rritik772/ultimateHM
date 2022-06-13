import { useState } from "react";
import AddMenu from "./AddMenu";
import ModifyItems from "./ModifyItem";

const Menu = () => {
    const [loading, setLoading] = useState<boolean>(false);

    return (
        <div className="d-flex flex-column gap-5">
            <AddMenu />
            <ModifyItems />
        </div>
    )
}

export default Menu;
