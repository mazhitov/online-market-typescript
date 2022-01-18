import React from 'react';
import {NavLink} from "react-router-dom";
const Toolbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <NavLink to="/" className={`navbar-brand `}>Online-market</NavLink>
                <div className="navbar-expand">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink to="/" className={`nav-link `}>Главная</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/tv" className={`nav-link `}>Телевизоры</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/fridge" className={`nav-link `}>Холодильники</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/cutter" className={`nav-link `}>Хренорезки</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/product/add" className={`nav-link `}>Добавить товар</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Toolbar;