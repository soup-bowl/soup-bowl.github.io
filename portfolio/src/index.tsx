import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import Home from "@/Home"
import "@/index.css"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)

root.render(
	<StrictMode>
		<Home />
	</StrictMode>
)
