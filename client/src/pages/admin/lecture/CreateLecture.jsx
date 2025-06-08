import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCreateLectureMutation, useGetAllLecturesQuery } from '@/features/api/courseApi'
import { toast } from 'sonner'
import { Edit, Loader2 } from 'lucide-react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from '@/components/ui/badge'
import Lecture from './Lecture'

const CreateLecture = () => {
    const navigate = useNavigate();
    const [lectureTitle, setLectureTitle] = useState("");
    const params = useParams();
    const courseId = params.courseId;

    const [createLecture, { data, isLoading, isSuccess, isError, error }] = useCreateLectureMutation();

    const { data: lectureData, isLoading: lectureIsLoading, isSuccess: lectureIsSuccess, isError: lectureIsError, error: lectureError } = useGetAllLecturesQuery(courseId);

    console.log(lectureData);

    const handleLecture = async () => {
        await createLecture({ courseId, lectureTitle });
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Lecture Created");
        }
        if (error) {
            toast.error(error.data.message || "Failed to create lecture");
        }
    }, [isSuccess, isError, error])

    return (
        <div className='mt-24 flex-1 mx-10'>
            <div className='mb-4'>
                <h1 className='font-bold text-xl'>
                    Let's add course, add some basic details for your course
                </h1>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, omnis</p>
            </div>

            <div className='space-y-4'>
                <div>
                    <Label className="mb-1">Title</Label>
                    <Input type="text" placeholder='your course name' name="courseTitle" value={lectureTitle} onChange={(e) => setLectureTitle(e.target.value)} />
                </div>
                <div className='flex items-center gap-2 mt-5'>
                    <Button variant="outline" onClick={() => navigate(`/admin/course/${courseId}`)}>Back to Course</Button>
                    <Button disabled={isLoading} onClick={handleLecture}>{
                        isLoading ? <>
                            <Loader2 className='mr-2 h-4 animate-spin w-4' />
                            Please Wait
                        </> : "Create Lecture"
                    }</Button>
                </div>
            </div>

            {/* Lisitng all the lectures */}
            <div className='mt-15'>
                {
                    lectureIsLoading ? (<>Loading Lectures...</>) : (lectureData.length === 0) ? (<>No lectures available</>) : (lectureData.lectures.map((lecture, index) => (
                        <Lecture key={lecture._id} lecture={lecture} index={index} />
                    )))
                }
            </div>
        </div>
    )
}

export default CreateLecture
