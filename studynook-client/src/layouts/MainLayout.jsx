import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
    return (
        <div className="flex flex-col min-h-screen bg-[#FBF8F3] text-slate-900 font-sans antialiased">
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
