import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@mantine/core'
import { CheckCircle2, CirclePlay } from 'lucide-react';
import React from 'react'

const CourseProgress = () => {
    const isCompleted = true;

    return (
        <div className='max-w-7xl mx-auto p-4 mt-20 px-11 py-4 space-y-3 border-red-500'>
            {/* Display the course name */}
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Course Title</h1>
                <Button>Completed</Button>
            </div>

            <div className='flex flex-col md:flex-row gap-6'>
                <div className='flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4'>
                    <div>
                        {/* Video Section */}
                        {/* TODO: video */}
                    </div>
                    <div>
                        {/* display current watching lecture title */}
                        <h3 className='font-medium text-lg'>Lecture 1: Introduction</h3>
                    </div>
                </div>
                {/* Lecture Sidebar */}
                <div className='flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0'>
                    <h2 className='font-semibold text-xl mb-4'>Course Lectures</h2>
                    <div className='flex-1 overflow-auto'>
                        {
                            [1, 2, 3, 4].map((lecture, idx) => (
                                <Card key={idx} className="m-3 hover:cursor-pointer transition transform">
                                    <CardContent className="flex p-4 items-center justify-between">
                                        <div className='flex items-center'>
                                            {
                                                isCompleted ? <CheckCircle2 size={24} className='text-green-500 mr-2' /> : <CirclePlay className='text-gray-500 mr-2' />
                                            }
                                            <div>
                                                <CardTitle className='text-lg font-medium'>Introduction</CardTitle>
                                            </div>
                                        </div>
                                        <Badge variant="outline" className='bg-green-200 text-lg-600'>Completed</Badge>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseProgress
