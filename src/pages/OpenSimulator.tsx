import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { AttentionButton } from "../components/Buttons";
import { EState } from "../enums";
import { IOpenSimulatorStats } from "../interfaces";

const BigA = styled.a({
	fontWeight: 'bold'
});

const OpenSim = () => {
	const [estateInfo, setEstateInfo] = useState<IOpenSimulatorStats | undefined>(undefined);
	const [requestState, setRequestState] = useState<EState>(EState.Started);

	useEffect(() => {
		fetch('https://mv.soupbowl.io/stats')
			.then((response) => response.json())
			.then((response: IOpenSimulatorStats) => {
				setEstateInfo(response);
				setRequestState(EState.Complete);
			})
			.catch(() => setRequestState(EState.Error));
	}, []);

	return (
		<>
			<p>
				I have an <BigA href="http://opensimulator.org/wiki/Main_Page">OpenSimulator</BigA> metaverse server
				connected to the <BigA href="https://www.osgrid.org/">OSgrid network</BigA>. This is mostly for me to
				play around with metaverse technology, but the estate is open for all to visit and you are welcome to
				come check it out!
			</p>
			<div style={{ textAlign: 'center' }}>
				<AttentionButton onClick={() => window.location.href = "hop://hg.osgrid.org:80/Oxanhenge/195/25/25"}>
					Visit In-world
				</AttentionButton>
			</div>
			<p>
				My region currently has an ongoing issue where it becomes detached from osgrid. I have a script running
				to detect when this occurs and reboots the region. This always happens when nobody is online, but just a
				heads up that it may temporarily be down due to this yet-diagnosed issue.
			</p>
			
			<div>
				<h2>Estate Stats</h2>
				{requestState === EState.Complete && estateInfo !== undefined ?
				<ul>
					<li>State: <strong style={{ color: "green" }}>Online</strong></li>
					<li>Name: <strong>{estateInfo.RegionName}</strong></li>
					<li>Version: <strong>{estateInfo.Version}</strong></li>
					<li>Uptime: <strong>{estateInfo.Uptime.split('.')[0]}</strong></li>
					<li>Primitives on-site: <strong>{estateInfo.Prims}</strong></li>
				</ul>
				:
				<ul>
					<li>State: <strong style={{ color: "red" }}>Offline</strong></li>
				</ul>
				}
			</div>
		</>
	);
}

export default OpenSim;
