import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useAuth from "../../../context/auth/AuthContext";
import { get_user_details } from "../../../context/auth/UserAuth";
import { add_menu } from "../../../context/store/modifyMenu";
import { MenuModal } from "../../../model/MenuModal";
import { UserModalDefault } from "../../../model/UserModel";

import fake_data from './../../../Assets/fake/menu_item.json';

const AddMenu = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<number>(0);
    const [items, setItems] = useState('');
    const [isVeg, setIsVeg] = useState<boolean>(false);
    const [category, setCategory] = useState<string>('');

    const { currentUser, isLoggedIn } = useAuth();
    const router = useRouter();
    
    const handleAddMenu = async () => {
        setLoading(true);

        console.log(name, name.length)
        if (name.length < 4) toast.error('Item name too short');
        else if (price <= 0) toast.error('Check Price');
        else if (items.length < 4) toast.error('Items length too short');
        else if (category.length < 2) toast.error('Category length too short');
        else {
            const arr_items = items.split(',');

            const menu: MenuModal = {
                id: name,
                name: name,
                items: arr_items,
                price: price,
                category: category,
                is_veg: isVeg
            }

            if (!currentUser) toast.error('Something went wrong')

            const user = await get_user_details(currentUser!.uid);
            if (user === UserModalDefault) toast.error('Something went wrong');

            const response = await add_menu(user, menu);
            if (response === 'Added Successfully') toast.success(response);
            else toast.error(response);
        }

        setLoading(false);
    }

    useEffect(() => {
        if (!isLoggedIn) router.push('/loginpage')
    }, [])

    return (
        <section className="">
            <div className="d-flex justify-content-center align-items-center">
                <span className="dmdisplay-regular border border-2 border-primary fs-1 shadow rounded px-5 py-2">Add Menu</span>
            </div>

            <div className="d-flex justify-content-center">
                <form className="col-lg-4 col-sm-9 m-3 p-4 border border-2 border-primary rounded shadow bg-light">
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                        <label htmlFor="name">Name</label>
                    </div>

                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="items"
                            value={items}
                            onChange={e => setItems(e.target.value)}
                        />
                        <label htmlFor="items">Items</label>
                        <small className='text-muted'>Seperate items by comma</small>
                    </div>


                    <div className="row g-2 mb-3">
                        <div className="col-md">
                            <div className="form-floating">
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    value={price}
                                    onChange={e => setPrice(parseInt(e.target.value))}
                                />
                                <label htmlFor="price">Price</label>
                            </div>
                        </div>
                        <div className="col-md">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="category"
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                />
                                <label htmlFor="category">Category</label>
                            </div>
                        </div>
                    </div>

                    <div className="form-check form-switch mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="is_veg"
                            checked={isVeg}
                            onChange={() => setIsVeg(!isVeg)}
                        />
                        <label className="form-check-label" htmlFor="is_veg">Is Veg</label>
                    </div>

                    <button className="btn btn-primary" type="button" disabled={(loading) ? true : false} onClick={handleAddMenu}>
                        {
                            loading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        }
                        Add Menu
                    </button>

                </form>
            </div>
        </section>
    )
}

export default AddMenu;

