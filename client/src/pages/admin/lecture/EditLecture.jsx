import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import LectureTab from './lecture'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const EditLecture = () => {
    const params = useParams();
    const courseId = params.courseId;
    console.log(courseId);

    return (
        <div>
            <div className='flex items-center justify-between mb-5 mt-24 mx-10'>
                <div className='flex items-center gap-2'>
                    <Link to={`/admin/course/${courseId}/lecture`}>
                        <Button size="icon" variant="outline" className="rounded-full">
                            <ArrowLeft size={16} />
                        </Button>
                    </Link>
                    <h1 className='font-bold text-xl'>Update your lecture</h1>
                </div>
            </div>


            {/* <LectureTab /> */}
            <Card className="py-4 mx-10">
                <CardHeader className="flex justify-between">
                    <div className=''>
                        <CardTitle>Edit Lecture</CardTitle>
                        <CardDescription>Make changes and click when done</CardDescription>
                    </div>
                    <div className=''>
                        <Button variant="destructive">Remove Lecture</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div>
                        <Label className="mb-2">Title</Label>
                        <Input type="text" placeholder="Eg. Introduction to Jabascript" />
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}

export default EditLecture
