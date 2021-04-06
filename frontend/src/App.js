import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
// components
import Footer from "./components/Footer";
import Header from "./components/Header";

// screen components
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from './screens/LoginScreen'

const App = () => {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Route path="/" component={HomeScreen} exact />
					<Route path="/product/:id" component={ProductScreen} />
					<Route path="/cart/:id?" component={CartScreen} />
					<Route path="/login" component={LoginScreen} />
					{/* id? - means that id is optional */}
				</Container>
			</main>
			<Footer />
		</Router>
	);
};

export default App;
