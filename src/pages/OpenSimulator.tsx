import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { AttentionButton } from "../components/Buttons";
import { IOpenSimulatorInstance, IOpenSimulatorStats } from "../interfaces";

const conf: IOpenSimulatorInstance[] = [
	{ url: "https://mv01.soupbowl.io/stats", slurl: "hop://hg.osgrid.org:80/Willowbourne%20South/123/125/26", purpose: "Raspberry Pi Estate" },
	{ url: "https://mv02.soupbowl.io/stats", slurl: "hop://hg.osgrid.org:80/Soupbowl%20Test/133/122/26", purpose: "Debugging connection problems" }
]

const BigA = styled.a({
	fontWeight: 'bold'
});

const OpenSim = () => {
	const [config, setConfig] = useState<IOpenSimulatorInstance[]>(conf);

	useEffect(() => {
		conf.forEach((instance, index) => {
			fetch(instance.url)
				.then(response => response.json())
				.then((data: IOpenSimulatorStats) => {
					setConfig(prevInstances => {
						const updatedInstances = [...prevInstances];
						updatedInstances[index] = {
							...updatedInstances[index],
							stats: data
						};
						return updatedInstances;
					});
				});
		});
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
				<AttentionButton onClick={() => window.location.href = "hop://hg.osgrid.org:80/Willowbourne/195/25/25"}>
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
				{config.map((instance, index) => {
					if (instance.stats !== undefined) {
						return (
							<ul key={index}>
								<li>State: <strong style={{ color: "green" }}>Online</strong></li>
								<li>Name: <strong>{instance.stats.RegionName}</strong></li>
								<li>Purpose: <strong>{instance.purpose}</strong></li>
								<li>Version: <strong>{instance.stats.Version}</strong></li>
								<li>Uptime: <strong>{instance.stats.Uptime.split('.')[0]}</strong></li>
								<li>Primitives: <strong>{instance.stats.Prims}</strong></li>
							</ul>
						);
					} else {
						return (
							<ul key={index}>
								<li>State: <strong style={{ color: "red" }}>Offline</strong></li>
							</ul>
						);
					}
				})}
			</div>
		</>
	);
}

export default OpenSim;
