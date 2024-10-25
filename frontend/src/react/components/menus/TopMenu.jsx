import React from "react";
import MobileDropdownMenu from "./MobileDropdownMenu";
import { Link } from 'react-router-dom';

const TopMenu = (props) => {
    return (
        <div className="top-menu">
            <div className="top-menu-responsive-flexbox">
                <MobileDropdownMenu
                />
                <h1> 
                    <Link
                        to='/'
                        className="text-white"
                        style={{textDecoration: 'none'}}
                    >
                        ALGOViz
                    </Link>
                </h1>
                <div className="flex-hide-on-mobile" style={{width: '100%'}}>
                    <Link
                        to="/sorting" 
                        className="top-menu-link"

                    >
                        Sorting
                    </Link>
                    <Link 
                        to="/graphs" 
                        className="top-menu-link"

                    >
                        Graphs
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default TopMenu;