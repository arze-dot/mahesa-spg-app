import React from 'react'
import { ACT_DetailOutlet } from '../../_action/action.detail.outlet';
import CE_FormEditOutlet from '../_element/CE_FormEditOutlet';

type Props = {
    params: { id: string }
};
const OutletEditPage = async (props: Props) => {
    const id = props?.params?.id
    const product: any = await ACT_DetailOutlet({ id }) || []

    return (
        <div className='p-3 space-y-5'>
            <h1 className='font-base text-lg'>Form Edit Outlet</h1>
            <CE_FormEditOutlet id={id} defaultValues={product?.data} />
        </div>
    )
}

export default OutletEditPage