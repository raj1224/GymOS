import Navbar from "./Navbar";
import Hero from "./Hero";
import About from "./About";
import MembershipPlans from "./MembershiPlan";
// import Trainers from "./Trainers";
// import Gallery from "./Gallery";
// import Testimonials from "./Testimonials";
// import Contact from "./Contact";
import Footer from "./Footer";

const Home = ({ onLogin, onSignup }) => {
    return (
        <>
            <Navbar
                onLogin={onLogin}
                onSignup={onSignup}
            />

            <main>
                <Hero />
                <About />
                <MembershipPlans />
                {/* <Trainers />
                <Gallery />
                <Testimonials />
                <Contact /> */}
            </main>

            <Footer />
        </>
    );
};

export default Home;