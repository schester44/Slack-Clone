import React from "react"
import styled from "styled-components"

import { Input } from "semantic-ui-react"

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	flex: 1;
`

const Messages = styled.div`
    flex: 1;
`

const ChatInput = styled.div`
    padding: 10px;
    width: 100%;
    
`

const ChatWindow = ({ channelName }) => {
	return (
		<Wrapper>
			<Messages />
			<ChatInput>
				<Input fluid placeholder={`Message #${channelName}`} />
			</ChatInput>
		</Wrapper>
	)
}

export default ChatWindow
