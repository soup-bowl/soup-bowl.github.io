import styled from "@emotion/styled"
import { ScrollButtons } from "@soupbowl/neobrutalism-react"
import { keyframes } from "@emotion/react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"

interface Props {
	pages: { id: number; label: string }[]
}

export const Scroller = ({ pages }: Props) => {
	const scrollTo = (location: string) => {
		document.getElementById(location)?.scrollIntoView({ behavior: "smooth" })
	}

	const NavigateUp = () => {
		const move = WhereAmI() - 1
		if (move >= 0) {
			scrollTo(pages[move].label)
		}
	}

	const NavigateDown = () => {
		const move = WhereAmI() + 1
		if (move < pages.length) {
			scrollTo(pages[move].label)
		}
	}

	const WhereAmI = () => {
		let page = -1
		for (const pageItem of pages) {
			const elementTarget = document.getElementById(pageItem.label)

			if (elementTarget !== null) {
				if (window.scrollY >= elementTarget.offsetTop + elementTarget.offsetHeight) {
					page = pageItem.id
				}
			}
		}
		return page + 1
	}

	return (
		<ScrollButtons
			buttonUp={<FontAwesomeIcon icon={faChevronUp} />}
			buttonDown={<FontAwesomeIcon icon={faChevronDown} />}
			onUp={NavigateUp}
			onDown={NavigateDown}
		/>
	)
}

const bounce = keyframes`
	0%, 100% {
		transform: translateY(0);
	}
	50% {
		transform: translateY(-10px);
	}
`

export const ScrollHint = styled.div({
	position: "absolute",
	right: 10,
	bottom: 0,
	fontSize: "5rem",
	animation: `${bounce} 3s infinite`,
})
