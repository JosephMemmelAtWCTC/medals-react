import React, { Component } from 'react';
import Country from './components/Country';
import NewCountry from './components/NewCountry';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Toast from 'react-bootstrap/Toast';
import './App.css';
import { ToastContainer } from 'react-bootstrap';


class App extends Component {
    state = {
        countries: [
            { id: 1, name: 'United States', gold: 2, silver: 2, bronze: 3 },
            { id: 2, name: 'China', gold: 3, silver: 1, bronze: 0 },
            { id: 3, name: 'Germany', gold: 0, silver: 2, bronze: 2 },
        ],
        medals: [
            { id: 1, name: 'gold' },
            { id: 2, name: 'silver' },
            { id: 3, name: 'bronze' },
        ],
        showEmptyNameToast: false,
    }
    handleAdd = (name) => {
        const { countries } = this.state;
        const id = countries.length === 0 ? 1 : Math.max(...countries.map(country => country.id)) + 1;
        const mutableCountries = [...countries].concat({ id: id, name: name, gold: 0, silver: 0, bronze: 0 });
        this.setState({ countries: mutableCountries });
    }
    handleDelete = (countryId) => {
        const { countries } = this.state;
        const mutableCountries = [...countries].filter(c => c.id !== countryId);
        this.setState({ countries: mutableCountries });
    }
    handleIncrement = (countryId, medalName) => {
        const countries = [...this.state.countries];
        const idx = countries.findIndex(c => c.id === countryId);
        countries[idx][medalName] += 1;
        this.setState({ countries: countries });
    }
    handleDecrement = (countryId, medalName) => {
        const countries = [...this.state.countries];
        const idx = countries.findIndex(c => c.id === countryId);
        countries[idx][medalName] -= 1;
        this.setState({ countries: countries });
    }
    handleEmptyNewCountryName = () => {
        this.setState({showEmptyNameToast: true});
    }
    getAllMedalsTotal() {
        let sum = 0;
        this.state.medals.forEach(medal => { sum += this.state.countries.reduce((a, b) => a + b[medal.name], 0); });
        return sum;
    }

    render() {

        return (
            <React.Fragment>
                <Navbar className="navbar-dark bg-dark">
                    <Container fluid>
                        <Navbar.Brand>
                            Olympic Medals
                            <Badge className="ml-2" bg="light" text="dark" pill>{this.getAllMedalsTotal()}</Badge>
                        </Navbar.Brand>
                        <Nav className="me-auto">
                            <NewCountry onAdd={this.handleAdd} onEmptyCountryName={this.handleEmptyNewCountryName}/>
                        </Nav>
                    </Container>
                </Navbar>
                <Container fluid>
                    <Row>
                        {this.state.countries.map(country =>
                            <Col className="mt-3" key={country.id}>
                                <Country
                                    country={country}
                                    medals={this.state.medals}
                                    onDelete={this.handleDelete}
                                    onIncrement={this.handleIncrement}
                                    onDecrement={this.handleDecrement} />
                            </Col>
                        )}
                    </Row>
                </Container>
                
                {/* position="top-end"  */}
                <ToastContainer className='position-fixed' style={{ zIndex: 1051, top: "3em", right: "1em", }}>
                    <Toast show={this.state.showEmptyNameToast} delay={60000} className='position-relative' onClose={()=> this.setState({showEmptyNameToast: false})} autohide style={{/*minWidth: "16em"*/}}>
                        <Toast.Header>
                            <img
                                src="holder.js/20x20?text=%20"
                                className="rounded me-2"
                                alt=""
                            />
                            <Row className="justify-content-between">
                                <Col class="col-1">
                                    <strong className="me-auto">Warning</strong>
                                </Col>
                                <Col class="col-4">
                                    <small className="text-muted">just now</small>
                                </Col>
                            </Row>
                        </Toast.Header>
                        <Toast.Body>New country names cannot be empty</Toast.Body>
                    </Toast>
                </ToastContainer>

            </React.Fragment>
        );
    }
}

export default App;