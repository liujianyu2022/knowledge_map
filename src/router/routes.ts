import React, { FC } from "react";
import {RouteObject} from "react-router-dom"

import Favorites from "../views/document/favorites/Favorites";
import FileCategory from "../views/document/fileCategory/FileCategory";
import FileVerify from "../views/document/fileVerify/FileVerify";
import HomePage from "../views/document/homePage/HomePage";
import MyFile from "../views/document/myFile/MyFile";
import Users from "../views/document/users/User";

import AddKnowledge from "../views/map/addKnowledge/AddKnowledge";
import KnowledgeBase from "../views/map/knowledgeBase/KnowledgeBase";
import KnowledgeDocument from "../views/map/knowledgeDocument/KnowledgeDocument";
import KnowledgeVerify from "../views/map/knowledgeVerify/KnowledgeVerify";
import NodeSignalSetting from "../views/map/nodeSignalSetting/NodeSignalSetting";
import RiskWarning from "../views/map/riskWarning/RiskWarning";
import Track from "../views/map/track/Track";



interface RouteType {
    path: string,
    element: FC
}

const routes: RouteType[] = [
    {                       //文档知识库
        path: "homepage",
        element: HomePage as FC,
    },
    {
        path: "favorites",
        element: Favorites as FC,
    },
    {
        path: "filecategory",
        element: FileCategory as FC,
    },
    {
        path: "myfile",
        element: MyFile as FC
    },
    {
        path: "fileverify",
        element: FileVerify as FC
    },
    {
        path: "users",
        element: Users as React.FC
    },

    {
        path: "addknowledge",
        element: AddKnowledge as FC
    },
    {
        path: "knowledgebase",
        element: KnowledgeBase as FC
    },
    {
        path: "knowledgedocument",
        element: KnowledgeDocument as FC
    },
    {
        path: "nodesignalsetting",
        element: NodeSignalSetting as FC
    },
    {
        path: "riskwarning",
        element: RiskWarning as FC
    },
    {
        path: "track",
        element: Track as FC
    }
]

export default routes