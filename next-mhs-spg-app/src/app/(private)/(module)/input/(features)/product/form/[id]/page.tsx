import React from 'react'
import CE_FormEditProduct from '../_element/CE_FormEditProduct';
import { ACT_DetailProduct } from '../../_action/action.detail.product';

type Props = {
    params: { id: string }
};
const ProductEditPage = async (props: Props) => {
    const id = props?.params?.id
    const product: any = await ACT_DetailProduct({ id }) || []

    return (
        <div className='p-3 space-y-5'>
            <h1 className='font-base text-lg'>Form Produk</h1>
            <CE_FormEditProduct id={id} defaultValues={product} />
        </div>
    )
}

export default ProductEditPage