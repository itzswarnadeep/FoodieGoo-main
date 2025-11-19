import React, { useState, useContext, useEffect, useRef } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

const navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home");
    const [showDropdown, setShowDropdown] = useState(false);
    const { getTotalCartAmount, token, setToken, setCartItems } = useContext(StoreContext);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        setCartItems({});
        setShowDropdown(false);
        navigate("/");
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='navbar'>
            <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
            <ul className="navbar-menu">
                <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
                <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
                <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
                <a href='#footer' onClick={() => setMenu("contact us")} className={menu === "contact us" ? "active" : ""}>contact us</a>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="" />
                <div className="navbar-search-icon">
                    <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                {!token ? <button onClick={() => setShowLogin(true)}>Sign In</button>
                    : <div className='navbar-profile' ref={dropdownRef}>
                        <img src={assets.profile_icon} alt="" onClick={() => setShowDropdown(!showDropdown)} />
                        <ul className={`nav-profile-dropdown ${showDropdown ? 'show' : ''}`}>
                            <li onClick={() => { navigate('/myorders'); setShowDropdown(false); }}><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                        </ul>
                    </div>}
            </div>
        </div>
    )
}

export default navbar