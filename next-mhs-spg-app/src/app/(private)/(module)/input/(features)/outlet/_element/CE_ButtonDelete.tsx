'use client'

import { ICONPACK } from '@/registry/icons'
import Image from 'next/image'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import CE_Modal from '@/app/(private)/_element/CE_Modal'
import { ACT_DeleteOutlet } from '../_action/action.delete.outlet'

const CE_ButtonDelete = ({ id }: { id: string }) => {
    const [modalShow, setModalShow] = useState<boolean>(false)
    const handleDeleteProduct = async (id: string) => {
        try {
            const resp = await ACT_DeleteOutlet({ id })
            toast.success("Berhasil menghapus outlet")

            return resp
        } catch (error) {
            toast.error("gagal menghapus outlet")
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