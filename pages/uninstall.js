import {H1,H2, Text} from '@bigcommerce/big-design'
import VerifyUser from '../components/VerifyUser'
import VerifiedResponse from '../components/VerifiedResponse'

// https://developer.bigcommerce.com/api-docs/apps/guide/callbacks#uninstall-callback

const Uninstall = () => {
    console.log('UNINSTALL')
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
    const verify = await VerifyUser(context)    
    return {
        props: {
            verify : verify
        } 
    }
}


export default Uninstall