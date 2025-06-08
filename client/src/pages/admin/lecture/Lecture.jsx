import { Edit } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Lecture = ({ lecture, index }) => {
    const navigate = useNavigate();
    const handleLectureEdit = () => {
        navigate(`${lecture._id}`);
    }
    return (
        <div className='flex items-center justify-between bg-[#f7f9fa]'>
            <h1 className='font-bold text-gray-800 dark:text-gray:100'>
                {index + 1}: {lecture.lectureTitle}
            </h1>
            <Edit className='cursor-pointer text-gray-600 dark:text-gray-300'
                size={20} onClick={handleLectureEdit}
            />
        </div>
    )
}

export default Lecture
