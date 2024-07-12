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
import Cartdropdown from "../../components/cart-dropdown/cart-dropdown.components";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import { signOutStart } from "../../store/user/user.action";

const Navigation = () => {
  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen)
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOutStart())
  }
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
              <NavLink as="span" onClick={handleSignOut}>
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
