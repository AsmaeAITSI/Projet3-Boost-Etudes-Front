import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, Popover, MenuItem } from '@mui/material';

function Navbar({setIsAuthenticated, setUser, isAuthenticated}) {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

    const navbarStyle = {
        backgroundColor: '#d9a59a', // Couleur pêche
        color: 'black', // Couleur du texte en blanc
        
        
      };

      const handleLogout = () => {
        // ... (logique de déconnexion)
    
        setUser(null);
        // setShowDropdown(false); // Après la déconnexion, on masque le dropdown
        setIsAuthenticated(false);
        handleMenuClose();
      };

  return (
    <div className="navbar-container">
      <AppBar  position="static" style={navbarStyle}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <img
            src="/pictures/logo.png" // Chemin vers votre image de logo
            alt="Logo de Votre Site"
            style={{ width: '230px', height: 'auto', marginRight: '10px' }}
          />
          </Typography>
          <Button component={Link} to="/Qui-sommes-nous ?" color="inherit">
            Qui sommes-Nous
          </Button>
          <Button component={Link} to="/cours-particuliers" color="inherit">
            Cours Particuliers
          </Button>
          <Button component={Link} to="/cours-aide-devoirs" color="inherit">
            Cours d'Aide aux Devoirs
          </Button>
          {isAuthenticated ? (
            <>
              <Button
                aria-controls="account-menu"
                aria-haspopup="true"
                
                onClick={handleMenuClick}
                
              >
                Mon Compte
              </Button>
              <Menu
                id="account-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose} component={Link} to="/profile">
                  Profil
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/parametres">
                  Paramètres
                </MenuItem>
                <MenuItem onClick={handleLogout} component={Link} to="/mon-compte">Déconnexion</MenuItem>
              </Menu>
            </>
          ) : (
            <Button component={Link} to="/mon-compte" color="inherit">
              Mon Compte
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>

      
  );
}

export default Navbar;
