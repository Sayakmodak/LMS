import CourseTab from '@/comp/CourseTab'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

const EditCourse = () => {
    return (
        <div className='flex-1 mx-10 mt-24'>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='font-bold text-xl'>Add detail information regarding the course</h1>
                <Link to="/lecture">
                    <Button variant="outline">Go to lecture</Button>
                </Link>
            </div>
            <CourseTab />
        </div>
    )
}

export default EditCourse
