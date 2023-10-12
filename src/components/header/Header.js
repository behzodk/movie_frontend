import React from "react"
import "./Header.scss"
import { Link } from "react-router-dom"
// import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Header = () => {
      React.useEffect(() => {
        window.addEventListener("scroll", isSticky);
        return () => {
          window.removeEventListener("scroll", isSticky);
        };
      }, []);

      const isSticky = (e) => {
        const header = document.querySelector(".header");
        const scrollTop = window.scrollY;
        scrollTop >= 20
          ? header.classList.add("is-sticky")
          : header.classList.add("is-sticky");
      };
      const [anchorEl, setAnchorEl] = React.useState(null);
      const open = Boolean(anchorEl);
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
      const handleClose = () => {
        setAnchorEl(null);
      };
  
    return (
        <div className="header">
            <div className="headerLeft">
                <Link to="/" className="behzod"><div className="div"><span>MyMovies</span></div></Link>
                <div>
                  <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                  >
                    Filter
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem className='items' onClick={handleClose}><Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link></MenuItem>
                    <MenuItem className='items' onClick={handleClose}><Link to="/movies/live" style={{textDecoration: "none"}}><span>Now Playing</span></Link></MenuItem>
                    <MenuItem className='items' onClick={handleClose}><Link to="/movies/rated" style={{textDecoration: "none"}}><span>Order by Rank</span></Link></MenuItem>
                  </Menu>
                </div>
                  <Link to="/movies/watch_list" style={{textDecoration: "none"}}><span>Watch List</span></Link>
                  <Link to="/movies/watched" style={{textDecoration: "none"}}><span>Watched</span></Link>
            </div>
        </div>
    )
}

export default Header
