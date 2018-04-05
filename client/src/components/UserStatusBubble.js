import React from "react"
import { Icon } from "semantic-ui-react"

const UserStatusBubble = ({ online = false }) => {
	return <Icon size="tiny" name="circle" color={online ? "green" : "orange"} />
}

export default UserStatusBubble
