import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top m-3 p-3 rounded border border-2 border-primary mb-5 shadow">
            <div className="container-fluid">
                <Link href="/">
                    <a className="navbar-brand dmdisplay-regular">TheUltimateHM</a>
                </Link>
                <button
                    className="navbar-toggler"
                    type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse mont-semibold" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link href="/admin/menupage">
                                <a className="nav-link">Menu</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/admin/orderpage">
                                <a className="nav-link">Orders</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/admin/addroompage">
                                <a className="nav-link">Add Room</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/loginpage">
                                <a className="nav-link">Logout</a>
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                More
                            </a>
                            <ul className="dropdown-menu border border-1 mont-regular" aria-labelledby="navbarDropdown">
                                <li><a className="dropdown-item" href="#">Contact Us</a></li>
                                <li><a className="dropdown-item" href="#">Report Bug</a></li>
                                <li><a className="dropdown-item" href="#">Hire Me</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
