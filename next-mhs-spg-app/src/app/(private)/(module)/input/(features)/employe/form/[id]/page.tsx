import React from 'react'
import CE_FormEditOutlet from '../_element/CE_FormEditOutlet';
import { ACT_DetailEmployee } from '../../_action/action.detail.employee';

type Props = {
    params: { id: string }
};
const OutletEditPage = async (props: Props) => {
    const id = props?.params?.id
    const product: any = await ACT_DetailEmployee({ id }) || []

    return (
        <div className='p-3 space-y-5'>
            <h1 className='font-base text-lg'>Form Edit Outlet</h1>
            <CE_FormEditOutlet id={id} defaultValues={product?.data} />
        </div>
    )
}

export default OutletEditPage