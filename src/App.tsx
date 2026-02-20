import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import TreeVisualization from './components/TreeVisualization'
import Highlights from './components/Highlights'
import Personas from './components/Personas'
import Roadmap from './components/Roadmap'
import CTA from './components/CTA'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Highlights />
        <Features />
        <HowItWorks />
        <TreeVisualization />
        <Personas />
        <Roadmap />
        <CTA />
      </main>
    </>
  )
}
