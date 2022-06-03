import React, {useState} from 'react'
import {Box, Avatar, AppBar, Toolbar, IconButton, Typography, Container, Grow, Dialog, DialogTitle, DialogActions, Divider} from '@mui/material'
import logo from '../../Assets/logo.jpg'

export default function Navbar() {
    const role = sessionStorage.getItem("userRole");

    const [isOpen,setIsOpen]=useState(false);
    const handleOpen=()=> setIsOpen(true);
    const handleClose=()=> setIsOpen(false);

    const handleLogout = () => {
        return(
            <Grow in={isOpen} {...(isOpen ? { timeout: 500 } : {})}>
            <Dialog open={isOpen} onClose={handleClose} keepMounted maxWidth={'md'} aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">
                    Are You Sure to Logout?
                <Divider/>
                </DialogTitle>
                <DialogActions>
                    <div>
                        <input type='submit' className='btn btn-danger m-2' onClick={()=>{
                            sessionStorage.clear();
                            setInterval(()=> window.location.pathname = "/",1000);
                        }} value='Yes'/>
                        <input type='reset' className='btn btn-success m-2' onClick={handleClose} value='NO'/>
                    </div>
                </DialogActions>
            </Dialog>
            </Grow>
        )
    }
    const handleMenu = (menu, link) =>{
        return(
            <>
            <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
            <Toolbar sx={{display: 'flex', alignItems:'center', backgroundColor: 'gray'}}>
                <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'fit-content'}}>
                    <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    >
                    <Avatar
                        alt="Logo"
                        src={logo}
                        sx={{ width: 36, height: 36 }}
                    />
                    </IconButton>
                    <Typography variant="h6" noWrap component="a" href={link[0]} sx={{ flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                    DEVX
                    </Typography>
                </Container>
                <Container>
                    <Typography variant="h6" noWrap component="a" href={link[0]} sx={{ m: 2, flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                    {menu[0]}
                    </Typography>
                    <Typography variant="h6" noWrap component="a" href={link[1]} sx={{ m: 2, flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                    {menu[1]}
                    </Typography>
                    <Typography variant="h6" noWrap component="a" href={link[2]} sx={{ m: 2, flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                    {menu[2]}
                    </Typography>
                    <Typography variant="h6" noWrap component="a" href={link[3]} sx={{ m: 2, flexGrow: 1, letterSpacing: '.2rem', color: 'inherit', textDecoration: 'none'}}>
                    {menu[3]}
                    </Typography>
                </Container>
                <input type='submit' className='btn btn-danger btn-rounded m-2' onClick={handleOpen} value='Logout'/>
            </Toolbar>
            </AppBar>
        </Box>
        {handleLogout()}
        </>
        )
    }

    if(role === 'admin'){
        return(
        <>
            {handleMenu(["Home", "User", "Document", "Groups"],["/home", "/user", "/document", "/group"])}
        </>
        )
    }
    else if(role === 'panel member'){
        return(
        <>
            {handleMenu(["Home", "User", "Document", "Groups"],["/home", "/user", "/document", "/group"])}
        </>
        )
    }
    else{
        return (
        <>
            {handleMenu(["Home", "User", "Document", "Groups"],["/home", "/user", "/document", "/group"])}
        </>
        );
    }
}