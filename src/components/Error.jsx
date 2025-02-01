import { MdErrorOutline } from 'react-icons/md';

export default function Error({ message }) {
    return (
        <div className="flex items-center gap-2 text-red-600">
            <MdErrorOutline />
            <span>{ message }</span>
        </div>
    );
}