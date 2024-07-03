import BaseLayout from '@/components/BaseLayout'
import React from 'react'
import PurchaseSummary from './PurchaseSummary'

const page = () => {
    return (
        <div>
            <BaseLayout>
            <PurchaseSummary/>
            </BaseLayout>
        </div>
    )
}

export default page
