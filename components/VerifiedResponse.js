import {Panel, Text} from '@bigcommerce/big-design'
import { useImperativeHandle } from 'react'

const VerifiedResponse = (props) => {
    console.log(props)
    const vr = props.props
    return (
        <Panel header='App Template' marginTop="xlarge">
            <Text>Context : {vr.context}</Text>
            <Text>Store Hash : {vr.store_hash}</Text>
            <Text>User : {vr.user.id} {vr.user.email}</Text>
            <Text>Owner : {vr.owner.id} {vr.owner.email}</Text>
            <Text>Timestamp : {vr.timestamp}</Text>
        </Panel>
    )
}

export default VerifiedResponse