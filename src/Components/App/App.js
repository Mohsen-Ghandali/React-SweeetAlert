import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../Pages/Header/Header";
import Footer from "../Pages/Footer/Footer";
import NotFound from "../Pages/NotFound/NotFound";
import Create from "../Pages/Create/Create";
const App = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Create />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;