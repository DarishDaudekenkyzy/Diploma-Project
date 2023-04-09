import backIcon from '../../assets/backIcon.svg';

export default function BackArrow({onBack, text}) {
    return (
    <div className='flex flex-row items-center mb-4'>
        <div className='flex w-8 h-8 gap-1 relative cursor-pointer'
            onClick={onBack}>
            <div className='w-full h-full flex items-center justify-center absolute 
            hover:-translate-x-2 transition-transform'>
                <img className='w-6' src={backIcon} alt='back'/>
            </div>
        </div>
        <p className={`text-2xl`}>{text}</p>
    </div>
    );
}