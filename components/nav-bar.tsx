import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { Menu, MenuItem, Tooltip } from "@mui/material";

import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import StairsOutlinedIcon from '@mui/icons-material/StairsOutlined';
import LoginIcon from '@mui/icons-material/Login';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BadgeIcon from '@mui/icons-material/Badge';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';

import { getSessionUserEmail } from "../util/user-util";
import { isJwtEmptyOrInvalid } from "../util/jwt-util";

 const NavBar = (props: any) => {
  console.log('NavBar', 'props', props);

  const { hightlights } = props; 

  const router = useRouter();

  const [ email, setEmail ] = useState('');

  const [ anchorEl, setAnchorEl ] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => { 
    if(!isJwtEmptyOrInvalid()){ setEmail(getSessionUserEmail()); } 

    handleClose()
  }, []);

  const handleLogoClick = async () => { await router.push(`${process.env.NEXT_PUBLIC_DOMAIN}`); }
  const handleTutorialClick = () => { }; 

  const handleEstimateClick = async () => {
    if(!isJwtEmptyOrInvalid()) {
      await router.push(`${process.env.NEXT_PUBLIC_DOMAIN}/new-request`);
    }else {
      await router.push(`${process.env.NEXT_PUBLIC_ABAC_HOST}/oauth/google-oauth`);
    }
  }; 

  const handleUserClick = (event : React.MouseEvent<HTMLButtonElement>) => { setAnchorEl(event.currentTarget); }
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

  const navBarMenuButton = (icon, text, clickHandler) => {
    return (
      <a 
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center"
        }} 
        href='javascript:void(0)'
        onClick={ clickHandler }
      >
        <div 
          className="borderless-btn-with-menu"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center"
          }}>
            
          { icon }
          &nbsp;&nbsp; 
          { text }
        </div>
      </a>
    )
  }

  const userMenuDropdown = (
    <Menu
      id="basic-menu"
      anchorEl={ anchorEl }
      open={ Boolean(anchorEl) }
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

        <i>&nbsp;&nbsp;<b>User : { email }</b></i> 
      </div>

      <MenuItem onClick={ handleUserHomeClick }>
        <div 
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
        }}>
          <HomeIcon sx={{ transform: "translateY(-2px)" }}/>
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
        <div className={ hightlights?.includes('other_tier')? 'home__nav__item-highlight home__nav__item' : 'home__nav__item' }>
          <Tooltip title={ "Coming Soon !" }>
            { navBarMenuButton(<MilitaryTechIcon/>, "Other Tiers", handleTutorialClick) }
          </Tooltip>
        </div>
        
        <div className={ hightlights?.includes('tutorial')? 'home__nav__item-highlight home__nav__item' : 'home__nav__item' }>
          <Tooltip title={ "Coming Soon !" }>
            { navBarMenuButton(<HelpOutlineIcon/>, "Tutorial", handleTutorialClick) }
          </Tooltip>
        </div>
      </div>   
    
      <div className="home__nav__middle">
        <a 
          style={{ display: "flex" }} 
          href="javascript:void(0)"
          onClick={ handleLogoClick }>
          <img 
            src={ "https://i.ibb.co/pzQr3jq/cup-tier-logo-8.png" } 
            width="141" height="47"
          />
        </a>
      </div>

      <div className="home__nav__right">
        <div className={ hightlights?.includes('estimate')? 'home__nav__item-highlight home__nav__item' : 'home__nav__item' }>
          { navBarMenuButton(<StairsOutlinedIcon/>, "Estimate", handleEstimateClick) }
        </div>
        
        {
          email
          ?(
            <div className={ hightlights?.includes('user')? 'home__nav__item-highlight home__nav__item' : 'home__nav__item' }>
              { navBarMenuButton(<PersonOutlineIcon/>, "User", handleUserClick) }
              { userMenuDropdown }
            </div>
          )
          :(
            <div className="home__nav__item">
              { navBarMenuButton(<LoginIcon/>, "SignIn", handleSignInClick) }
            </div>
          )
        }
      </div>
    </div>
  )
}

export default NavBar; 