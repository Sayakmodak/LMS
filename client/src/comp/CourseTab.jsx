import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import React, { useEffect, useState } from 'react'
import '@mantine/core/styles.css';
import RichTextEditorDemo from './RichTextEditorDemo';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';
import { useGetCourseByIdQuery, useUpdateCourseMutation } from '@/features/api/courseApi';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import { getLabelsLockup } from '@mantine/core';
import { retry } from '@reduxjs/toolkit/query';

const CourseTab = () => {
    const navigate = useNavigate();
    const [input, setInput] = useState({
        courseTitle: "",
        courseSubtitle: "",
        description: "",
        category: "",
        courseLevel: "",
        coursePrice: "",
        courseThumbnail: "",
    });
    const params = useParams();
    const courseId = params.courseId;

    const [thumbnailPreview, setThumbnailPreview] = useState("");
    const [updateCourse, { data, isLoading, error, isSuccess, isError }] = useUpdateCourseMutation();

    const { data: getCourseByIdData, isLoading: getCourseByIdLoading } = useGetCourseByIdQuery(courseId);


    useEffect(() => {
        if (getCourseByIdData?.course) {
            const course = getCourseByIdData?.course;
            setInput({
                ...input,
                courseTitle: course.courseTitle,
                courseSubtitle: course.courseSubtitle,
                description: course.description,
                category: course.category,
                courseLevel: course.courseLevel,
                coursePrice: course.coursePrice,
                courseThumbnail: ""
            })
        }
    }, [getCourseByIdData])


    const isPublished = true;
    // console.log(courseId);

    const onChangeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });
    }

    const onChangeCategory = (value) => {
        setInput({ ...input, category: value });
    }

    const onChangeCourseLevel = (value) => {
        setInput({ ...input, courseLevel: value });
    }

    const selectThumbnail = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setInput({ ...input, courseThumbnail: file });
            const fileReader = new FileReader;
            fileReader.onloadend = () => setThumbnailPreview(fileReader.result);
            fileReader.readAsDataURL(file);
        }
    }

    const updateCourseHandler = async () => {
        // console.log(input);
        const formData = new FormData();
        formData.append("courseTitle", input.courseTitle);
        formData.append("courseSubtitle", input.courseSubtitle);
        formData.append("description", input.description);
        formData.append("category", input.category);
        formData.append("courseLevel", input.courseLevel);
        formData.append("coursePrice", input.coursePrice);
        formData.append("courseThumbnail", input.courseThumbnail);
        await updateCourse({ formData, courseId });
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Course Updated");
            navigate(`/admin/course`)
        }
        if (error) {
            toast.error(error.data.message || "Failed to update course");
        }
    }, [isSuccess, error])


    if (getCourseByIdLoading) {
        return (
            <>
                <div className="h-screen flex justify-center items-center"><Loader2 className='w-4 h-4 animate-spin' />
                </div>
            </>)
    }

    return (
        <Card className="py-6">
            <CardHeader className="flex flex-row justify-between">
                <div>
                    <CardTitle>Course Information</CardTitle>
                    <CardDescription>
                        Make changes to your courses here. Click save when you are done
                    </CardDescription>
                </div>
                <div className='space-x-2'>
                    <Button variant="outline">
                        {
                            isPublished ? "Unpublished" : "Published"

                        }
                    </Button>
                    <Button>Remove Course</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-4 mt-5">
                    <div>
                        <Label>Course Title</Label>
                        <Input type="text" name="courseTitle" placeholder="Eg. Fullstack development" value={input.courseTitle}
                            onChange={onChangeEventHandler}
                        />
                    </div>
                    <div>
                        <Label>Subtitle</Label>
                        <Input type="text" name="courseSubtitle" placeholder="Eg. Become a Fullstack developer" value={input.courseSubtitle}
                            onChange={onChangeEventHandler} />
                    </div>
                    <div>
                        <Label>Course Description</Label>
                        <RichTextEditorDemo input={input} setInput={setInput} />
                    </div>
                    <div className='flex items-center gap-5'>
                        <div>
                            <Label>Category</Label>
                            <Select onValueChange={onChangeCategory}>
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
                        <div>
                            <Label>Level</Label>
                            <Select onValueChange={onChangeCourseLevel}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Category</SelectLabel>
                                        <SelectItem value="beginer">Beginer</SelectItem>
                                        <SelectItem value="intermediate">Intermediate</SelectItem>
                                        <SelectItem value="advance">Advance</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label>Price INR</Label>
                            <Input
                                name="coursePrice"
                                type="number"
                                placeholder="199"
                                className="w-fit"
                                value={input.coursePrice}
                                onChange={onChangeEventHandler}
                            />
                        </div>

                    </div>
                    <div>
                        <Label>Course Thumbnail</Label>
                        <Input
                            type="file"
                            name="courseThumbnail"
                            className="w-fit"
                            accept="image/*"
                            onChange={selectThumbnail}
                        />
                        {
                            thumbnailPreview && (
                                <img src={thumbnailPreview} className='w-50 my-2' />
                            )
                        }
                    </div>
                    <div className='flex gap-2'>
                        <Button variant="outline">Cancel</Button>
                        <Button disabled={isLoading} onClick={updateCourseHandler}>{
                            isLoading ? (
                                <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Please wait
                                </>
                            ) : "Save"
                        }</Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default CourseTab
