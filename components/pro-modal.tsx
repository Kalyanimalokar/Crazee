"use client"

import axios from "axios";
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import { useProModal } from "@/hooks/use-pro-modal"
import { Badge } from "./ui/badge";
import { Check, Code, Image, MessageSquare, Music, Video, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import toast from "react-hot-toast";

const tools = [
    {
      label: "Conversation",
      icon: MessageSquare,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      href: "/conversation"
    },
    {
      label: "Music Generation",
      icon: Music,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      href: "/music"
    },
    {
      label: "Image Generation",
      icon: Image,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      href: "/image"
    },
    {
      label: "Video Generation",
      icon: Video,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      href: "/video"
    },
    {
      label: "Code Generation",
      icon: Code,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      href: "/code"
    },
  
  ]

export const ProModal = () => {
    const ProModal = useProModal();
    const [loading, setLoading] = useState(false);

    const onSubscribe = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url;
        } catch (error) {
            toast.error("Something went wrong");
        }finally{
            setLoading(false);
        }
    }

    return(
        <Dialog open={ProModal.isOpen} onOpenChange={ProModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center font-bold py-1">
                            Upgrade to Premium
                            <Badge variant="premium" className="uppercase text-sm py-1">
                                Pro
                            </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        {tools.map((tool)=>(
                            <Card
                                key={tool.label}
                                className="p-3 border-black/5 flex items-center justify-between"
                            >
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)}/>
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className="text-primary w-5 h-5"/>
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                    disabled={loading}
                    onClick={onSubscribe}
                    size="lg"
                    variant="premium"
                    className="w-full border-none"
                    >
                        Upgrade 
                        <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}