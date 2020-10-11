import BigCommerce from 'node-bigcommerce'

const VerifyUser = async (query) => {

    if (!query.signed_payload){
        return {
            message: 'No parameters received'
        }
    }

    const bigCommerce = new BigCommerce({
        clientId: process.env.CLIENT_ID, 
        secret: process.env.CLIENT_SECRET, 
        responseType: "json",
        apiVersion: "v2"
    });

    const data = bigCommerce.verify(query.signed_payload);
    if (typeof data.user !== "undefined") {
        return data
    } else {
        return {
            data : data,
            message: 'Something went wrong!'
        }
    }
}

export default VerifyUser