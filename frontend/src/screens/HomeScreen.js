import { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";

const HomeScreen = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			// if we do http://localhost:5000/api/products --> we get cors error
			// co we add a proxy in package.json in frontend after the name
			const { data } = await axios.get("/api/products");
			setProducts(data);
		};

		fetchProducts();
	}, []);

	return (
		<>
			<h1>Latest products</h1>
			<Row>
				{products.map((product) => (
					<Col sm={12} md={6} lg={4} xl={3} key={product._id}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</>
	);
};

export default HomeScreen;
