import Sidebar from "../../components/Sidebar/Sidebar";
import MessageContainer from "../../components/Messages/MessageContainer";
const Home = () => {
    return (
        <div className="flex h-[500px] sm:h-[500px] md:h-[700px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            
            <Sidebar />
            <MessageContainer />
        </div>
    );
};

export default Home;
