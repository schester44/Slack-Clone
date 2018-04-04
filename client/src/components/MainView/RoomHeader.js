import React from "react"
import styled from "styled-components"

import { Input, Icon } from "semantic-ui-react"

const Wrapper = styled.div`
	width: 100%;
	height: 70px;
	display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(232, 229, 235, 1);
    padding: 0 10px;
    
    h1 {
        font-size: 20px;
        line-height: 1.5;
        margin: 0;
	}
`

const RoomHeader = ({ channelName }) => (
	<Wrapper>
		<div>
			<h1>#{channelName}</h1>
            <div>
				<Icon name="empty star" /> | <Icon name="users" /> 6513 | Some room description
			</div>
		</div>
        <div style={{ display: "flex", alignItems: "center" }}>
			<Icon.Group size="large">
				<Icon name="options" />
				<Icon name="maximize" />
			</Icon.Group>
            <Input placeholder="Search..." style={{ margin: "0 15px"}}/>
			<Icon.Group size="large">
				<Icon name="empty star" />
				<Icon type="ellipsis vertical" />
			</Icon.Group>
		</div>
	</Wrapper>
)

export default RoomHeader
