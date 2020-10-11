import {H1, H2, Text} from '@bigcommerce/big-design'
import BigCommerce from 'node-bigcommerce'
import VerifyUser from '../components/VerifyUser'
import VerifiedResponse from '../components/VerifiedResponse'


const Load = (props) => {    
    return (
        <div className="container">
            <H1>App Template</H1>
            {props.verified ? (
                <H2>Success</H2>
            ) : (
                <H2>Failure</H2>
            )}
            <VerifiedResponse props={props.verified} />
        </div>
    )
}

export async function getServerSideProps(context) {

    let verified = {}

    try {   
        verified = await VerifyUser(context.query)    
    }
    catch (err) {
        console.log('error', err)
        verified.message = err.message
    }
    return {
        props: {
            verified : verified
        } 
    }

}

export default Load