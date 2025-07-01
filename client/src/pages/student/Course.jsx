import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const Course = ({ course }) => {
    return (
        <Card className='overflow-hidden rounded-lg dark:bg-gray-800 bg-white shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300'>
            <div className='relative'>
                <img src={course.courseThumbnail || "https://img-c.udemycdn.com/course/750x422/3873464_403c_3.jpg"} alt=""
                    className="w-full h-36 object-cover rounded-t-lg"
                />
                <CardContent className="px-5 py-4 space-y-3">
                    <h1 className='hover:underline font-bold text:lg truncate'>{course.courseTitle || "Course name"}</h1>
                    <div className="flex items-center justify-between">
                        <div className='flex gap-3 items-center'>
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={course.creator.userProfileImg || "https://github.com/shadcn.png"} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <h1 className='font-medium text-sm'>{course.creator.name || "Name"}</h1>
                        </div>
                        <Badge className='' variant="secondary">
                            {course.courseLevel.charAt(0).toUpperCase() + course.courseLevel.slice(1) || "Level"}
                        </Badge>
                    </div>
                    <div className='text-lg font-bold'>
                        <span>₹{course.coursePrice || "Price"}</span>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}

export default Course
