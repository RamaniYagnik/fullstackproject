import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home.js";
import Login from "../pages/login/Login.js"
import Signup from "../pages/signup/Signup.js";
import Forgotpassword from "../helpers/Forgotpassword.js"
import AdminPanel from "../pages/Adminpanel/AdminPanel.js";
import Allusers from "../pages/Adminpanel/allUsers/Allusers.js";
import AllProducts from "../pages/Adminpanel/Allproducts/AllProducts.js";
import CategoryProduct from "../pages/categoryproduct/CategoryProduct.js";
import Men from "../pages/AllCategoryPages/Men/Men.js";
import Women from "../pages/AllCategoryPages/Women/Women.js";
import Smartwatches from "../pages/AllCategoryPages/SmartWatches/Smartwatches.js";
import Xylys from "../pages/AllCategoryPages/Xylys/Xylys.js";
import Nebula from "../pages/AllCategoryPages/Nebula/Nebula.js";
import Edge from "../pages/AllCategoryPages/Edge/Edge.js";
import Raga from "../pages/AllCategoryPages/Raga/Raga.js";
import Watches from "../pages/AllCategoryPages/Watches/Watches.js";
import Coach from "../pages/AllCategoryPages/Coach/Coach.js";
import Police from "../pages/AllCategoryPages/Police/Police.js";
import Tommyhilfiger from "../pages/AllCategoryPages/Tommyhilfigir/Tommyhilfiger.js";
import Kennethcole from "../pages/AllCategoryPages/Kennethcole/Kennethcole.js";
import Annieklien from "../pages/AllCategoryPages/Anneiklien/Annieklien.js";
import Sale from "../pages/AllCategoryPages/Sale/Sale.js";
import Productdetails from "../pages/Productdetails/Productdetails.js";
import Cart from "../pages/Cart/Cart.js";
import SearchProduct from "../pages/Search/SearchProduct.js";
import Ordersuccess from "../pages/OrderSuccess/Ordersuccess.js";
import Orderpage from "../pages/Adminpanel/OrderPage/Orderpage.js";
import Wishlist from "../component/wishlist/Wishlist.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/forgotpassword",
                element: <Forgotpassword />
            },
            {
                path: "/productcategory",
                element: <CategoryProduct/>
            },
            {
                path: "/men",
                element: <Men/>
            },
            {
                path: "/women",
                element: <Women/>
            },
            {
                path: "/swatches",
                element: <Smartwatches/>
            },
            {
                path: "/xylys",
                element: <Xylys/>
            },
            {
                path: "/nebula",
                element: <Nebula/>
            },
            {
                path: "/edge",
                element: <Edge/>
            },
            {
                path: "/raga",
                element: <Raga/>
            },
            {
                path: "/watches",
                element: <Watches/>
            },
            {
                path: "/coach",
                element: <Coach/>
            },
            {
                path: "/police",
                element: <Police/>
            },
            {
                path: "/tommy",
                element: <Tommyhilfiger/>
            },
            {
                path: "/keneth",
                element: <Kennethcole/>
            },
            {
                path: "/anne",
                element: <Annieklien/>
            },
            {
                path: "/sale",
                element: <Sale/>
            },
            {
                path: "/productdetails/:id",
                element: <Productdetails/>
            },
            {
                path: "/cart",
                element: <Cart/>
            },
            {
                path: "/search",
                element: <SearchProduct/>
            },
            {
                path: "/order-success",
                element: <Ordersuccess/>
            },
            {
                path: "/wishlist",
                element: <Wishlist/>
            },
            {
                path: "/adminpanel",
                element: <AdminPanel />,
                children: [
                  {
                    path: "alluser",         
                    element: <Allusers />
                  },
                  {
                    path: "allproducts",     
                    element: <AllProducts />
                  },
                  {
                    path: "allorders",
                    element: <Orderpage />
                  }
                ]
              }
        ]
    }
])

export default router