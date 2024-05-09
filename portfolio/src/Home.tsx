import styled from "@emotion/styled";
import { faDiscord, faDocker, faGithub, faMastodon, faWordpressSimple } from "@fortawesome/free-brands-svg-icons";
import { faBlog, faVial } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Layout from "./components/Layout";
import { Modal } from "./components/Modal";
import { Social, SocialPanel } from "./components/Social";
import { About, Blog, GitHub, Labs, Mastodon, OpenSim, WordPress } from "./pages";
import { AttentionButton } from "./components/Buttons";
import { blackOrWhite, hexToRgb } from "./utils/colour";

const PageOrder = [
	{ id: 0, label: 'start' },
	{ id: 1, label: 'socials' },
	{ id: 2, label: 'about' },
];

const PageHeader = styled.section({
	display: 'flex',
	alignItems: 'end',
	height: '100vh',
	scrollSnapAlign: "start",
	'& > div': {
		display: 'flex',
		flexDirection: 'row',
		gap: 20,
		width: '100%',
		backgroundColor: '#ff965b',
		color: "#000",
		padding: 20,
		border: '4px solid black',
		fontSize: '24px',
		img: {
			width: 200
		},
		'@media only screen and (max-width: 650px)': {
			flexDirection: 'column',
			alignItems: 'center',
			textAlign: 'center',
			gap: 0,
			marginTop: 20,
			paddingBottom: 50,
			img: {
				width: 150
			}
		}
	}
});

const PageBody = styled.section(props => ({
	backgroundColor: props.color,
	color: blackOrWhite(hexToRgb(props.color ?? '#000')),
	border: '4px solid black',
	minHeight: '100vh',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	scrollSnapAlign: "start",
	'@media only screen and (max-width: 650px)': {
		paddingBottom: 50
	}
}));

const SocialContainer = styled.div({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%'
});

