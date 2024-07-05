import {
  NavigationContainer,
  LogoContainer,
  NavLinks,
  NavLink,
  SignOutContainer,
  UserIcon,
} from "./navigation.styles";
import CrwnLogo from "../../assets/crown.svg?react";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import Cartdropdown from "../../components/cart-dropdown/cart-dropdown.components";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen)
  console.log("currentUser",currentUser)
  return (
    <>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinks>
          <NavLink to="/shop">SHOP</NavLink>

          {currentUser ? (
            <SignOutContainer>
              <UserIcon>{currentUser.email?.charAt(0)}</UserIcon>
              <NavLink as="span" onClick={signOutUser}>
                SIGN OUT
              </NavLink>
            </SignOutContainer>
          ) : (
            <NavLink to="/auth">SIGN IN</NavLink>
          )}
          <CartIcon />
        </NavLinks>
        {isCartOpen && <Cartdropdown />}
      </NavigationContainer>
    </>
  );
};

export default Navigation;
