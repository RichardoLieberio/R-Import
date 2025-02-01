'use client';

import { useState, useEffect } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';
import Image from './Image';

export default function InstagramView({ rawData }) {
    const [ images, setImages ] = useState([]);
    const [ selected, setSelected ] = useState({});
    const [ page, setPage ] = useState(1);

    useEffect(function () {
        async function getImages() {
            let allImages = [];
            let data = rawData.data;
            let next = rawData.paging.next;

            do {
                for (const { children } of data) {
                    if (allImages.length >= process.env.NEXT_PUBLIC_MAX_MEDIA_LENGTH) break;
                    for (const media of children.data) {
                        if (allImages.length >= process.env.NEXT_PUBLIC_MAX_MEDIA_LENGTH) break;
                        allImages.push(media);
                    }
                }

                if (next && allImages.length < process.env.NEXT_PUBLIC_MAX_MEDIA_LENGTH) {
                    try {
                        const res = await fetch(next);
                        const rawData = await res.json();

                        data = rawData.data;
                        next = rawData.paging.next;
                    } catch (error) {
                        console.error(error);
                    }
                }
            } while (next && allImages.length < process.env.NEXT_PUBLIC_MAX_MEDIA_LENGTH)

            setImages(allImages);
        }

        getImages();
    }, []);

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

    const viewImages = images.slice((page - 1) * 10, page * 10);

    return (
        <>
            <div className="flex items-center justify-center gap-2">
                <MdKeyboardDoubleArrowLeft onClick={firstPage} className={`text-xl ${page === 1 && 'text-slate-500'} cursor-pointer`} />
                <MdKeyboardArrowLeft onClick={prevPage} className={`text-xl ${page === 1 && 'text-slate-500'} cursor-pointer`} />
                <span className="w-6 text-center select-none">{ page }</span>
                <MdKeyboardArrowRight onClick={nextPage} className={`text-xl ${images.length <= page * 10 && 'text-slate-500'} cursor-pointer`} />
                <MdKeyboardDoubleArrowRight onClick={lastPage} className={`text-xl ${images.length <= page * 10 && 'text-slate-500'} cursor-pointer`} />
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2">
                {
                    viewImages.map(({ id, media_url }) => (
                        <Image key={id} id={id} media={media_url} selected={selected[id]} clickHandler={toggleImage} />
                    ))
                }
            </div>
        </>
    );
}