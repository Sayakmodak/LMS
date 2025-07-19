import { useCourseDetailsWithPurchasedStatusQuery } from "@/features/api/purchaseApi"
import { Navigate, useParams } from "react-router-dom";

export const ProgressPageProtectedRoute = ({ children }) => {
    const { courseId } = useParams();
    const { data, isLoading } = useCourseDetailsWithPurchasedStatusQuery(courseId);
    console.log(data);

    if (isLoading) return <p>Loading...</p>


    return data?.purchase ? children : <Navigate to={`/course-detail/${courseId}`} />;
}