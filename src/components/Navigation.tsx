import { ScrollButtons } from "./Buttons";

interface Props {
	pages: {id:number, label:string}[];
}

export const Scroller = ({ pages }:Props) => {
	const scrollTo = (location: string) => {
		document.getElementById(location)?.scrollIntoView({ behavior: 'smooth' });
	}
	
	const NavigateUp = () => {
		const move = WhereAmI() - 1;
		if (move >= 0) {
			scrollTo(pages[move].label);
		}
	}

	const NavigateDown = () => {
		const move = WhereAmI() + 1;
		if (move < pages.length) {
			scrollTo(pages[move].label);
		}
	}

	const WhereAmI = () => {
		let page = -1;
		for (let index = 0; index < pages.length; index++) {
			const elementTarget = document.getElementById(pages[index].label);

			if (elementTarget !== null) {
				if (window.scrollY >= (elementTarget.offsetTop + elementTarget.offsetHeight)) {
					page = pages[index].id;
				}
			}
		}
		return (page + 1);
	}

	return(
		<ScrollButtons onUp={NavigateUp} onDown={NavigateDown} />
	);
}

export default Scroller;
