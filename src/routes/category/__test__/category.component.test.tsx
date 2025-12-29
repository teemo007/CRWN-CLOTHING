import { screen } from "@testing-library/react";
import Category from "../category.component";

import { renderWithProviders } from "../../../utils/test/test.utils";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

describe("Category tests", () => {
  test("It should render a Spinner if isLoading is true", () => {
    const router = createMemoryRouter(
      [{ path: "/shop/:category", element: <Category /> }],
      { initialEntries: ["/shop/hats"] }
    );
    renderWithProviders(<RouterProvider router={router} />, {
      preloadedState: {
        categories: {
          isLoading: true,
          categories: [],
        },
      },
    });
    const spinnerEl = screen.getByTestId("spinner");
    expect(spinnerEl).toBeInTheDocument();
  });
  test("it should render Categories if isLoading is fasle and there are items present", () => {
    const router = createMemoryRouter(
      [{ path: "/shop/:category", element: <Category /> }],
      { initialEntries: ["/shop/hats"] }
    );
    renderWithProviders(<RouterProvider router={router} />, {
      preloadedState: {
        categories: {
          isLoading: false,
          categories: [
            {
              title: "hats",
              items: [
                { id: 1, name: "Product 1" },
                { id: 2, name: "Product 2" },
              ],
            },
          ],
        },
      },
    });
    const spinnerEl = screen.queryByTestId("spinner");
    expect(spinnerEl).toBeNull();

    const product1El = screen.getByText(/product 1/i);
    expect(product1El).toBeInTheDocument();
  });
});
