import Navbar from "../../components/admin/appbar/Navbar"
import Orders from "../../components/admin/orders/Orders"

function OrderPage() {
    return (
        <div>
            <Navbar />
            <div className="d-flex justify-content-center align-items-center my-5">
                <span className="dmdisplay-regular border border-2 border-primary fs-1 shadow rounded px-5 py-2">Orders</span>
            </div>
            <Orders />
        </div>
    )
}

export default OrderPage