import BuyCourseButton from '@/comp/BuyCourseButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { BadgeInfo, PlayCircle } from 'lucide-react'
import React from 'react'
import { useParams } from 'react-router-dom'

const CourseDetail = () => {
    const isPurchased = false;
    const params = useParams()
    const courseId = params.courseId;

    return (
        <div className='mt-15 space-y-5'>
            <div className='bg-[#2D2F31] text-white'>
                <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2'>
                    <h1 className='font-bold text-2xl md:text-3xl'>Course Title</h1>
                    <p className='text-base md:text-lg'>Course subtitle</p>
                    <p>Created by {""} <span className='text-[#C0C4FC] ubderline italic'>Patel</span></p>
                    <div className='flex items-center gap-2 text-sm'>
                        <BadgeInfo className='' size={16} />
                        <p>Last updated 20/12/21</p>
                    </div>
                    <p>Students enrolled: 10</p>
                </div>
            </div>
            <div className='mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between border border-red-500'>
                <div className='w-full lg:w-1/2 space-y-5 border border-green-500'>
                    <h1 className='font-bold text-xl md:text-2xl'>Description</h1>
                    <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ea incidunt magnam eveniet reprehenderit velit quidem odio ducimus vero ratione?</p>
                    <Card>
                        <CardHeader>
                            <CardTitle>Course content</CardTitle>
                            <CardDescription>4 lectures</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {
                                [1, 2, 3].map((lecture, index) => {
                                    return <div className='flex items-center gap-3 text-sm' key={index}>
                                        <span>{
                                            true ? <PlayCircle size={14} /> : <Lock size={14} />
                                        }</span>
                                        <p>Lectute title</p>
                                    </div>
                                })
                            }
                        </CardContent>
                    </Card>
                </div>
                <div className='lg:w-1/3 border border-green-500'>
                    <Card>
                        <CardContent className="p-4 flex flex-col">
                            <div className='w-full aspect-video mb-4 border border-red-700'>
                                Video
                            </div>
                            <h1>Lecture Title</h1>
                            <Separator className="my-2" />
                            <h1 className='text-lg md:text-xl font-semibold'>Course Price</h1>
                        </CardContent>
                        <CardFooter className="flex justify-center p-4">
                            {
                                isPurchased ? (<Button className="w-full">Continue Course</Button>) : (<BuyCourseButton courseId={courseId} />)
                            }
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail
