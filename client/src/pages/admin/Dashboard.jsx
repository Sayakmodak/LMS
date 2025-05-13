import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

const Dashboard = () => {
    return (
        <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-20 border border-yellow-600'>
            <Card className="border border-red-500 rounded-lg w-40 h-30 flex flex-col justify-center text-center">
                <CardHeader>
                    <CardTitle>
                        Total Sales
                    </CardTitle>
                </CardHeader>
            </Card>
        </div>
    )
}

export default Dashboard
