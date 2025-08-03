import Api from "../APIs/BackendApi"
import { toast } from 'react-toastify'

const Addtocart = async(e,id) => {
    e?.stopPropagation()
    e?.preventDefault()

    const response = await fetch(Api.Addtocart.url,{
        method: Api.Addtocart.method,
        credentials: 'include',
        headers: {
            "Content-Type":"application/json"
        },
        body : JSON.stringify({
            productId : id,
            quantity : 1
        })
    })

    const responseData = await response.json()

    if(responseData.success){
        toast.success(responseData.message)
    }

    if (responseData.error) {
        toast.error(responseData.message)
    }

    return responseData

}

export default Addtocart