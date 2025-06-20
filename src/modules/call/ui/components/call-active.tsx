import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";
import Image from "next/image";
import Link from "next/link";

interface Props {
    meetingName: string;
    onLeave: () => void;
}

export default function CallActive({ meetingName, onLeave }: Props) {
    return (
        <div className="flex h-screen w-full flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800">
            {/* Header Navbar */}
            <div className="flex items-center justify-between bg-white/5 border-b border-white/10 px-4 py-3 backdrop-blur-xl shadow-lg">
                <Link 
                    href="/meetings" 
                    className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-md border border-white/20 transition-all duration-300 hover:bg-white/20 hover:border-white/30 shadow-lg"
                >
                    <Image src="/logo.svg" alt="logo" width={24} height={24} />
                    <h4 className="text-base font-medium text-white drop-shadow-sm">
                        {meetingName}
                    </h4>
                </Link>
            </div>

            {/* Main video layout */}
            <div className="flex-1 flex items-center justify-center">
                <SpeakerLayout />
            </div>

            {/* Call controls at bottom */}
            <div className="flex justify-center pb-8 px-4">
                <div className="rounded-3xl bg-white/10 px-8 py-4 backdrop-blur-xl border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
                    <CallControls onLeave={onLeave} />
                </div>
            </div>
        </div>
    );
}