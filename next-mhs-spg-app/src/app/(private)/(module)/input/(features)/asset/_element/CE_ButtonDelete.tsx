'use client'

import { ICONPACK } from '@/registry/icons'
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import CE_Modal from '@/app/(private)/_element/CE_Modal'
import { ACT_DeleteAsset } from '../_action/action.delete.asset'

const CE_ButtonDelete = ({ id }: { id: string }) => {
    const [modalShow, setModalShow] = useState<boolean>(false)
    const handleDeleteProduct = async (id: string) => {
        try {
            const resp = await ACT_DeleteAsset({ id })
            toast.success("Berhasil menghapus produk")
            return resp
        } catch (error) {
            toast.error("gagal menghapus produk")
        }
    }
    return (
        <>
            <CE_Modal isShow={modalShow} onCancel={() => setModalShow((prev) => !prev)} onConfrim={() => handleDeleteProduct(id)} />
            <Image
                src={ICONPACK.trash}
                alt='Delete Product'
                onClick={() => setModalShow(true)}
                width={16}
                height={16}
            />
        </>
    )
}

export default CE_ButtonDelete