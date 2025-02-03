'use client';

import { useState } from 'react';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import Error from '@components/Error';
import Image from './Image';

export default function ViewImages({ error, images }) {
    const [ selected, setSelected ] = useState({});
    const [ page, setPage ] = useState(1);

    function firstPage() {
        setPage(1);
    }

    function prevPage() {
        page !== 1 && setPage((page) => page - 1);
    }

    function nextPage() {
        images.length > page * 10 && setPage((page) => page + 1);
    }

    function lastPage() {
        setPage(Math.ceil(images.length / 10));
    }

    function toggleImage(id) {
        const newSelected = { ...selected };

        selected[id]
        ? delete newSelected[id]
        : newSelected[id] = true;

        setSelected(newSelected);
    }

    const viewImages = images?.slice((page - 1) * 10, page * 10);

    if (error) return (
        <div className="w-fit mx-auto">
            <Error message={error} />
        </div>
    );

    if (images === null) return (
        <div></div>
    );

    if (!!images.length) return (
        <>
            <div className="flex items-center justify-center gap-2">
                <MdKeyboardDoubleArrowLeft onClick={firstPage} className={`text-xl ${page === 1 && 'text-slate-500'} cursor-pointer`} />
                <MdKeyboardArrowLeft onClick={prevPage} className={`text-xl ${page === 1 && 'text-slate-500'} cursor-pointer`} />
                <span className="w-6 text-center select-none">{ page }</span>
                <MdKeyboardArrowRight onClick={nextPage} className={`text-xl ${images.length <= page * 10 && 'text-slate-500'} cursor-pointer`} />
                <MdKeyboardDoubleArrowRight onClick={lastPage} className={`text-xl ${images.length <= page * 10 && 'text-slate-500'} cursor-pointer`} />
            </div>
            <div className="mt-4 columns-2 md:columns-5 gap-x-4">
                {
                    viewImages.map(({ id, media }) => (
                        <Image key={id} id={id} media={media} selected={selected[id]} clickHandler={toggleImage} />
                    ))
                }
            </div>
        </>
    );

    return (
        <div className="text-center">No images found</div>
    );
}