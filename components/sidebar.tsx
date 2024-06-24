"use client";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { FreeCounter } from "@/components/free-counter";


const montserrat = Montserrat({
    weight:"600",
    subsets:["latin"]});

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-white-500"
    },
    {
        label: "Conversation",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-white-500"
    },
    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-white-500"
    },
    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-white-700"
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-white-500"
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-white-500"
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
    },
];

interface SidebarProps {
    apiLimitCount: number;
    isPro: boolean;
};

const Sidebar = ({
    apiLimitCount = 0,
    isPro = false
}: SidebarProps) => {
    const pathname = usePathname();
    return (
        <div className="space-y-4 py-4 flex flex-col h-full
        bg-[#E3963E] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href={"/dashboard"} className="flex
                items-center pl-3 mb-14">
                    <div className="relative w-12 h-12 mr-4">
                        <Image 
                        fill
                        alt = "Logo"
                        src = "/logo.png"
                        />
                    </div>
                    <h1 className={cn("text-4xl font-bold", montserrat.className)}>
                        Crazee
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route)=>(
                        <Link 
                        href = {route.href}
                        key = {route.href}
                        className={cn("text-md group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-black hover:bg-black/10 rounded-lg transition",
                            pathname === route.href ? "text-black bg-black/10":
                            "text-white"
                        )}>
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)}/>
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <FreeCounter
                apiLimitCount={apiLimitCount}
                isPro = {isPro}
            />
        </div>
    )
}

export default Sidebar;