///Import frameworks
import React, { useState } from 'react';
//Import libs
import { addMinutesToTime, cn, formatTimeRange } from '@/lib/utils';
//Import packages
import { useDrop } from 'react-dnd';
import { Rnd } from 'react-rnd';
//Import components
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog"
//Import icons
import { GoPencil } from "react-icons/go";
import { Button } from '../ui/button';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { GoTrash } from "react-icons/go";
import NotifyDeletion from '../toast/notifyDeletion';
import { LuSave } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { FcCancel } from "react-icons/fc";
import { RiProgress5Line } from "react-icons/ri";

type CalendarCellProps = {
    time: string;
    task?: Task;
    date: string;
    className: string;
    style: React.CSSProperties;
    rowSpan: number;
    onDrop: (item: Task, time: string, date: string) => void;
    onResize: (id: string, date: string, newDuration: number) => void;
};

const CalendarCell: React.FC<CalendarCellProps> = ({
    date,
    time,
    task,
    onDrop,
    className,
    onResize,
    rowSpan
}) => {
    const [{ isOver }, drop] = useDrop<Task, void, { isOver: boolean }>({
        accept: 'ITEM',
        drop: (item) => {
            // Ensure the dropped item matches the current task
            if (item.id === task?.id) {
                const updatedEndTime = addMinutesToTime(time, 60);
                const updatedItem = {
                    ...item,
                    startTime: time,
                    endTime: updatedEndTime,
                    dueTime: time,
                    date: date,
                };
                onDrop(updatedItem, time, date);
            }
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    return (
        <div
            ref={drop}
            className={cn(
                `relative flex h-full bg-gray-50 ${isOver ? 'bg-indigo-100' : 'bg-gray-50 p-1'}`,
                task?.style.backgroundColor,
                className
            )}
        >
            {task && (
                <Rnd
                    size={{
                        width: '100%', // Adjust width as necessary
                        height: Math.floor(task.estimatedTime / 15) * 20 + rowSpan * 2 + 'px', // Set initial height based on task duration
                    }}
                    position={{ x: 0, y: 0 }}
                    onResizeStop={(_e, _direction, ref, _delta, _position) => {
                        // Only proceed if the resized task matches the active one
                        const newHeight = ref.offsetHeight;
                        const newDuration = Math.max(15, Math.floor(newHeight / 20) * 15); // Calculate new duration based on height
                        onResize(task.id, date, newDuration);
                    }}
                    minWidth={100} // Minimum width for resizing (can be customized)
                    minHeight={20} // Minimum height for resizing (can be customized)
                    enableResizing={{
                        top: false,
                        right: false,
                        bottom: true,
                        left: false,
                        topRight: false,
                        bottomRight: false,
                        bottomLeft: false,
                        topLeft: false,
                    }}
                    disableDragging={true} // Disable dragging to prevent moving the activity around
                    className={`${task?.style.backgroundColor} ${className} border-l-0 z-10 group`}
                >
                    {rowSpan === 1 ?
                        (
                            <div className='flex flex-row items-center h-full font-semibold'>
                                {task.status === 'completed' && (
                                    <>
                                        <div className='flex justify-center items-center bg-emerald-400 w-5 h-full'>
                                            <div className='flex justify-center items-center bg-white rounded-full w-4 h-4'>
                                                <FaCheck className='text-emerald-700' />
                                            </div>
                                        </div>
                                        <span className='mx-1 text-[10px]'>-</span>
                                        <p className="text-[10px] text-zinc-600 truncate">{task.title}</p>
                                    </>
                                )}
                                {task.status === 'in-progress' && (
                                    <>
                                        <div className='flex justify-center items-center bg-amber-400 w-5 h-full'>
                                            <div className='flex justify-center items-center bg-white rounded-full w-4 h-4'>
                                                <RiProgress5Line className='text-amber-700' />
                                            </div>
                                        </div>
                                        <span className='mx-1 text-[10px]'>-</span>
                                        <p className="text-[10px] text-zinc-600 truncate">{task.title}</p>
                                    </>
                                )}
                                {task.status === 'pending' && (
                                    <>
                                        <div className='flex justify-center items-center bg-red-400 w-5 h-full'>
                                            <div className='flex justify-center items-center bg-white rounded-full w-4 h-4'>
                                                <FcCancel />
                                            </div>

                                        </div>
                                        <span className='mx-1 text-[10px]'>-</span>
                                        <p className="text-[10px] text-zinc-600 truncate">{task.title}</p>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className='flex flex-col p-2'>
                                <div className='flex flex-row items-center space-x-1'>
                                    {task.status === 'completed' && (
                                        <div className='flex justify-center items-center bg-emerald-400 w-5 h-5'>
                                            <div className='bg-white rounded-full w-4 h-4'>
                                                <FaCheck className='text-emerald-700' />
                                            </div>
                                        </div>
                                    )}
                                    {task.status === 'in-progress' && (
                                        <div className='flex justify-center items-center bg-amber-400 w-5 h-5'>
                                            <div className='bg-white rounded-full w-4 h-4'>
                                                <RiProgress5Line className='text-amber-700' />
                                            </div>
                                        </div>
                                    )}
                                    {task.status === 'pending' && (
                                        <>
                                            <div className='flex justify-center items-center bg-red-400 w-5 h-5'>
                                                <div className='bg-white rounded-full w-4 h-4'>
                                                    <FcCancel />
                                                </div>
                                            </div>
                                            <span className='mx-1 text-[10px]'>-</span>
                                            <p className="text-[10px] text-zinc-600 truncate">{task.title}</p>
                                        </>
                                    )}
                                    <p className={cn(`text-[10px] font-semibold ${task.status === 'completed' && 'line-through'}`, task.style.textColor)}>
                                        {task ? formatTimeRange((task?.startTime || ''), (task?.endTime || '')) : ''}
                                    </p>
                                </div>
                                <p className={`font-semibold text-[12px] text-zinc-600 leading-tight ${task.status === 'completed' && 'line-through'}`}>{task.title}</p>
                            </div>
                        )
                    }
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                        <DialogTrigger asChild>
                            <div className='group-hover:flex top-0 right-0 absolute justify-center items-center border-[1px] border-zinc-300 hidden bg-white rounded-full w-6 h-6 hover:cursor-pointer'>
                                <GoPencil />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className='font-semibold text-sm'>Edit {task?.title} at {formatTimeRange((task?.startTime || ''), (task?.endTime || ''))}, {date}</DialogTitle>
                                <DialogDescription>
                                    Edit this event in your calendar.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="gap-4 grid py-4">
                                <div className="items-center gap-4 grid grid-cols-4">
                                    <Label htmlFor="name" className="font-semibold text-[12px] text-left">
                                        Title
                                    </Label>
                                    <Input
                                        id="title"
                                        value={task?.title}
                                        className="col-span-3"
                                        disabled
                                    />
                                </div>
                                <div className="items-center gap-4 grid grid-cols-4">
                                    <Label htmlFor="username" className="font-semibold text-[12px] text-left">
                                        Time Range
                                    </Label>
                                    <Input
                                        id="time"
                                        value={formatTimeRange((task?.startTime || ''), (task?.endTime || ''))}
                                        className="col-span-3"
                                        disabled
                                    />
                                </div>
                                <div className="items-center gap-4 grid grid-cols-4">
                                    <Label htmlFor="username" className="font-semibold text-[12px] text-left">
                                        Duration
                                    </Label>
                                    <Input
                                        id="duration"
                                        value={task?.estimatedTime + ' minutes'}
                                        className="col-span-3"
                                        disabled
                                    />
                                </div>
                                <hr />
                                <div className="items-center gap-4 grid grid-cols-4">
                                    <Label htmlFor="username" className="font-semibold text-[12px] text-left">
                                        <div className='flex flex-col'>
                                            <p>Description</p>
                                            <p className='font-normal text-[10px] text-gray-600'>(120 max)</p>
                                        </div>
                                    </Label>
                                    <Input
                                        id="username"
                                        placeholder="optional"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <div className='flex justify-between w-full'>
                                    <NotifyDeletion setIsDeleteDialogOpen={setIsEditDialogOpen} />
                                    <div className='flex space-x-2'>
                                        <Button
                                            variant="secondary"
                                            className='hover:bg-gray-50 border font-normal text-gray-400 hover:text-gray-600'
                                            onClick={() => setIsEditDialogOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" variant={"outline"} className='items-center'>
                                            <LuSave />
                                            Save changes
                                        </Button>
                                    </div>
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                        <DialogTrigger asChild>
                            <div className={`${rowSpan < 3 ? "hidden" : "group-hover:flex hidden"}  absolute bottom-0 right-0 w-6 h-6 bg-white items-center justify-center border-zinc-300 border-[1px] rounded-full hover:cursor-pointer`}>
                                <GoTrash />
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className='font-semibold text-sm'>Delete {task?.title} at {formatTimeRange((task?.startTime || ''), (task?.endTime || ''))}, {date}</DialogTitle>
                                <DialogDescription>
                                    You are about to delete this event in calendar. Are you sure?
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <Button
                                    variant="secondary"
                                    className='hover:bg-gray-50 border'
                                    onClick={() => setIsDeleteDialogOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <NotifyDeletion setIsDeleteDialogOpen={setIsDeleteDialogOpen} />
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </Rnd>
            )}
        </div>
    );
};

export default CalendarCell;
