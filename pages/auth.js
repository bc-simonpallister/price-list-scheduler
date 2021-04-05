import { useRouter } from 'next/router'
import Link from 'next/link'
import BigCommerce from 'node-bigcommerce'
import {H1, Button, InlineAlert, Panel, Table} from '@bigcommerce/big-design'
import VerifiedResponse from '../components/VerifiedResponse'

const Auth = (props) => {
    console.log('AUTH')
    console.log(props)
    return (
        <div className="container">
            Some Text Here
            {props.auth.context ? (
            <>
                <H1>App Template </H1>
                <InlineAlert
                    type="success"
                    header="App Template has been successfully installed."
                    messages={[
                        {text: `StoreId is ${props.auth.context.split('/')[1]}`}
                    ]}
                    marginBottom="medium"
                />
                <VerifiedResponse props={props.auth} />
            </>
            ) : (
            <>
                <InlineAlert 
                    type="error" 
                    header="The installation has failed"
                    messages={[
                        { text: `Error Message : ${props.auth.message}` }
                    ]} 
                />
                <H1 marginTop="xLarge">App Template </H1>
                <p>Lorem ipsum maecenas dictum sed risus et sodales. Proin accumsan nibh quis lacus tincidunt dignissim. Etiam dignissim, leo vel aliquet feugiat, leo enim dapibus mi, a sollicitudin mi nulla molestie elit. Aliquam id semper sem. Morbi malesuada ultrices nulla, non commodo enim tempus a. Fusce bibendum fermentum sapien, in blandit nunc maximus nec. Integer id sagittis quam. Morbi rhoncus turpis nec mauris tincidunt ullamcorper.</p>
                <p><a href="https://developer.bigcommerce.com/api-docs/apps/quick-start" target="_new"><Button>BigCommerce App Development Quick Start</Button></a></p>
            </>
            )}
        </div>
    )
}

async function Authorize(context) {
    console.log('authorize')
    const bigCommerce = new BigCommerce({
        logLevel: "info",
        clientId: process.env.CLIENT_ID,
        secret: process.env.CLIENT_SECRET, 
        callback: process.env.CALLBACK, 
        responseType: "json",
        headers: { "Accept-Encoding": "*" },
        apiVersion: "v3"
    });

    let auth = {
        message : ''
    }

    // Incoming Params :
    //      { 
    //          code: 'xxxxxxxxxxxxxxxxxx',
    //          context: 'stores/XXXXXXXX',
    //          scope:
    //              '<scope> <scope>' 
    //      }
    
    if ( context.query.code){
        try {
            const data = await bigCommerce.authorize(context.query)

            console.log('returned data',data)

            if (typeof data.access_token !== "undefined") {
                auth = data

                console.log('creating...',data)
                const res = await fetch('https://pricelistscheduler.loca.lt/api/stores', {
                    method: "POST",
                    headers : {
                        "Content-Type": "application/json",
                        Accept: "appliction/json"
                    },
                    body: JSON.stringify(data)
                })
                auth.message = "Authorization Successful!"

            } else {
                auth.message = "Authorization Failed"
            }        
        } catch (error ) {
            console.log(error)
            auth.message = error.message
        }

    } else {
        auth.message = "No parameters received"
    }

    // Outgoing Params
    //  { access_token: 'xxxxxxxxxxxxxxxxxxx',
    //    scope: 'store_cart store_channel_listings <etc>',
    //    user: { id: 123123123, username: 'user@example.com', email: 'user@example.com' },
    //    context: 'stores/XXXXXXXXX' } }

    return auth
}
    

export async function getServerSideProps(context) {
    const auth = await Authorize(context)    
    return {
        props: {
            auth : auth
        } 
    }
}

export default Auth