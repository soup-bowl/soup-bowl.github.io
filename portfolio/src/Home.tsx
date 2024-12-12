import Layout from "@/components/Layout"
import { PageBody, PageHeader } from "@/components/Page"
import { About, Banner, Social } from "@/segments"

const Home = () => {
	const PageOrder = [
		{ id: 0, label: "start" },
		{ id: 1, label: "socials" },
		{ id: 2, label: "about" },
	]

	return (
		<Layout>
			<main>
				<PageHeader id={PageOrder[0].label}>
					<Banner />
				</PageHeader>

				<PageBody id={PageOrder[1].label} color="#a6faff">
					<Social />
				</PageBody>

				<PageBody id={PageOrder[2].label} color="#918efa">
					<About />
				</PageBody>
			</main>
		</Layout>
	)
}

export default Home
