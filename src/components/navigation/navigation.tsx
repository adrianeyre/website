import * as React from 'react';
import { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';

import './navigation.css';

interface INavigationProps {
	imageName?: string;
	title?: string;
	subTitle?: string;
	scrollToAnchor(anchor: string): void;
}

interface INavigationState {
	style?: any;
}

class Navigation extends Component<INavigationProps, INavigationState> {
	constructor(props: INavigationProps) {
		super(props);
	}

	public render() {
		return <Navbar bg="light" expand="lg" fixed="top">
			<Navbar.Brand href="#home">ADRIAN EYRE</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link><a onClick={ this.props.scrollToAnchor.bind(this, 'about') }>About</a></Nav.Link>
					<Nav.Link><a onClick={ this.props.scrollToAnchor.bind(this, 'skills') }>Skills</a></Nav.Link>
					<Nav.Link><a onClick={ this.props.scrollToAnchor.bind(this, 'projects') }>Projects</a></Nav.Link>
					<Nav.Link><a onClick={ this.props.scrollToAnchor.bind(this, 'education') }>Education</a></Nav.Link>
					<Nav.Link><a onClick={ this.props.scrollToAnchor.bind(this, 'experience') }>Experience</a></Nav.Link>
				</Nav>
			</Navbar.Collapse>
		</Navbar>
	}
}

export default Navigation;