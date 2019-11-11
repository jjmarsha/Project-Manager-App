//Basic navigation locations for sidebars. Add more as see fit
import React from "react";
import Board from "./pages/Board/Board";
import Repo from "./pages/Repo/Repo";
import Messages from "./pages/Messages/Messages";
import Channels from "./pages/Channels/Channels";

export const Links = [
    {
        text: "Board",
        url: "/app/board",
        component: Board
    },
    {
        text: "Repositories",
        url: "/app/repos",
        component: Repo
    },
    {
        text: "Channels",
        url: "/app/channels",
        component: Channels
    },
    {
        text: "Direct Messages",
        url: "/app/messages",
        component: Messages
    },
]