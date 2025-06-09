import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

const LectureTab = () => {
    return (
        <Card>
            <CardHeader className="flex justify-between">
                <div>
                    <CardTitle>Edit Lecture</CardTitle>
                    <CardDescription>Make changes and click when done</CardDescription>
                </div>
                <div className='flex items-center gap-2'>
                    <Button variant="destuctive">Remove Lecture</Button>
                </div>
            </CardHeader>
            <CardContent>
                <div>
                    <Label>Title</Label>
                    <Input type="text" placeholder="Eg. Introduction to Jabascript" />
                </div>
            </CardContent>
        </Card>
    )
}

export default LectureTab
