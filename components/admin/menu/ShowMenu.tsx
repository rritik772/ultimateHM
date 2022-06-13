import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAuth from '../../../context/auth/AuthContext';
import { get_user_details } from '../../../context/auth/UserAuth';
import { add_menu, get_menu, modify_menu } from '../../../context/store/modifyMenu';
import filterMenu  from '../../../lib/menu/filterMenu';
import { MenuModal } from '../../../model/MenuModal';
import { UserModalDefault } from '../../../model/UserModel';
import Loading from '../../loading/Loading';

interface CategoriedItemProps {
    category: string
    items: MenuModal[]
    all_categories: string[]
}

interface SingleItemProps {
    _id: string
    _name: string
    _price: number
    _items: string[]
    _is_veg: boolean
    _category: string
    _all_categories: string[]
}

const CategoriedItem: FC<CategoriedItemProps> = ({ category, items, all_categories }) => {
    return (
        <section className='col-12'>
            <span className='fs-3 dmdisplay-regular'>{category}</span>
            <div className='border-bottom border-2' />
            <div className='mt-2'>
                {
                    items.map(item => (
                        <SingleItem
                            key={item.id}
                            _id={item.id}
                            _name={item.name}
                            _price={item.price}
                            _items={item.items}
                            _is_veg={item.is_veg}
                            _category={item.category}
                            _all_categories={all_categories}
                        />
                    ))
                }
            </div>
        </section>
    )
}

const SingleItem: FC<SingleItemProps> = ({ _id, _name, _price, _items, _is_veg, _category, _all_categories }) => {
    const [id, setId] = useState<string>(_id)
    const [name, setName] = useState<string>(_name);
    const [price, setPrice] = useState<number>(_price);
    const [items, setItems] = useState<string>(_items.join(','));
    const [isVeg, setIsVeg] = useState<boolean>(_is_veg);
    const [category, setCategory] = useState<string>(_category);
    const [all_categories, setAll_categories] = useState<string[]>(_all_categories)

    const classname = name.split(" ").join("");
    const {currentUser} = useAuth();

    const  handleSubmit = async () => {

        if (name.length < 4) toast.error('Item name too short');
        else if (price <= 0) toast.error('Check Price');
        else if (items.length < 1) toast.error('Items lenght too short');
        else if (category.length < 2) toast.error('Category length too short');
        else {
            const arr_items = items.split(',');

            const menu: MenuModal = {
                id: id,
                name: name,
                items: arr_items,
                price: price,
                category: category,
                is_veg: isVeg
            }


            if (!currentUser) toast.error('Something went wrong');

            const user = await get_user_details(currentUser!.uid);
            if (user === UserModalDefault) toast.error('Something went wrong');

            const response = await modify_menu(user, menu);
            if (response === 'Updated Successfully') toast.success(response);
            else toast.error(response);
        }
    }

    return (
        <div className='d-flex flex-column justify-content-between my-2'>
            <div className='d-flex justify-content-between' data-bs-toggle="modal" data-bs-target={`#${classname}-${id}`}>
                <div className='col d-flex align-items-center'>
                    <i className={`bi bi-stop-circle me-2 ${isVeg ? 'text-success' : 'text-danger'}`}></i>
                    <div className='d-flex flex-column'>
                        <span className='mont-semibold'>
                            {name}
                        </span>
                        <div className='d-flex gap-1 flex-wrap'>
                            {
                                items.split(',').map((ele, idx) => (
                                    <small key={idx} className='text-muted'>{ele}</small>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <span className='mont-semibold'>₹ {price}</span>
            </div>
            <div className="modal fade" id={`${classname}-${id}`}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="modal-title fs-3 dmdisplay-regular" id="exampleModalLabel">{name}</span>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body d-flex flex-column">

                            <div className="form-floating mb-3">
                                <input
                                type="text"
                                className="form-control"
                                id="name"
                                onChange={e => setName(e.target.value)}
                                value={name}
                                />
                                <label htmlFor="name">Name</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input
                                type="text"
                                className="form-control"
                                id="items"
                                onChange={e => setItems(e.target.value)}
                                value={items} 
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
                                        onChange={e => setPrice(parseInt(e.target.value))}
                                        value={price} />
                                        <label htmlFor="price">Price</label>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-floating">
                                        <select className="form-select" id="floatingSelectGrid" value={category} onChange={(e) => setCategory(e.target.value)}>
                                            {
                                                all_categories.map(item => (
                                                    <option
                                                        selected={(item === category) ? true : false}
                                                        key={item}
                                                        value={item}
                                                    >{item}</option>
                                                ))
                                            }
                                        </select>
                                        <label htmlFor="floatingSelectGrid">Category</label>
                                    </div>
                                </div>
                            </div>

                            <div className="form-check form-switch mb-3">
                                <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="veg" 
                                checked={isVeg}
                                onChange={() => setIsVeg(!isVeg)}
                                />
                                <label className="form-check-label" htmlFor="veg">Is Veg</label>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

const ShowMenu = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [menuItems, setMenuItems] = useState<MenuModal[]>([])

    const { currentUser, isLoggedIn } = useAuth();
    const router = useRouter();

    const get_full_menu = async () => {
        setIsLoading(true);

        if (currentUser){
            const user = await get_user_details(currentUser.uid);
            setMenuItems(await get_menu(user));
        }

        setIsLoading(false);
    }

    useEffect(() => {
        setIsLoading(true);
        
        if (!isLoggedIn) router.push('/loginpage');

        setIsLoading(false);
    }, [])

    useEffect(() => {
        if (currentUser) get_full_menu()
    }, [currentUser])


    const filtered_menu = filterMenu(menuItems);
    return (
        <div className="col-12 d-flex gap-5 flex-column justify-content-center align-items-center">
            { isLoading && <Loading /> }
            {
                Array.from(filtered_menu).map((item, idx) => (
                    <CategoriedItem
                        key={idx}
                        category={item[0]}
                        items={item[1]}
                        all_categories={Array.from(filtered_menu.keys())}
                    />
                ))
            }
        </div>
    )
}

export default ShowMenu;
