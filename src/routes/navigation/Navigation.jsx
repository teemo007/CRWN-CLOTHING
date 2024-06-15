import { Link } from "react-router-dom";
import {NavigationContainer,LogoContainer,NavLinks,NavLink,SignOutContainer,UserIcon} from"./navigation.styles";
import CrwnLogo from "../../assets/crown.svg?react";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import Cartdropdown from "../../components/cart-dropdown/cart-dropdown.components";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  console.log(currentUser)
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

          {currentUser ? (<SignOutContainer><UserIcon>{currentUser.email.charAt(0)}</UserIcon>
            <NavLink as='span' onClick={signOutUser}>
              SIGN OUT
            </NavLink></SignOutContainer>
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
