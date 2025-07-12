import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { logoutUser, resetTokenAndCredentials } from "@/store/auth-slice";
import { useEffect, useState } from "react";

import { fetchCartItems } from "@/store/shop/cart-slice";
import UserCartWrapper from "./cart-wrapper";
import { Label } from "../ui/label";
//import { DropdownMenu } from "@radix-ui/react-dropdown-menu";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  function handleNavigate(getCurrentMenuItem) {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItems) => (
        <Label
          className="text-sm font-medium cursor-pointer"
          key={menuItems.id}
          onClick={() => handleNavigate(menuItems)}
          //to={menuItems.path}
        >
          {menuItems.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleLogout() {
    // dispatch(logoutUser());
      dispatch(resetTokenAndCredentials());
      sessionStorage.clear();
      navigate('/auth/login');
  
  }

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCartItems(user.id)); // ✅ Pass just the string
    }
  }, [dispatch, user]);
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4 relative">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>

      <div className="relative z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="bg-black w-10 h-10 rounded-full">
              <AvatarFallback className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white font-extrabold">
                {user?.userName[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side="right"
            className=" z-50 w-56 bg-white rounded-md shadow-md space-y-1 py-2"
          >
            <DropdownMenuLabel className="text-sm text-muted-foreground px-2 pb-1">
              Logged in as{" "}
              <span className="font-medium text-black">{user?.userName}</span>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => navigate("/shop/account")}
              className="flex items-center gap-2 px-2 py-2"
            >
              <UserCog className="h-4 w-4" />
              <span>Account</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="flex items-center gap-2 px-2 py-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default function ShoppingHeader() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  console.log(user, "user");

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/shop/home" className="flex h-16 items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">Ecommerce</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          {/* <SheetContent side="left" className="w-full max-w-xs px-5 py-7 pb-0 overflow-visible"> */}
          <SheetContent
            side="left"
            className="w-full max-w-xs px-5 py-7 pb-0 !overflow-visible !visible z-50"
          >
            <MenuItems />
            <HeaderRightContent />
          </SheetContent>
        </Sheet>
        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
          <HeaderRightContent />
        </div>
      </div>
    </header>
  );
}
