import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";

// match comes from params.match and we can get an :id from a url because
// in App.js we have a route path="/product/:id"

const ProductScreen = ({ match }) => {
	const [product, setProduct] = useState({});

	useEffect(() => {
		const fetchProduct = async () => {
			// if we do http://localhost:5000/api/products --> we get cors error
			// co we add a proxy in package.json in frontend after the name
			const { data } = await axios.get(
				`/api/products/${match.params.id}`
			);
			setProduct(data);
		};

		fetchProduct();
	}, [match]);

	// const product = products.find((p) => p._id === match.params.id);
	// console.log(product);
	return (
		<>
			<Link className="btn btn-light my-3" to="/">
				Go Back
			</Link>
			<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.name} fluid />
				</Col>
				<Col md={3}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>{product.name}</h3>
						</ListGroup.Item>
						<ListGroup.Item>
							{product.rating && (
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							)}
						</ListGroup.Item>
						<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
						<ListGroup.Item>
							Description: {product.description}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<Row>
									<Col>Price:</Col>
									<Col>
										<strong>${product.price}</strong>
									</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Status:</Col>
									<Col>
										{product.countInStock > 0
											? "In stock"
											: "Out of stock"}
									</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Button
									className="btn-block"
									type="button"
									disabled={product.countInStock === 0}
								>
									ADD TO CART
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
};

export default ProductScreen;
