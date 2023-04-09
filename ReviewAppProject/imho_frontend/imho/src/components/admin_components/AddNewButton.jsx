import plusIcon from '../../assets/plusIcon.svg';
export default function AddNewButton({handleAdd, text}) {
    return (
        <div>
            <div className='w-fit flex h-4 gap-2 items-center cursor-pointer
            hover:h-6 hover:text-lg transition-all'
            onClick={handleAdd}>
                <img className='h-full' src={plusIcon} alt='plusIcon'/>
                <p className='font-semibold'>{text}</p>
            </div>
        </div>
    );
}