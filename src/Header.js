import React from 'react'; 
import Menu from './Menu.js';
import './Header.css';



function Header(props){
    return(
    <div className="Header">
        <div className="menu">{<Menu />}</div>
        <div className="topBar"> 
        <a href="/" className="logoLink"><img src="../imgs/HKYKIDSLOGO.png" className='logoImg'/></a>
        </div>

        <h1>{props.name}</h1>
        <aside>
        <a href="https://www.facebook.com/heart.of.ky.kids" target="_blank" className="social">
            <img src="https://ssl.gstatic.com/atari/images/sociallinks/facebook_white_44dp.png" alt="Facebook" className="social" />
        </a>
        <a href="https://www.instagram.com/heart.of.ky.kids/" target="_blank" className="social">
            <img src="https://ssl.gstatic.com/atari/images/sociallinks/instagram_white_44dp.png" alt="Instagram" className="social" />
        </a>   
        </aside>
    </div>
    )
}

export default Header;

