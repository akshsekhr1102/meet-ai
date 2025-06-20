import EmptyState from "@/components/empty-state";

export default function CompletedState() {
    return (
        <div className="bg-white rounded-lg p-4  flex flex-col gap-y-8 items-center justify-center">
            <EmptyState
                title="Completed Meeting"
                description="Your meeting is completed"
                image="/completed.svg"
            />
        </div>
    )   
}