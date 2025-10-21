import { BrowserRotes, Routes, Route, Navigate, Outlet } from "react-router-dom";
import PublicHome from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AppLayout from "@/components/layout/AppLayout";
import AppHome from "@/pages/app/Home";
import Payments from "@/pages/app/Payments";
import Wallet from "@/pages/app/Wallet";
import Activity from "@/pages/app/Activity";
import Help from "@/pages/app/Help";
import Settings from "@/pages/app/Settings";
import { isLoggedIN } from "@/lib/auth";

function PrivateRoute(){
    return isLoggedIN() ? <Outlet/> : <Navigate to="/login" replace />;
}

export default function AppRouter() {
    return (
        <BrowserRotes>
            <Routes>
                {/* 公開エリア */}
                <Route path="/" element={<PublicHome/>} />  
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />

                {/* ログイン後エリア（/app/*）は共通レイアウトで包む */}
                <Route element={<PrivateRoute/>}>
                    <Route path="/app" element={<AppLayout/>}>
                        <Route index element={<Navigate to="home" replace/>}/>
                        <Route path="home" element={<AppHome/>}/>
                        <Route path="payments" element={<Payments/>}/>
                        <Route path="wallet" elemnts={<Wallet/>}/>
                        <Route path="activity" element={<Activity/>}/>
                        <Route path="help" element={<Help/>}/>
                        <Route path="settings" element={<Settings/>}/>
                    </Route>
                </Route>

                {/* 404相当はトップへ */}
                <Route path="*" element={<Navigate to="/" replace/>} />
            </Routes>
        </BrowserRotes>
    )
}