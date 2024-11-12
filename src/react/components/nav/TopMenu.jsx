import React from "react";
import MobileDropdownMenu from "./MobileDropdownMenu";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { GITHUB_LINK } from "@/constants"

const TopMenu = () => {
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
                    <a 
                        href={GITHUB_LINK}
                        target='_blank'
                        rel='noopener noreferrer'
                        className="top-menu-link"
                        style={{position: 'absolute', right: '20px'}}
                    >
                        <FontAwesomeIcon 
                            icon={faGithub}
                            
                        />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default TopMenu;