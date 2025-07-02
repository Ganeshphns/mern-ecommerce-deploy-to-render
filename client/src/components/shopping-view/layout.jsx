import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

export default function ShoppingLayOut(){
   return(
    <div className="flex-col bg-white overflow-hidden">
        {/* common header */}
        <ShoppingHeader/>
          <main className="flex flex-col w-full">
            <Outlet/>
          </main>
    </div>
   )
}