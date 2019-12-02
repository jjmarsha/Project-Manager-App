//Basic navigation locations for sidebars. Add more as see fit
import React from "react";
import Board from "./pages/Board/Board";
import Repo from "./pages/Repo/Repo";
import Messages from "./pages/Messages/Messages";
import Channels from "./pages/Channels/Channels";

export const Links = [
    {
        text: "Board",
        url: "/",
        component: Board
    },
]