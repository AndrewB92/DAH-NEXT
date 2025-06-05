import React, { useState } from 'react';
import rootUrl from 'config.js'
import styles from '@styles/BKMobileNavDrawer.module.css'; // Add your CSS here

const BKMobileNavDrawer = () => {
  // State to manage the visibility of the drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Function to toggle the drawer open and closed
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      {/* Hamburger Icon - triggers the drawer to open */}
      <a
        href="#"
        className="mob-menu-link"
        onClick={(e) => {
          e.preventDefault();
          toggleDrawer(); // Open or close the drawer
        }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="35" height="35" rx="9.5" stroke="#666666" />
          <line x1="8" y1="13.25" x2="28" y2="13.25" stroke="#666666" strokeWidth="1.5" />
          <line x1="13" y1="17.25" x2="28" y2="17.25" stroke="#666666" strokeWidth="1.5" />
          <line x1="16" y1="21.25" x2="28" y2="21.25" stroke="#666666" strokeWidth="1.5" />
        </svg>
      </a>

      {/* Overlay to darken the rest of the screen when drawer is open */}
      <div
        className={`${styles.overlay} ${isDrawerOpen ? styles.show : ''}`}
        onClick={toggleDrawer} // Close the drawer when clicking outside
      ></div>

      {/* Side Drawer - sliding in/out from the left */}
      <div className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`}>
        <a href="#" onClick={toggleDrawer} className={styles.closeButton}>
            <svg aria-hidden="true" className="e-font-icon-svg e-fas-times" viewBox="0 0 352 512" xmlns="http://www.w3.org/2000/svg"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
        </a>
        <ul className={styles.navList}>
          <li><a href={`${rootUrl}/why-dublin-at-home/`}>WHY US</a></li>
          <li><a href="/properties">BROWSE</a></li>
          <li><a href={`${rootUrl}/tailored-stays/`}>TAILORED STAYS</a></li>
          <li><a href={`${rootUrl}/make-an-enquiry/`}>MAKE AN ENQUIRY</a></li>
          <li><a href={`${rootUrl}/faq/`}>FAQ</a></li>
          <li><a href={`${rootUrl}/blog/`}>BLOG</a></li>
        </ul>
      </div>
    </div>
  );
};

/*
<a href={`${rootUrl}/why-dublin-at-home/`} className="nav-link">Why Us</a>
<a href="/properties" className="nav-link">Browse</a>
<a href={`${rootUrl}/tailored-stays/`} className="nav-link">Tailored stays</a>
<a href={`${rootUrl}/make-an-enquiry/`} className="nav-link">Make an Enquiry</a>
<a href={`${rootUrl}/faq/`} className="nav-link">FAQ</a>
<a href={`${rootUrl}/blog/`} className="nav-link">Blog</a>
*/
export default BKMobileNavDrawer