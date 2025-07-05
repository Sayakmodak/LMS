import { Button } from '@/components/ui/button'
import { useCreateCheckoutSessionMutation } from '@/features/api/purchaseApi';
import { Loader2 } from 'lucide-react';
import React, { useEffect } from 'react'
import { toast } from 'sonner';

const BuyCourseButton = ({ courseId }) => {
    const [createCheckoutSession, { data, isLoading, isSuccess, isError, error }] = useCreateCheckoutSessionMutation();

    const purchaseCourseHandler = async () => {
        await createCheckoutSession(courseId);
    }

    useEffect(() => {
        if (isSuccess) {
            if (data?.url) {
                window.location.href = data.url; // redirect to stripe chekout page
            }
            else {
                toast.error("Invalid response from server")
            }
        }

        if (isError) {
            toast.error(error?.data?.message || "fFailed to create chekout session")
        }
    }, [data, isSuccess, isError, error]);

    return (
        <Button className="w-full" disabled={isLoading} onClick={purchaseCourseHandler}> {
            isLoading ? (
                <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    "Please wait"
                </>
            ) : "Purchase course"
        }</Button>
    )
}

export default BuyCourseButton
