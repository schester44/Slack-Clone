import React, { Component } from "react"
import styled from "styled-components"

import { Icon, Menu, Checkbox } from "semantic-ui-react"

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
	padding-right: 5px;
	cursor: pointer;
	position: relative;

	h5 {
		font-size: 14px;
		padding: 0;
		font-weight: 400;
		margin: 0;
	}
`

const UserDetails = ({ teamName, username, color = "white" }) => {
	return (
		<div style={{ display: "flex", alignItems: "center", marginTop: 2 }}>
			<img
				src="https://i.flockusercontent2.com/zp8nvpj87j18z9j7?r=115509982"
				alt="Profile"
				style={{ maxWidth: 30, maxHeight: 30, borderRadius: 3 }}
			/>
			<div style={{ color, fontSize: 14, fontWeight: 100, marginLeft: 5 }}>
				<div>{username}</div>
				<Icon name="time" style={{ color: "yellow" }} />
			</div>
		</div>
	)
}

class UserInfo extends Component {
	constructor(props) {
		super(props)

		this.state = {
			optionsVisible: false
		}

		this.handleClick = this.handleClick.bind(this)
		this.handleClickOutside = this.handleClickOutside.bind(this)
	}

	handleClick() {
		if (!this.state.optionsVisible) {
			document.addEventListener("click", this.handleClickOutside)
		} else {
			document.removeEventListener("click", this.handleClickOutside)
		}

		this.setState({ optionsVisible: !this.state.optionsVisible })
	}

	handleClickOutside({ target }) {
		if (this.elementRef && !this.elementRef.contains(target)) {
			this.handleClick()
		}
	}

	render() {
		const { teamName, username } = this.props

		return (
			<Wrapper onClick={this.handleClick} innerRef={el => (this.elementRef = el)}>
				<div>
					<h5 style={{ color: "rgba(211,211,211,1.0)" }}>{teamName}</h5>
					<UserDetails username={username} teamName={teamName} />
				</div>

				{this.state.optionsVisible && (
					<Menu size="large" style={{ position: "absolute", left: 0, top: 30 }} vertical>
						<Menu.Item style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<UserDetails color="black" username={username} teamName={teamName} />
							<Icon
								size="small"
								circular
								style={{ background: "rgba(211, 211, 211, 1.0)", color: "white" }}
								name="pencil"
							/>
						</Menu.Item>

						<Menu.Item>
							<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
								<div>
									<div>Do Not Disturb</div>
									<span style={{ fontSize: 12, color: "rgba(211,211,211,1.0)" }}>Stop receiving notifications</span>
								</div>

								<Checkbox slider />
							</div>
							<p style={{ marginTop: 10 }}>Notification Preferences</p>
						</Menu.Item>
						<Menu.Item>Keyboard Shortcuts</Menu.Item>
						<Menu.Item>Contact Support</Menu.Item>
						<Menu.Item>Add new Team</Menu.Item>
						<Menu.Item>
							<p style={{ margin: 0, padding: 0 }}>Sign Out</p>
							<p style={{ margin: 0, padding: 0, fontSize: 14, color: "rgba(211,211,211,1.0)" }}>{username}</p>
						</Menu.Item>
					</Menu>
				)}
			</Wrapper>
		)
	}
}

export default UserInfo
