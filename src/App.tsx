import * as React from 'react';
import { Component } from 'react';
import { Element, animateScroll as scroll, scroller } from 'react-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import DataService from './services/data-service'
import IDataService, { IModalType } from './services/data-interface'

import Image from './components/image/image';
import Text from './components/text/text';
import Navigation from './components/navigation/navigation';
import Carousel from './components/carousel/carousel';
import SideBar from './components/side-bar/side-bar';
import Bottom from './components/bottom/bottom';
import Links from './components/links/links';
import Modal from './components/modal/modal';

import './App.css';

interface IAppState {
	data: any;
	height: number;
	width: number;
	showModal: boolean;
	modalData?: IDataService;
	modalType?: IModalType;
}

class App extends Component<any, IAppState> {
	private dataService: DataService;
	private dataFiles = ['menu', 'about', 'links', 'skills', 'projects', 'education', 'experience', 'codewars'];

	constructor(props: any) {
		super(props);

		this.dataService = new DataService;

		this.scrollToAnchor = this.scrollToAnchor.bind(this);
		this.scrollToTop = this.scrollToTop.bind(this);

		this.state = {
			data: {},
			height: 0,
			width: 0,
			showModal: false
		};
	}

	public async componentDidMount() {
		const data = {};

		await this.dataFiles.forEach(async (filename: string) =>  {
			data[filename] = await this.dataService.getData(`${ filename }.json`) as IDataService[];
			this.setState(({ data }));
		})

		window.addEventListener('scroll', this.listenToScroll);
		window.addEventListener('resize', this.listenToResize);
	}

	public componentWillUnmount() {
		window.removeEventListener('scroll', this.listenToScroll);
		window.removeEventListener('resize', this.listenToResize);
	}

	public render() {
		if (Object.keys(this.state.data).length !== this.dataFiles.length) return <div className="loading-container">
			<div className="loading-box">
				<div className="loading-text">Loading <FontAwesomeIcon icon={ faSpinner } spin={ true } /></div>
			</div>
		</div>

		return <div>
			{ this.state.showModal && <div className="modal">
				<Modal data={ this.state.modalData } modalType={ this.state.modalType } closeModal={ this.closeModal }/>
			</div> }

			<div className="container">
				<div className="menu">
					<Navigation
						data={ this.state.data.menu }
						linksData={ this.state.data.links }
						scrollToAnchor={ this.scrollToAnchor }
						showModal={ this.showModal }
					/>
				</div>

				<div className="sidebar">
					<SideBar
						data={ this.state.data.menu }
						linksData={ this.state.data.links }
						scrollToAnchor={ this.scrollToAnchor }
						showModal={ this.showModal }
					/>
				</div>

				<div className="main">
					<Element name="about">
						<Image imageName="image1.jpg" title="ADRIAN EYRE" subTitle="Software Developer" />
						<Text data={ this.state.data.about } />
						<Links data={ this.state.data.links } showModal={ this.showModal } />
					</Element>
					<Element name="skills">
						<Image imageName="image2.jpg" title="SKILLS" />
						<Text data={ this.state.data.skills } />
					</Element>
					<Element name="projects">
						<Image imageName="image3.jpg" title="PROJECTS" />
						<Carousel data={ this.state.data.projects } showModal={ this.showModal } screenWidth={ this.state.width } />
					</Element>
					<Element name="education">
						<Image imageName="image4.jpg" title="EDUCATION" />
						<Text data={ this.state.data.education } />
					</Element>
					<Element name="experience">
						<Image imageName="image5.jpg" title="EXPERIENCE" />
						<Text data={ this.state.data.experience } />
					</Element>
					<Element name="codewars">
						<Image imageName="image6.jpg" title="AUTHORED CODEWARS KATAS" />
						<Carousel data={ this.state.data.codewars } showModal={ this.showModal } screenWidth={ this.state.width } />
					</Element>
				</div>

				{ this.state.height > 0.01 && <div className="bottom">
					<Bottom scrollToTop={ this.scrollToTop }/>
				</div> }
			</div>
		</div>
	}

	private showModal = (modalType: IModalType, modalData?: IDataService, ) => {
		this.setState({ showModal: true, modalData, modalType });
	}

	private closeModal = () => this.setState({ showModal: false });

	private listenToScroll = () => {
		const winScroll = document.body.scrollTop || document.documentElement.scrollTop
		const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
		this.setState({ height: winScroll / height })
	}

	private listenToResize = () => this.setState({ width: window.innerWidth })

	private scrollToTop = () => scroll.scrollToTop();

	private scrollToAnchor = (anchor: string) => scroller.scrollTo(anchor, {
		duration: 800,
		delay: 0,
		smooth: 'easeInOutQuart',
		offset: 0
	})
}

export default App;
