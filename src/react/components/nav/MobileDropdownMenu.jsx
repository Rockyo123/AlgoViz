import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { GITHUB_LINK } from '@/constants';
const MobileDropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

    const dropdownVariants = {
        open: {
          height: 'auto',
          opacity: 1,
          transition: {
            duration: 0.3,
          },
        },
        closed: {
          height: 0,
          opacity: 0,
          transition: {
            duration: 0.3,
          },
        },
      };

  return (
    <>
    <button className="show-on-mobile mobile-dropdown-open-button" onClick={() => setIsOpen(!isOpen)}>
      ☰
    </button>
    <AnimatePresence>
    {isOpen && 
    <motion.nav 
        className={isOpen ? 'mobile-dropdown-nav-menu active' : 'mobile-dropdown-nav-menu'} 
        aria-hidden={isOpen}
        initial='closed'
        animate='open'
        exit='closed'
        variants={dropdownVariants}
    >
        <div className='mobile-dropdown-nav-menu-items' onClick={() => setIsOpen(false)}>
          <Link
            to="/sorting" 
            className='left-menu-link'
          >
            Sorting
          </Link>
          <Link
            to="/graphs" 
            className='left-menu-link'
          >
            Graphs
          </Link>
          <Link
            to="/trees" 
            className='left-menu-link'
          >
            Trees
          </Link>
          <a 
            href={GITHUB_LINK}
            target='_blank'
            rel='noopener noreferrer'
            className="left-menu-link"
          >
            <FontAwesomeIcon 
              icon={faGithub}
            />
          </a>
        </div>
    </motion.nav>}
    </AnimatePresence>
    </>
  );
}

export default MobileDropdownMenu;