import React from "react"
import styled from "styled-components"

const TeamListWrapper = styled.div`
	padding-top: 10px;
	width: 60px;
	height: 100%;
	background: rgba(41, 45, 54, 1);
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Team = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 18px;
	background: rgba(69, 78, 96, 1);
	border-radius: 10px;
	width: 40px;
	height: 40px;
	color: white;
	margin-bottom: 10px;
	cursor: pointer;

	&:hover {
		background: rgba(89, 98, 116, 1);
		box-shadow: 0px 2px 10px rgba(32, 32, 32, 0.5);
	}
`
const team = ({ id, initials }) => <Team key={`team-${id}`}>{initials}</Team>

const Teams = ({ teams }) => {
	return <TeamListWrapper>{teams.map(team)}</TeamListWrapper>
}

export default Teams
