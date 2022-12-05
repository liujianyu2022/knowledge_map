import React from "react"
import "./content.less"

import routes from "../../router/routes"

import {Routes, Route, Navigate} from "react-router-dom" 

interface IMain {

}

function Main(Props: IMain){

    return (
        <div className="content">
            <Routes>
                {
                    routes.map( route => <Route path={route.path} element={ <route.element /> } key={route.path} />)
                }
                
                <Route path="*" element={<Navigate to="homepage" />} />
            </Routes>
        </div>
    )
}

export default Main