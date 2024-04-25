import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./vue/header";
import Home from "./vue/home";
import Signup from "./vue/signUp";
import Signin from "./vue/signIn";
import ShowUser from "./vue/ShowUser";
import Priorities from "./vue/priorities"
import Testrui from './vue/testrui'
import Task from './vue/Task';
import Footer from './vue/footer';
import CreateBoard from './vue/createBoars';
import UpdateBoard from './vue/updateBoard'
import ShowOne from "./vue/ShowOne";
import UpdateUser from './vue/UpdateUser';
import DeleteUser from './vue/DeleteUser';

function AppRouter() {
    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/Signup" element={<Signup/>}/>
                <Route path="/Signin" element={<Signin/>}/>
                <Route path="/ShowUser" element={<ShowUser/>}/>
                <Route path="/ShowOne/:id" element={<ShowOne/>}/>
                <Route path="/UpdateUser/:id" element={<UpdateUser/>}/>
                <Route path="/DeleteUser/:id" element={<DeleteUser/>}/>
                <Route path="/priorities" element={<Priorities/>}/>
                <Route path="/rui" element={<Testrui/>}/>
                <Route path="/task" element={<Task/>}/>
                <Route path="/createBoard" element={<CreateBoard />}/>
                <Route path="/updateBoard" element={<UpdateBoard />}/>
            </Routes>
            <Footer />
        </Router>
    )
}

export default AppRouter