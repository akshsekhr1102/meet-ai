import { Button } from "@/components/ui/button"
import Link from "next/link"


export const CallEnd = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-radial from-sidebar-accent to-sidebar">
            <div className="flex flex-1 px-8 py-4 items-center justify-center h-full ">
                <div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
                    <div className="flex flex-col gap-y-2 text-center">
                        <h6 className="text-lg font-medium">You left the call</h6>
                        <p className="text-sm text-muted-foreground">Your summary will appear in few minutes</p>
                    </div>
                    <div className="flex  gap-x-2 justify-center items-center w-full">
                        <Button asChild variant="default">
                            <Link href="/meetings">
                            Back to meetings</Link>
                            </Button>                    
                            </div>
                    
                </div>
            </div>
            
        </div>
    )
}