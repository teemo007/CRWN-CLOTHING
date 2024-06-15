import { Link } from "react-router-dom";
import {NavigationContainer,LogoContainer,NavLinks,NavLink} from"./navigation.styles";
import CrwnLogo from "../../assets/crown.svg?react";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import Cartdropdown from "../../components/cart-dropdown/cart-dropdown.components";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const {isCartOpen} = useContext(CartContext)
  return (
    <>
    
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>

          {currentUser ? (
            <NavLinks as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLinks>
          ) : (
            <NavLink to='/auth'>
              SIGN IN
            </NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <Cartdropdown />}
      </NavigationContainer>
      
    
    </>
  );
};

export default Navigation;
