import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useCreateCourseMutation } from '@/features/api/courseApi'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const AddCourse = () => {
    const [courseTitle, setCourseTitle] = useState("");
    const [category, setCategory] = useState("");
    const navigate = useNavigate();

    const [createCourse, { data, isSuccess, isError, isLoading, error }] = useCreateCourseMutation();

    const createCourseHandler = async () => {
        // console.log(category, courseTitle);
        await createCourse({ courseTitle, category });
    }
    const getSelectedCategory = (value) => {
        setCategory(value)
    }

    // for toast notification
    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message || "Course created");
            navigate(`/admin/course`);
        }
    }, [error, isSuccess])

    return (
        <div className='flex-1 mx-10 mt-24'>
            <div className='mb-4 dark:text-white'>
                <h1 className='font-bold text-xl'>
                    Let's add course, add some basic details for your course
                </h1>
                <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, omnis</p> </div>

            <div className='space-y-4 dark:text-white'>
                <div>
                    <Label className="mb-1">Title</Label>
                    <Input type="text" placeholder='your course name' name="courseTitle" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
                </div>
                <div>
                    <Label className="mb-1">Category</Label>
                    <Select onValueChange={getSelectedCategory} >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                <SelectItem value="Next Js">Next Js</SelectItem>
                                <SelectItem value="Data Science">Data Science</SelectItem>
                                <SelectItem value="HTML">HTML</SelectItem>
                                <SelectItem value="MongoDB">MongoDB</SelectItem>
                                <SelectItem value="Full Stack Development">Full Stack Development</SelectItem>
                                <SelectItem value="Mern Stack Development">Mern Stack Development</SelectItem>
                                <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                                <SelectItem value="Javascript">Javascript</SelectItem>
                                <SelectItem value="React Js">React Js</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className='flex items-center gap-2 mt-5'>
                    <Button variant="outline" onClick={() => navigate(`/admin/course/`)}>Back</Button>
                    <Button disabled={isLoading} onClick={createCourseHandler}>{
                        isLoading ? <>
                            <Loader2 className='mr-2 h-4 animate-spin w-4' />
                            Please Wait
                        </> : "Create"
                    }</Button>
                </div>
            </div>
        </div>
    )
}

export default AddCourse
