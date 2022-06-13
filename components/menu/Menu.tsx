import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../context/auth/AuthContext';
import { get_user_details } from '../../context/auth/UserAuth';
import { get_menu } from '../../context/store/modifyMenu';
import { place_order } from '../../context/store/orders';
import filterMenu from '../../lib/menu/filterMenu';
import { MenuModal } from '../../model/MenuModal';
import { OrderModal } from '../../model/ScannedQrModal';
import { UserModalDefault } from '../../model/UserModel';

interface CategoriedItemProps {
    category: string
    items: MenuModal[]
    isOrderClicked: boolean
    hotelName: string
    uid: string
    roomNo: string
}

interface SingleItemProps {
    menuModal: MenuModal
    isOrderClicked: boolean
    hotelName: string
    uid: string
    roomNo: string
}

const CategoriedItem: FC<CategoriedItemProps> = ({ category, items, isOrderClicked, hotelName, uid, roomNo }) => {
    return (
        <section className='col-12'>
            <span className='fs-3 dmdisplay-regular'>{category}</span>
            <div className='border-bottom border-2' />
            <div className='mt-2'>
                {
                    items.map((item, key) => (
                        <SingleItem
                            key={`${item.id}+${key}`}
                            menuModal={item}
                            isOrderClicked={isOrderClicked}
                            hotelName={hotelName}
                            uid={uid}
                            roomNo={roomNo}
                        />
                    ))
                }
            </div>
        </section>
    )
}

const SingleItem: FC<SingleItemProps> = ({ menuModal, isOrderClicked, hotelName, uid, roomNo }) => {
    const [quantity, setQuantity] = useState<number>(0);

    const { id, name, price, items, is_veg, category } = menuModal;

    const order_item = async () => {
        if (isOrderClicked && quantity > 0) {
            const order: OrderModal = {
                item: menuModal,
                quantity: quantity,
                status: false
            }

            const response = await place_order({
                room_no: roomNo,
                hotel_name: hotelName,
                uid: uid
            }, order);

            if (response === 'Order placed successfully') toast.success(response)
            else toast.success(response)
        }
    }

    useEffect(() => {
        order_item()
    }, [isOrderClicked])

    return (
        <div className='d-flex justify-content-between my-2'>
            <div className='col d-flex align-items-center'>
                <i className={`bi bi-stop-circle me-2 ${!is_veg ? 'text-danger' : 'text-success'}`}></i>
                <div className='d-flex flex-column'>
                    <span className='mont-semibold'>
                        {name}
                        {
                            quantity > 0 &&
                            <span className='mx-2'>({quantity})</span>
                        }
                    </span>
                    <div className='d-flex gap-1 flex-wrap'>
                        {
                            items.map((ele, idx) => (
                                <small key={idx} className='text-muted'>{ele}</small>
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className=''>
                {
                    quantity === 0 &&
                    <span
                        className='badge bg-primary fs-6'
                        onClick={() => setQuantity(quantity + 1)}
                    >₹ {price}</span>
                }
                {
                    quantity > 0 &&
                    <div className='d-flex align-items-center'>
                        <i className="bi bi-dash-circle fs-4 text-danger" onClick={() => setQuantity(quantity - 1)}></i>
                        <span className='mx-1'>₹ {quantity * price}</span>
                        <i className="bi bi-plus-circle fs-4 text-primary" onClick={() => setQuantity(quantity + 1)}></i>
                    </div>
                }
            </div>

        </div>
    )
}

interface MenuProps {
    uid: string
    room_no: string
}

const Menu: FC<MenuProps> = ({ uid, room_no }) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [menuItems, setMenuItems] = useState<MenuModal[]>([])
    const [isOrderClicked, setisOrderClicked] = useState<boolean>(false);
    const [hotelName, setHotelName] = useState<string>('');

    const { currentUser, isLoggedIn } = useAuth();
    const router = useRouter();

    const get_full_menu = async () => {
        setLoading(true);

        const user = await get_user_details(uid);
        if (user === UserModalDefault) router.push('/404')
        setHotelName(user.hotel_name);
        setMenuItems(await get_menu(user));

        setLoading(false);
    }


    useEffect(() => {
        get_full_menu()
    }, [currentUser])


    const filtered_menu = filterMenu(menuItems);
    return (
        <div className="col-12 d-flex gap-5 flex-column justify-content-center align-items-center">
            {
                Array.from(filtered_menu).map((item, idx) => (
                    <CategoriedItem
                        key={idx}
                        category={item[0]}
                        items={item[1]}
                        isOrderClicked={isOrderClicked}
                        hotelName={hotelName}
                        uid={uid}
                        roomNo={room_no}
                    />
                ))
            }
            {
                !isOrderClicked &&
                <button className="btn btn-md btn-primary px-5 py-3 mont-semibold" type="button" disabled={false} onClick={() => setisOrderClicked(true)}>
                    {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                    Order
                </button>
            }
            {
                isOrderClicked &&
                <button className="btn btn-md btn-primary px-5 py-3 mont-semibold" type="button" disabled={false} onClick={() => setisOrderClicked(false)}>
                    {loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                    ReOrder
                </button>
            }
        </div>
    )
}

export default Menu;
