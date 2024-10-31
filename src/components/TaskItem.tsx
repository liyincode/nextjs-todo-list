"use client";

import { Checkbox } from "@/components/ui/checkbox";
import dayjs from "dayjs";
import { type Task } from "@prisma/client";
import { cn } from "@/lib/utils";
import { setTaskDone } from "@/actions/task";

function TaskItem({ task }: { task: Task }) {
    return (
        <div className="flex items-center gap-2">
            <Checkbox
                id={task.id.toString()}
                className="h-5 w-5 bg-white"
                checked={task.done}
                onCheckedChange={async () => {
                    await setTaskDone(task.id);
                }}
            />
            <label
                htmlFor={task.id.toString()}
                className={cn(
                    "flex flex-row items-center gap-2",
                    task.done && "line-through",
                )}
            >
                {task.content}
                {task.expiresAt && (
                    <p
                        className={cn("text-xs text-white", {
                            "text-red-800": Date.now() - task.expiresAt.getTime() > 0,
                        })}
                    >
                        {dayjs(task.expiresAt).format("DD/MM/YYYY")}
                    </p>
                )}
            </label>
        </div>
    );
}

export default TaskItem;
