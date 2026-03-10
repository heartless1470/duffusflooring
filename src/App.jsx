import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Contact from './components/Contact'
import LeaveReview from './components/LeaveReview'
import Reviews from './components/Reviews'
import Lightbox from './components/Lightbox'
import Admin from './components/Admin'

function App() {
	const [route, setRoute] = useState(window.location.hash.replace('#', '') || 'home')

	useEffect(() => {
		const onHash = () => setRoute(window.location.hash.replace('#', '') || 'home')
		window.addEventListener('hashchange', onHash)
		return () => window.removeEventListener('hashchange', onHash)
	}, [])

	useEffect(() => {
		if (typeof window !== 'undefined' && window.AOS) {
			window.AOS.init()
			window.AOS.refresh()
		}
	}, [route])

	let Content
	const base = route.split('/')[0]
	const isAdmin = base === 'admin'
	
	switch (base) {
		case 'about':
			Content = About
			break
		case 'leave-review':
			Content = LeaveReview
			break
		case 'reviews':
			Content = Reviews
			break
		case 'services':
			Content = Services
			break
		case 'portfolio':
			Content = Portfolio
			break
		case 'contact':
			Content = Contact
			break
		case 'admin':
			Content = Admin
			break
		default:
			Content = Home
	}

	return (
		<>
			{!isAdmin && <Header />}
			<main>
				<Content />
			</main>
			{!isAdmin && <Lightbox />}
			{!isAdmin && <Footer />}
		</>
	)
}

export default App
