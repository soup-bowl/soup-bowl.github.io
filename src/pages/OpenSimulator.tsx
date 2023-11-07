import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { AttentionLink } from "../components/Buttons";
import { IOpenSimulatorInstance, IOpenSimulatorStats } from "../interfaces";

const conf: IOpenSimulatorInstance[] = [
	{
		name: "Willowbourne",
		url: "https://meta.subo.dev/stats",
		slurl: "hop://hg.osgrid.org/Soupbowl/125/125/25",
		purpose: "Development Land"
	},
	{
		name: "Thistlewood",
		url: "https://meta.subo.dev/hgstats",
		slurl: "hop://hg.subo.dev/Thistlewood",
		purpose: "Trial Federated Region"
	}
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
				<AttentionLink href="https://www.osgrid.org/profile.php?name=balthazar%20swindon">
					OSgrid Profile
				</AttentionLink>
			</div>

			<div>
				<h2>Estates</h2>
				{config.map((instance, index) => {
					if (instance.stats !== undefined) {
						return (
							<div key={index} style={{ marginBottom: 20 }}>
								<ul>
									<li>Name: <strong>{instance.name}</strong></li>
									<li>State: <strong style={{ color: "green" }}>Online</strong></li>
									<li>Purpose: <strong>{instance.purpose}</strong></li>
									<li>Version: <strong>{instance.stats.Version}</strong></li>
									<li>Primitives: <strong>{instance.stats.Prims}</strong></li>
								</ul>
								<div style={{ textAlign: 'center' }}>
									<AttentionLink href={instance.slurl}>
										Visit In-world
									</AttentionLink>
								</div>
							</div>
						);
					} else {
						return (
							<div key={index}>
								<ul>
									<li>Name: <strong>{instance.name}</strong></li>
									<li>State: <strong style={{ color: "red" }}>Offline</strong></li>
								</ul>
								<div style={{ textAlign: 'center' }}>
									<AttentionLink disabled>
										Visit In-world
									</AttentionLink>
								</div>
							</div>
						);
					}
				})}
			</div>
		</>
	);
}

export default OpenSim;
