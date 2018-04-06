import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { routes } from "../../routes"

const TeamListWrapper = styled.div`
	padding-top: 10px;
	width: 60px;
	min-width: 60px;
	height: 100%;
	background: rgba(41, 45, 54, 1);
	display: flex;
	flex-direction: column;
	align-items: center;
	overflow-y: auto;

	&::-webkit-scrollbar {
		display: none;
	}
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
	min-height: 40px;
	color: white;
	margin-bottom: 10px;
	text-transform: uppercase;
	user-select: none;

	${props =>
		props.isActive &&
		`
		background: white;
		color: rgba(37, 181, 169, 1.0);
		`} &:hover {
		${props =>
			!props.isActive &&
			`
			background: rgba(89, 98, 116, 1);
			cursor: pointer;
			box-shadow: 0px 2px 10px rgba(32, 32, 32, 0.5);
			`};
	}
`
const team = ({ id, initials, isActive }) => (
	<Link key={`team-${id}`} to={`${routes.team}/${id}`}>
		<Team isActive={isActive}>{initials}</Team>
	</Link>
)

const Teams = ({ teams }) => {
	return <TeamListWrapper>{teams.map(team)}</TeamListWrapper>
}

export default Teams
