import React from 'react'
import { ACT_DetailAsset } from '../../_action/action.detail.asset';
import CE_FormEditAsset from '../_element/CE_FormEditAsset';

type Props = {
    params: { id: string }
};
const ProductEditPage = async (props: Props) => {
    const id = props?.params?.id
    const asset: any = await ACT_DetailAsset({ id }) || []

    return (
        <div className='p-3 space-y-5'>
            <h1 className='font-base text-lg'>Form Asset</h1>
            <CE_FormEditAsset id={id} defaultValues={asset?.data} />
        </div>
    )
}

export default ProductEditPage