import Particles from "react-tsparticles"
import particlesConfig from "../particle.config"


export default function ParticleBackground() {
    return <Particles params={particlesConfig}></Particles>
}