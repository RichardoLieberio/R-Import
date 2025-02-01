import { FaCheck } from 'react-icons/fa';

export default function Image({ id, media, selected, clickHandler }) {
    return (
        <div onClick={() => clickHandler(id)} className={`relative cursor-pointer border-4 ${selected ?'border-green-600' : 'border-transparent'} select-none`}>
            <img src={media} alt="Instagram Photo" />
            <div className={`w-6 h-6 flex items-center justify-center absolute top-2 right-2 text-green-600 bg-white ${selected && 'border-2 border-green-600'} select-none`}>
                { selected && <FaCheck /> }
            </div>
        </div>
    );
}