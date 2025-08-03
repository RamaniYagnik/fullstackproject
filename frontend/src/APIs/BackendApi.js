const backendApi = process.env.BACKEND_URI

const Api = {
    signup: {
        url: `${backendApi}/user/signup`,
        method: "post"
    },
    login: {
        url: `${backendApi}/user/login`,
        method: "post"
    },
    current_user: {
        url: `${backendApi}/userDetail/getDetails`,
        method: "get"
    },
    logout: {
        url: `${backendApi}/userLogout/logout`,
        method: "get"
    },
    allusers: {
        url: `${backendApi}/Allusers/allusers`,
        method: "get"
    },
    updateUser: {
        url: `${backendApi}/updateuser/update`,
        method: "post"
    },
    addproducts: {
        url: `${backendApi}/products/create`,
        method: "post"
    },
    getproducts: {
        url: `${backendApi}/products/get`,
        method: "get"
    },
    updateproducts: {
        url: `${backendApi}/products/update`,
        method: "post"
    },
    category: {
        url: `${backendApi}/products/getCategoryProduct`,
        method: "get"
    },
    getCategoryWiseProducts: {
        url: `${backendApi}/products/getCategoryWiseProducts`,
        method: "post"
    },
    productDetails: {
        url: () => `${backendApi}/products/productdetails`,
        method: "post"
    },
    Addtocart: {
        url: `${backendApi}/cart/create`,
        method: "post"
    },
    getCount: {
        url: `${backendApi}/cart/getCount`,
        method: "get"
    },
    getProductInCart: {
        url: `${backendApi}/cart/getProductInCart`,
        method: "get"
    },
    updateProduct: {
        url: `${backendApi}/cart/update`,
        method: "put"
    },
    deleteProduct: {
        url: `${backendApi}/cart/delete`,
        method: "delete"
    },
    SearchProduct: {
        url: `${backendApi}/products/search`,
        method: "get"
    },
    filterProduct: {
        url: `${backendApi}/products/filter`,
        method: "post"
    },
    createOrder: {
        url: `${backendApi}/order/createOrder`,
        method: "post"
    },
    verifyPayment: {
        url: `${backendApi}/order/verifyPayment`,
        method: "post"
    },
    getOrder: {
        url: `${backendApi}/order/getOrder`,
        method: "get"
    },
    cancelOrder: { url: (id) => `${backendApi}/order/cancelOrder/${id}`, method: "PUT" },
    deleteOrder: { url: (id) => `${backendApi}/order/deleteOrder/${id}`, method: "DELETE" },
    getAllOrders: {
        url: `${backendApi}/order/getAllOrders`,
        method: "get"
    },
    updateOrder: {
        url: `${backendApi}/order/updateOrder`,
        method: "put"
    },
    addToWishlist: {
        url: `${backendApi}/wishlist/add`,
        method: "post"
    },
    getWishlist: {
        url: `${backendApi}/wishlist/get`,
        method: "get"
    },
    deleteWishlist: {
        url: (productId) => `${backendApi}/wishlist/delete/${productId}`,
        method: "delete"
    },
    getWishlistCount: {
        url: `${backendApi}/wishlist/getCount`,
        method: "get"
    },
}

export default Api