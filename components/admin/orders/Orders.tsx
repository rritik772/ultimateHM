import { collection, limit, onSnapshot, orderBy, query, startAfter } from 'firebase/firestore';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../../context/auth/AuthContext';
import { get_user_details } from '../../../context/auth/UserAuth';
import { delete_order, modify_order } from '../../../context/store/orders';
import { database } from '../../../firebase';
import filterOrders from '../../../lib/orders/filterOrder';
import { MenuModal } from '../../../model/MenuModal';
import { FirebaseOrdersModel } from '../../../model/ScannedQrModal';
import { UserModalDefault } from '../../../model/UserModel';
import Loading from '../../loading/Loading';
import fake_orders from './../../../Assets/fake/orders.json';

interface OrderProps {
    id: number
    name: string
    total_price: number
    room_no: number
    items: string[]
    status: string
}

const Order: FC<OrderProps> = ({ id, name, total_price, room_no, items, status }) => {
    const status_mapping = {
        "Pending": "-warning",
        "Completed": "-success"
    };

    return (
        <>
            {/* <tr className="cursor-pointer" data-bs-toggle="modal" data-bs-target={`#staticBackdrop${id}`}>
                <th>{id}</th>
                <td>{name}</td>
                <td>{total_price}</td>
                <td>{room_no}</td>
                <td>
                    <span className={`badge ${status_mapping[status]}`}>{status}</span>
                </td>


            </tr> */}
            <div className="modal fade" id={`staticBackdrop${room_no}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title mont-semibold" id="exampleModalLabel">Room No: {room_no}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className='d-flex flex-column'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span>{name}</span>
                                    <span className='fs-2 mont-bold'>₹ {total_price}</span>
                                </div>
                                <small className='border-top mt-4 text-muted'>Items</small>
                                <span className='fs-3 mont-semibold'>{items.join(', ')}</span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-danger">Delete</button>
                            <button type="button" className="btn btn-warning">Pending</button>
                            <button type="button" className="btn btn-success">Completed</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

interface OrderWithRoomProps {
    orders: FirebaseOrdersModel[]
    room_no: string
}

const OrderWithRoom: FC<OrderWithRoomProps> = ({ orders, room_no }) => {
    const { currentUser } = useAuth();

    const completed_order = () => {
        const n = orders.reduce((prev, curr) => (curr.status) ? prev + 1 : prev, 0)
        return n
    }

    const handleDelete = async (idx: number) => {
        const user = await get_user_details(currentUser!.uid)
        if (user === UserModalDefault) { toast.error('Cannot delete. Please Refresh page.'); return; }
        const response = await delete_order(user, orders[idx])

        if (response === 'Deleted Succesfully') toast.success(response)
        else toast.error(response);
    }

    const handlePending = async (idx: number) => {
        if (orders[idx].status === false) {
            toast.info('Order is already pending');
            return;
        }

        const user = await get_user_details(currentUser!.uid)
        if (user === UserModalDefault) { toast.error('Cannot delete. Please Refresh page.'); return; }

        orders[idx].status = false;
        const response = await modify_order(user, orders[idx])

        if (response === 'Order updated') toast.success('Order put on pending')
        else toast.error(response)
    }

    const handleComplete = async (idx: number) => {
        if (orders[idx].status === true) {
            toast.info('Order is already completed');
            return;
        }

        const user = await get_user_details(currentUser!.uid)
        if (user === UserModalDefault) { toast.error('Cannot delete. Please Refresh page.'); return; }

        orders[idx].status = true;
        const response = await modify_order(user, orders[idx])

        if (response === 'Order updated') toast.success('Order completed')
        else toast.error(response)
    }

    return (
        <>
            <button className={`btn ${completed_order() === orders.length ? 'bg-success text-light' : 'text-dark bg-warning'}`} data-bs-toggle="modal" data-bs-target={`#staticBackdrop${room_no}`}>
                <span className='mont-semibold'>{room_no} ({`${completed_order()}/${orders.length}`})</span>
            </button>

            <div className="modal fade" id={`staticBackdrop${room_no}`} data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title dmdisplay-regular fs-2" id="exampleModalLabel">Room No: {room_no}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                orders.map((item, key) => (
                                    <section key={key} className='mb-3'>
                                        <div className={`d-flex justify-content-between border rounded p-3 ${item.status ? 'border-success' : 'border-warning'}`} data-bs-toggle="collapse" data-bs-target={`#collapseExample${item.doc_id}`} aria-expanded="false" aria-controls="collapseExample">
                                            <div className='d-flex flex-column'>
                                                <span className='mont-semibold'>
                                                    <i className={`bi bi-stop-circle me-2 ${item.item.is_veg ? 'text-success' : 'text-danger'}`}></i>
                                                    {item.item.name} ({item.quantity})
                                                </span>
                                            </div>
                                            <span className='mont-semibold'>{item.item.price}</span>
                                        </div>
                                        <div className="collapse mt-2" id={`collapseExample${item.doc_id}`}>
                                            <div className="card card-body border-0">
                                                <div className='d-flex gap-2 justify-content-center'>
                                                    <button type="button" className="btn btn-danger" onClick={() => handleDelete(key)}>Delete</button>
                                                    <button type="button" className="btn btn-warning" onClick={() => handlePending(key)}>Pending</button>
                                                    <button type="button" className="btn btn-success" onClick={() => handleComplete(key)}>Completed</button>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                ))
                            }

                            <span className='fs-4 dmdisplay-regular mt-5 text-end'>Total Amount: {orders.reduce(
                                (prev, curr) => prev + curr.item.price * curr.quantity, 0
                            )}
                            </span>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Orders = () => {
    const [filetredList, setFilteredList] = useState<Map<string, FirebaseOrdersModel[]>>(new Map<string, FirebaseOrdersModel[]>([]))
    const [loading, setLoading] = useState<boolean>(false);

    const { currentUser } = useAuth();

    const filter_orders_by_room = async () => {
        setLoading(true);

        const user = await get_user_details(currentUser!.uid)

        const q = query(collection(database, `orders/${user.uid}/${user.hotel_name}`), orderBy('date_time', 'desc'), limit(10))
        const unsubs = onSnapshot(q, (snaphot) => {
            setFilteredList(new Map())

            const ordersList = snaphot.docs.map(doc => {
                const doc_id = doc.id;
                const modal = { ...doc.data(), doc_id: doc_id } as FirebaseOrdersModel
                return modal;
            })

            setFilteredList(filterOrders(ordersList));

        })

        setLoading(false);
    }

    useEffect(() => {
        if (currentUser)
            filter_orders_by_room();
    }, [currentUser])

    return (
        <div className='container d-flex flex-wrap justify-content-center gap-3'>
            {/* <div className='col-12 d-flex justify-content-start border border-2 border-primary p-3 rounded bg-light align-items-center gap-3 flex-wrap shadow-sm'>
                    <i className="bi bi-filter fs-5"></i>
                    <button className='btn btn-success'>Completed</button>
                    <button className='btn btn-warning'>Pending</button>
            </div> */}
            {loading && <Loading />}
            {
                Array.from(filetredList).length === 0 &&
                <div>
                    <span className='fs-3 dmdisplay-regular px-5 py-3 shadow-sm rounded border border-primary'>
                        <i className="bi bi-emoji-sunglasses-fill me-2"></i>
                        No Orders
                    </span>
                </div>
            }
            {
                Array.from(filetredList).map((ele, idx) => (
                    <OrderWithRoom key={idx} room_no={ele[0]} orders={ele[1]} />
                ))
            }
        </div>
    )
}

export default Orders;