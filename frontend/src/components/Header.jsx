import React from 'react'
import { Button, Container, Image, Nav, Navbar, NavDropdown, NavbarText } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector } from 'react-redux';
import logo from '../assets/logos/logo-HomeLink.png';


const Header = () => {

    const { currentUser } = useSelector((state) => state.user);

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <LinkContainer to="/home">
                    <Navbar.Brand>
                        <Image src={logo}
                            width="150"
                            height="75"
                            className="d-inline-block align-top"
                            alt="HomeLink" />
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <LinkContainer to="/home">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/about">
                            <Nav.Link>About</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/search">
                            <Nav.Link>Search </Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <NavbarText>
                        <LinkContainer to="/business-profile">
                            {currentUser ? (
                                <Image src={currentUser.avatar}
                                    rounded
                                    width="40"
                                    height="40"
                                    alt='profile' />
                            ) : (
                                <Nav.Link>
                                    <Button variant="dark">Sign In</Button>
                                </Nav.Link>
                            )}
                        </LinkContainer>

                    </NavbarText>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header