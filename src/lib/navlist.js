import {SquareChartGantt,BookA,UserCog} from "lucide-react"

export const userNav=[
    {
        label:"Overview",
        path:"dashboard/overview",
        icon:<SquareChartGantt/>
    },
    {
        label:"My Orders",
        path:"dashboard/my-orders",
        icon:<BookA />
    }
]

export const AdminNav=[
    {
        label:"Overview",
        path:"dashboard/overview",
        icon:<SquareChartGantt/>
    },
    {
        label:"Orders",
        path:"dashboard/orders",
        icon:<BookA />
    },
    {
        label:"Users Control",
        path:"users-control",
        icon:<UserCog />
    }
]