const Home = () => {
	const [open, setOpen] = useState<string>("0");

	const openDialog = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		// @ts-ignore
		setOpen(e.target.parentElement.id);
	};

	const closeDialog = () => {
		setOpen("0");
	};

	return (
		<Layout>
			<Modal large title="Blog" open={(open === "1") ? true : false} onClose={closeDialog}>
				<Blog />
			</Modal>
			<Modal large title="Experiments" open={(open === "2") ? true : false} onClose={closeDialog}>
				<Labs />
			</Modal>
			<Modal large title="GitHub" open={(open === "3") ? true : false} onClose={closeDialog}>
				<GitHub />
			</Modal>
			<Modal large title="WordPress" open={(open === "4") ? true : false} onClose={closeDialog}>
				<WordPress />
			</Modal>
			<Modal title="OSgrid Estate" open={(open === "6") ? true : false} onClose={closeDialog}>
				<OpenSim />
			</Modal>
			<Modal large title="Mastodon" open={(open === "7") ? true : false} onClose={closeDialog}>
				<Mastodon />
			</Modal>
			<Modal title="Lemmy" open={(open === "8") ? true : false} onClose={closeDialog}>
				<div style={{ textAlign: 'center' }}>
					<p>Nothing here just yet.</p>
					<AttentionButton onClick={() => window.location.href = "https://lemmy.world/u/soupbowl"}>
						Lemmy Profile
					</AttentionButton>
				</div>
			</Modal>
			<Modal title="Talking on Discord" open={(open === "9") ? true : false} onClose={closeDialog}>
				<p>There's no direct link to <strong>Discord</strong>, so to start a chat:</p>
				<ul>
					<li>Open the Discord app (desktop, mobile, whatever).</li>
					<li>Click on <strong>Find or Start a Conversation</strong>.</li>
					<li>Paste in <strong>subo.dev</strong>.</li>
					<li>???</li>
					<li>Profit!</li>
				</ul>
				<p>Alternatively, click below to open my profile.</p>
				<div style={{ textAlign: 'center' }}>
					<AttentionButton onClick={() => window.location.href = "https://discord.com/users/555374749019013141"}>
						Discord Profile
					</AttentionButton>
				</div>
			</Modal>
			<Modal title="Docker" open={(open === "10") ? true : false} onClose={closeDialog}>
				<div style={{ textAlign: 'center' }}>
					<AttentionButton onClick={() => window.location.href = "https://hub.docker.com/u/soupbowl"}>
						Dockerhub Account
					</AttentionButton>
				</div>
				<h2 style={{ textAlign: 'center' }}>Images</h2>
				<div style={{ textAlign: 'center' }}>
					<p style={{ fontSize: '4rem', lineHeight: 0 }}>:(</p>
					<p>Dockerhub API is not open, so unfortunately I can't show this info just yet.</p>
				</div>
			</Modal>

			<main>
				<PageHeader id={PageOrder[0].label}>
					<div>
						<div>
							<img src="https://files.soupbowl.io/i/logo.webp" />
						</div>
						<div>
							<h1 style={{ fontSize: '48px' }}>Soupbowl</h1>
							<p><strong>DevOps Engineer</strong> from <strong>Hertfordshire, UK</strong></p>
						</div>
					</div>
				</PageHeader>

				<PageBody id={PageOrder[1].label} color='#a6faff'>
					<SocialContainer>
						<SocialPanel>
							<Social id="1" icon={faBlog} color="#29132e" onClick={openDialog}>
								Blog
							</Social>
							<Social id="2" icon={faVial} color="#00ad2b" onClick={openDialog}>
								Experiments
							</Social>
							<Social id="3" icon={faGithub} color="#2d333b" onClick={openDialog}>
								soup-bowl
							</Social>
							<Social id="4" icon={faWordpressSimple} color="#0085BA" onClick={openDialog}>
								soupbowl
							</Social>
							<Social id="10" icon={faDocker} color="#086DD7" onClick={openDialog}>
								soupbowl
							</Social>
							<Social id="6" color="#FFCB00" onClick={openDialog} iconSvg={
								<svg style={{ height: '1em' }} aria-hidden="true" focusable="false" data-prefix="fab" data-icon="osgrid" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
									<path fill="currentColor"
										d="m 211.03302,495.50159 -28.64472,2.60404 -80.72625,-61.19568 -1.30198,-18.22855 61.19568,-44.26921 -148.432112,-95.04862 -10.4162758,-22.1346 24.7387098,-92.44454 18.228445,-6.51018 178.378953,109.37101 -19.53057,76.8201 62.49773,-44.2692 71.61205,49.47736 -33.85301,-84.63234 63.79978,-48.17533 -80.72625,2.60407 -24.73866,-70.30994 -22.1346,72.91401 -95.04861,-1.30198 -32.55095,-20.83258 57.28959,-179.680948 24.73871,-13.0203587 93.74658,3.9061137 15.62441,18.228512 -23.43658,62.497714 h 171.86869 l 16.92647,9.114247 37.75901,96.35065 -9.11422,15.62443 -79.42419,1.30198 65.10176,171.86873 -6.51012,23.43667 -85.93438,58.59161 -16.92647,-6.51012 -23.43666,-69.00795 z" />
								</svg>
							}>
								Balthazar Swindon
							</Social>
							<Social id="7" icon={faMastodon} color="#6364ff" onClick={openDialog}>
								soupbowl<br />@mstdn.social
							</Social>
							<Social id="8" color="#00bc8c" onClick={openDialog} iconSvg={
								<svg style={{ height: '1em' }} viewBox="0 0 951.2393 626.50705">
									<g transform="translate(-36.380379,-256.78621)">
										<path fill="currentColor" d="m 167.03908,270.78735 c -0.94784,-0.002 -1.8939,0.004 -2.83789,0.0215 -4.31538,0.0778 -8.58934,0.3593 -12.8125,0.8457 -33.78522,3.89116 -64.215716,21.86394 -82.871086,53.27344 -18.27982,30.77718 -22.77749,64.66635 -13.46094,96.06837 9.31655,31.40203 31.88488,59.93174 65.296886,82.5332 0.20163,0.13618 0.40678,0.26709 0.61523,0.39258 28.65434,17.27768 57.18167,28.93179 87.74218,34.95508 -0.74566,12.61339 -0.72532,25.5717 0.082,38.84375 2.43989,40.10943 16.60718,77.03742 38.0957,109.67187 l -77.00781,31.4375 c -8.30605,3.25932 -12.34178,12.68234 -8.96967,20.94324 3.37211,8.2609 12.84919,12.16798 21.06342,8.68371 l 84.69727,-34.57617 c 15.70675,18.72702 33.75346,35.68305 53.12109,50.57032 0.74013,0.56891 1.4904,1.12236 2.23437,1.68554 l -49.61132,65.69141 c -5.45446,7.0474 -4.10058,17.19288 3.01098,22.5634 7.11156,5.37052 17.24028,3.89649 22.52612,-3.27824 l 50.38672,-66.71876 c 27.68572,17.53469 57.07524,31.20388 86.07227,40.25196 14.88153,27.28008 43.96965,44.64648 77.58789,44.64648 33.93762,0 63.04252,-18.68693 77.80082,-45.4375 28.7072,-9.21295 57.7527,-22.93196 85.1484,-40.40234 l 51.0977,67.66016 c 5.2858,7.17473 15.4145,8.64876 22.5261,3.27824 7.1115,-5.37052 8.4654,-15.516 3.011,-22.5634 l -50.3614,-66.68555 c 0.334,-0.25394 0.6727,-0.50077 1.0059,-0.75586 19.1376,-14.64919 37.0259,-31.28581 52.7031,-49.63476 l 82.5625,33.70507 c 8.2143,3.48427 17.6913,-0.42281 21.0634,-8.68371 3.3722,-8.2609 -0.6636,-17.68392 -8.9696,-20.94324 l -74.5391,-30.42773 c 22.1722,-32.82971 37.0383,-70.03397 40.1426,-110.46094 1.0253,-13.35251 1.2292,-26.42535 0.6387,-39.17578 30.3557,-6.05408 58.7164,-17.66833 87.2011,-34.84375 0.2085,-0.12549 0.4136,-0.2564 0.6153,-0.39258 33.412,-22.60147 55.9803,-51.13117 65.2968,-82.5332 9.3166,-31.40202 4.8189,-65.29118 -13.4609,-96.06837 -18.6553,-31.40951 -49.0859,-49.38228 -82.8711,-53.27344 -4.2231,-0.4864 -8.4971,-0.76791 -12.8125,-0.8457 -30.2077,-0.54448 -62.4407,8.82427 -93.4316,26.71484 -22.7976,13.16063 -43.3521,33.31423 -59.4375,55.30469 -44.9968,-25.75094 -103.5444,-40.25065 -175.4785,-41.43945 -6.4522,-0.10663 -13.0125,-0.10696 -19.67974,0.002 -80.18875,1.30929 -144.38284,16.5086 -192.87109,43.9922 -0.11914,-0.19111 -0.24287,-0.37932 -0.37109,-0.56446 -16.29,-22.764 -37.41085,-43.73706 -60.89649,-57.29493 -30.02247,-17.33149 -61.21051,-26.66489 -90.59375,-26.73633 z" />
										<path fill="currentColor" d="m 716.85595,362.96478 c 15.29075,-21.36763 35.36198,-41.10921 56.50979,-53.31749 66.66377,-38.48393 137.02617,-33.22172 170.08018,22.43043 33.09493,55.72093 14.98656,117.48866 -47.64399,159.85496 -31.95554,19.26819 -62.93318,30.92309 -97.22892,35.54473 M 307.14407,362.96478 C 291.85332,341.59715 271.78209,321.85557 250.63429,309.64729 183.97051,271.16336 113.60811,276.42557 80.554051,332.07772 47.459131,387.79865 65.56752,449.56638 128.19809,491.93268 c 31.95554,19.26819 62.93319,30.92309 97.22893,35.54473" />
										<path fill="currentColor" d="M 801.23205,576.8699 C 812.73478,427.06971 720.58431,321.98291 511.99999,325.38859 303.41568,328.79426 213.71393,428.0311 222.76794,576.8699 c 8.64289,142.08048 176.80223,246.40388 288.12038,246.40388 111.31815,0 279.45076,-104.5447 290.34373,-246.40388 z" />
										<path fill="currentColor" d="m 610.4991,644.28932 c 0,23.11198 18.70595,41.84795 41.78091,41.84795 23.07495,0 41.7809,-18.73597 41.7809,-41.84795 0,-23.112 -18.70594,-41.84796 -41.7809,-41.84796 -23.07496,0 -41.78091,18.73596 -41.78091,41.84796 z m -280.56002,0 c 0,23.32492 18.87829,42.23352 42.16586,42.23352 23.28755,0 42.16585,-18.9086 42.16585,-42.23352 0,-23.32494 -18.87829,-42.23353 -42.16585,-42.23353 -23.28757,0 -42.16586,18.90859 -42.16586,42.23353 z" />
										<path fill="currentColor" d="m 339.72919,769.2467 -54.54422,72.22481 m 399.08582,-72.22481 54.54423,72.22481 M 263.68341,697.82002 175.92752,733.64353 m 579.85765,-35.82351 87.7559,35.82351" />
										<path fill="currentColor" d="m 512.00082,713.08977 c -45.86417,0 -75.13006,31.84485 -74.14159,71.10084 1.07048,42.51275 32.46865,71.10323 74.14159,71.10323 41.67296,0 74.05118,-32.99608 74.14161,-71.10323 0.0932,-39.26839 -28.27742,-71.10084 -74.14161,-71.10084 z" />
									</g>
								</svg>
							}>
								soupbowl<br />@lemmy.world
							</Social>
							<Social id="9" icon={faDiscord} color="#5865f2" onClick={openDialog}>
								subo.dev
							</Social>
						</SocialPanel>
					</SocialContainer>
				</PageBody>

				<PageBody id={PageOrder[2].label} color='#918efa'>
					<About />
				</PageBody>
			</main>
		</Layout>
	);
}

export default Home;
