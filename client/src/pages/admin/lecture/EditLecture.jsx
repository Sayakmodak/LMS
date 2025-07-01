import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LectureTab from './lecture'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import axios from 'axios'
import { toast } from 'sonner'
import { Progress } from "@/components/ui/progress"
import { useGetLectuteByIdQuery, useRemoveLectureMutation, useUpdateLectureMutation } from '@/features/api/courseApi'


const MEDIA_API = "http://localhost:8080/api/v1/media";

const EditLecture = () => {
    // admin/course/683fbd1980ca5bcb7368d86f/lecture
    const navigate = useNavigate();
    const params = useParams();
    const { courseId, lectureId } = params;
    // console.log(courseId);

    const [lectureTitle, setLectureTitle] = useState("");
    const [isPreviewFree, setIsPreviewFree] = useState(false);
    const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
    const [mediaProgress, setMediaProgress] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [btnDisable, setBtnDisable] = useState(false);

    const [updateLecture, { data, isSuccess, isError, error, isLoading }] = useUpdateLectureMutation();

    const [removeLecture, { data: removeLectureData, isSuccess: removeLectureIsSuccess, error: removeLectureError, isError: removeLectureIsError, isLoading: removeLectureIsLoading }] = useRemoveLectureMutation();

    const { data: lectureByIdData, isSuccess: lectureByIdIsSuccess, isError: lectureByIdIsError, error: lectureByIdError, isLoading: lectureByIdIsLoading } = useGetLectuteByIdQuery(lectureId);

    console.log(lectureByIdData?.lecture);
    const lecture = lectureByIdData?.lecture;

    const fileChangeHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("file", file);
        setMediaProgress(true);
        try {
            const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
                onUploadProgress: ({ loaded, total }) => {
                    setUploadProgress(Math.round(loaded * 100) / total);
                }
            });
            if (res.data.success) {
                console.log(res);
                setUploadVideoInfo({
                    videoUrl: res.data.data.url,
                    publicId: res.data.data.public_id
                })
                setBtnDisable(false);
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error("Failed to upload video");
        } finally {
            setMediaProgress(false);
        }
    }

    const editLectureHandler = async () => {
        await updateLecture({ courseId, lectureId, lectureTitle, isPreviewFree, uploadVideoInfo })
    }

    const handleIsPreviewFree = (checked) => {
        // console.log(isPreviewFree);
        setIsPreviewFree(checked);
    }

    const removeLectureHandler = async () => {
        await removeLecture(lectureId);
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data.message || "Lecture Updated");
            console.log(data);
        }
        if (error) {
            toast.error(error.data.message || "Failed to update lecture");
        }
    }, [isSuccess, error])

    useEffect(() => {
        if (removeLectureIsSuccess) {
            toast.success(removeLectureData.message || "Lecture removed");
            navigate(`/admin/course/${courseId}/lecture`);
        }
        if (removeLectureError) {
            toast.error(removeLectureError.data.message || "Failed to remove lecture");
        }
    }, [removeLectureIsSuccess, removeLectureError]);

    useEffect(() => {
        if (lecture) {
            setLectureTitle(lecture.lectureTitle);
            setIsPreviewFree(lecture.isPreviewFree);
            setUploadVideoInfo(lecture.videoUrl);
        }
    }, [lecture]);

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
                        <Button variant="destructive" onClick={removeLectureHandler}>Remove Lecture</Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div>
                        <Label className="mb-2">Title</Label>
                        <Input type="text" value={lectureTitle} onChange={(e) => setLectureTitle(e.target.value)} placeholder="Eg. Introduction to Javascript" />
                    </div>
                    <div className='my-4'>
                        <Label className="mb-2">Video</Label>
                        <Input type="file" accept="video/*" className="w-fit" onChange={fileChangeHandler} />
                    </div>
                    {
                        mediaProgress && (
                            <div className='my-4'>
                                <Progress value={uploadProgress} className="w-[60%]" />
                                <p>{uploadProgress}% uploaded</p>
                            </div>
                        )
                    }
                    <div className='flex items-center space-x-2 my-5'>
                        <Switch id="airplane-mode" checked={isPreviewFree} onCheckedChange={handleIsPreviewFree} />
                        <Label htmlFor="airplane-mode">Preview free</Label>
                    </div>
                    <div className="mt-4">
                        <Button disabled={isLoading} onClick={editLectureHandler}>
                            {
                                isLoading ? <>
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                </> : <> Update Lecture </>
                            }
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>

    )
}

export default EditLecture
