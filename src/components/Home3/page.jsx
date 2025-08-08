import ExploreSections from './Explore'
import PlatformIntro from './Features'
import HeroSection from './Hero'
import App from './HowItWorks'
import Platform from './Platform'
import PlatformBenefits from './WhyChoose'

const page = () => {
  return (
    <div>
      <HeroSection/>
      <PlatformIntro/>
      <PlatformBenefits/>
      {/* <Platform/> */}
      <App/>
      <ExploreSections/>
    </div>
  )
}

export default page
