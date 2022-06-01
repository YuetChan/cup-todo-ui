import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Menu, MenuItem } from "@mui/material";

import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LoginIcon from '@mui/icons-material/Login';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

import { getSessionUserEmail } from "../util/user-util";
import { isJwtEmptyOrInvalid } from "../util/jwt-util";

 const NavBar = (props: any) => {
  console.log('NavBar', 'props', props)

  const router = useRouter();

  const [ email, setEmail ] = useState('');

  const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => { if(!isJwtEmptyOrInvalid()){ setEmail(getSessionUserEmail()); } }, []);

  const handleLogoClick = async () => { await router.push(`${process.env.NEXT_PUBLIC_DOMAIN}`); }
  const handleTutorialClick = () => { }; 

  const handleEstimateClick = async () => {
    if(!isJwtEmptyOrInvalid()) {
      await router.push(`${process.env.NEXT_PUBLIC_DOMAIN}/new-request`);
    }else {
      await router.push(`${process.env.NEXT_PUBLIC_ABAC_HOST}/oauth/google-oauth`);
    }
  }; 

  const handleUserClick = (event) => { setAnchorEl(event.currentTarget); }
  const handleSignInClick = async () => { await router.push(`${process.env.NEXT_PUBLIC_ABAC_HOST}/oauth/google-oauth`); }; 

  const handleUserHomeClick = async () => {
    setAnchorEl(null);
    await router.push(`${process.env.NEXT_PUBLIC_DOMAIN}/user-home`);
  }

  const handleSignOutClick = async () => {
    setAnchorEl(null);
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    await router.push(`${process.env.NEXT_PUBLIC_DOMAIN}`);
  }; 

  const handleClose = () => { setAnchorEl(null); };

  const borderlessButtonWithMenu = (icon, text, clickHandler, menu) => {
    return (
      <div 
        className="borderless-btn-with-menu"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
      }}>
      <a 
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }} 
        href='javascript:void(0)'
        onClick={clickHandler}
      >
        {icon}
        &nbsp;&nbsp; 
        {text}
      </a>
      {menu}  
    </div>
    )
  }

  const userMenuDropdown = (
    <Menu
      id="basic-menu"
      anchorEl={ anchorEl }
      open={ open }
      onClose={ handleClose }
      MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      style={{
        zIndex: "99999",
        padding: "11px"
      }}
    >
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",

        padding: "13px 16px"
      }}>
        <BadgeIcon sx={{ transform: "translateY(-3px)" }}/>

        <i>&nbsp;&nbsp;User : { email }</i> 
      </div>

      <MenuItem onClick={ handleUserHomeClick }>
        <div 
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
        }}>
          <HomeIcon sx={{
            transform: "translateY(-2px)"
          }}/>
          <span>&nbsp;&nbsp;User Home</span>
        </div>
      </MenuItem>

      <MenuItem onClick={ handleSignOutClick }>
        <div 
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
        }}>
          <LogoutIcon sx={{ transform: "translateY(-2px)" }}/>
          <span>&nbsp;&nbsp;Sign Out</span>
        </div>
      </MenuItem>
    </Menu>
  )  

  return (
    <div className="home__nav">
      <div className="home__nav__left">
        { borderlessButtonWithMenu(<MilitaryTechIcon/>, "Other Tier", handleTutorialClick, null) }

        <div style={{ margin: "0px 0px 0px 19px"}}>
          { borderlessButtonWithMenu(<HelpOutlineIcon/>, "Tutorial", handleTutorialClick, null) }
        </div>
      </div>   
    
      <div className="home__nav__middle">
        <a 
          style={{ display: "flex" }} 
          href="javascript:void(0)"
          onClick={ handleLogoClick }>
          <img 
            src={ "https://i.ibb.co/cvfRcZN/cup-tier-logo-2.png" } 
            width="141" height="47"
          />
        </a>
      </div>

      <div className="home__nav__right">
        { borderlessButtonWithMenu(<RateReviewIcon/>, "Estimate", handleEstimateClick, null) }

        {
          email
          ?(
            <div style={{ margin: "0px 0px 0px 19px"}}>
              { borderlessButtonWithMenu(<PersonOutlineIcon/>, "User", handleUserClick, userMenuDropdown) }
            </div>
          )
          :(
            <div style={{ margin: "0px 0px 0px 19px"}}>
              { borderlessButtonWithMenu(<LoginIcon/>, "Sign In", handleSignInClick, null) }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default NavBar; 