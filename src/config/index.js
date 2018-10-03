import config from "react-global-configuration";
import dev from "./dev";
import prod from "./prod";

console.log("configing");
if (window.location.hostname === "localhost") {
	config.set(prod, { freeze: false });
	config.set(dev, { assign: true });
} else {
	config.set(prod);
}
