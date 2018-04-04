import React from "react"
import { Icon } from "semantic-ui-react"

const UserStatusBubble = ({ online = false }) => {
	return online ? (<Icon size="tiny" name="circle" color="green" />) : (<Icon size="tiny" name="circle notched" />)
}

export default UserStatusBubble
