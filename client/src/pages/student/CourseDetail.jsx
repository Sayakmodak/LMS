import BuyCourseButton from '@/comp/BuyCourseButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useCourseDetailsWithPurchasedStatusQuery } from '@/features/api/purchaseApi'
import { BadgeInfo, PlayCircle } from 'lucide-react'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPlayer from 'react-player'

const CourseDetail = () => {
    const navigate = useNavigate();
    const params = useParams()
    const courseId = params.courseId;
    const { data, isLoading, isSuccess, isError, error } = useCourseDetailsWithPurchasedStatusQuery(courseId);

    if (isLoading) return <h3>Loading...</h3>
    if (error) return <h3>Failed to fetch course details</h3>

    const { course, purchase } = data;
    // console.log(purchase);
    // console.log(course);

    const redirectToProgressPage = () => {
        if (purchase) {
            navigate(`/course-progress/${courseId}`);
        }
    }

    return (
        <div className='mt-15 space-y-5'>
            <div className='bg-[#2D2F31] text-white'>
                <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2'>
                    <h1 className='font-bold text-2xl md:text-3xl'>{course?.courseTitle}</h1>
                    <p className='text-base md:text-lg'>Course subtitle</p>
                    <p>Created by {course?.creator.name} <span className='text-[#C0C4FC] ubderline italic'>Patel</span></p>
                    <div className='flex items-center gap-2 text-sm'>
                        <BadgeInfo className='' size={16} />
                        <p>Last updated at {course?.createdAt.split("T")[0]}</p>
                    </div>
                    <p>Students enrolled: {course?.enrolledStudents.length}</p>
                </div>
            </div>
            <div className='mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row justify-between'>
                <div className='w-full lg:w-1/2 space-y-5'>
                    <h1 className='font-bold text-xl md:text-2xl'>Description</h1>
                    {
                        course?.description ? (<p className='text-sm' dangerouslySetInnerHTML={{ __html: course?.description }} />) : (<p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus ea incidunt magnam eveniet reprehenderit velit quidem odio ducimus vero ratione?</p>)
                    }
                    <Card>
                        <CardHeader>
                            <CardTitle>Course content</CardTitle>
                            <CardDescription>4 lectures</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {
                                course?.lectures.map((lecture, index) => {
                                    return <div className='flex items-center gap-3 text-sm' key={index}>
                                        <span>
                                            {
                                                true ? <PlayCircle size={14} /> : <Lock size={14} />
                                            }
                                        </span>
                                        <p>{lecture.lectureTitle}</p>
                                    </div>
                                })
                            }
                        </CardContent>
                    </Card>
                </div>
                <div className='lg:w-1/3'>
                    <Card>
                        <CardContent className="p-4 flex flex-col">
                            <div className='w-full aspect-video mb-4'>
                                <ReactPlayer
                                    width={"100%"}
                                    height={"100%"}
                                    controls={true}
                                    src={course.lectures[0].videoUrl || 'https://www.youtube.com/watch?v=LXb3EKWsInQ'}
                                />
                            </div>
                            <h1>Lecture Title</h1>
                            <Separator className="my-2" />
                            <h1 className='text-lg md:text-xl font-semibold'>{course?.coursePrice}</h1>
                        </CardContent>
                        <CardFooter className="flex justify-center p-4">
                            {
                                purchase ? (<Button className="w-full" onClick={redirectToProgressPage}>Continue Course</Button>) : (<BuyCourseButton courseId={courseId} />)
                            }
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default CourseDetail
