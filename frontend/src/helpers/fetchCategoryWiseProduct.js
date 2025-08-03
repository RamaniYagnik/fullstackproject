import Api from "../APIs/BackendApi"

const fetchCategoryWiseProduct = async(category) => {
    const response = await fetch(Api.getCategoryWiseProducts.url,{
        method: Api.getCategoryWiseProducts.method,
        headers: {
            "Content-type" : "application/json"
        },
        body : JSON.stringify({
            category: category
        })
    })
    const dataResponse = await response.json()
    return dataResponse
}

export default fetchCategoryWiseProduct