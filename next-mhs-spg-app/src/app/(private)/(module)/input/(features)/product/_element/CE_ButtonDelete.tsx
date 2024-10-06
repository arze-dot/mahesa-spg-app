'use client'

import { ICONPACK } from '@/registry/icons'
import Image from 'next/image'
import React from 'react'
import { ACT_DeleteProduct } from '../_action/action.delete.product'
import toast from 'react-hot-toast'

const CE_ButtonDelete = ({ id }: { id: string }) => {
    const handleDeleteProduct = async (id: string) => {
        try {
            const resp = await ACT_DeleteProduct({ id })
            return resp
        } catch (error) {
            toast.error("gagal menghapus produk")
        }
    }
    return (
        <Image
            src={ICONPACK.trash}
            alt='Delete Product'
            onClick={() => handleDeleteProduct(id)}
            width={16}
            height={16}
        />
    )
}

export default CE_ButtonDelete