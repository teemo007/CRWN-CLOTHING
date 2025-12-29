import { prettyDOM, screen, fireEvent } from "@testing-library/react";
import * as reactRedux from "react-redux";
import Navigation from "../Navigation";
import { renderWithProviders } from "../../../utils/test/test.utils";
import { MemoryRouter } from "react-router-dom";
import Cartdropdown from "../../../components/cart-dropdown/cart-dropdown.components";
import CartItem from "../../../components/cart-item/CartItem";
import { signOutStart } from "../../../store/user/user.action";
import userEvent from "@testing-library/user-event";
import { legacy_createStore as createStore } from "redux";
import { rootReducer } from "../../../store/root-reducer";

describe("Navigation tests", () => {
  test("It should render a Sign in link and not a Sign out Link if there is no currentUser", () => {
    renderWithProviders(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>,
      {
        preloadedState: {
          user: {
            currentUser: null,
          },
        },
      }
    );
    const signInLinkElement = screen.getByText(/sign in/i);
    expect(signInLinkElement).toBeInTheDocument();

    const signOutLinkElement = screen.queryByText(/sign out/i);
    expect(signOutLinkElement).toBeNull();
  });
  test("It should render a Sign Out and not Sign In if there is a currentUser", () => {
    renderWithProviders(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>,
      {
        preloadedState: {
          user: {
            currentUser: {},
          },
        },
      }
    );

    const signOutLinkElement = screen.getByText(/sign out/i);
    // console.log(prettyDOM(signOutLinkElement))
    expect(signOutLinkElement).toBeInTheDocument();

    const signInLinkElement = screen.queryByText(/sign in/i); // query return null if there is nothing found, getByText throw error if do not found anything.
    expect(signInLinkElement).toBeNull();
  });
  test("It should not render a cart-dropDown if isCartOpen is false", () => {
    renderWithProviders(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>,
      {
        preloadedState: {
          cart: {
            isCartOpen: false,
            cartItems: [],
          },
        },
      }
    );
    const cartDropDownTextElement = screen.queryByText(/Your cart is empty/i);
    expect(cartDropDownTextElement).toBeNull();
  });
  test("It should render a cart-dropDown if isCartOpen is true", () => {
    renderWithProviders(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>,
      {
        preloadedState: {
          cart: {
            isCartOpen: true,
            cartItems: [],
          },
        },
      }
    );
    const cartDropDownTextElement = screen.queryByText(/GO TO CHECKOUT/i);
    expect(cartDropDownTextElement).toBeInTheDocument();
  });

  test("dispatches signOutStart when clicking Sign Out", async () => {
    const user = userEvent.setup();

    const store = createStore(rootReducer, {
      user: { currentUser: {} },
    });

    const dispatchSpy = vi.spyOn(store, "dispatch");

    renderWithProviders(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>,
      { store }
    );

    await user.click(screen.getByText(/sign out/i));

    expect(dispatchSpy).toHaveBeenCalled()
    expect(dispatchSpy).toHaveBeenCalledWith(signOutStart())
  });
});
