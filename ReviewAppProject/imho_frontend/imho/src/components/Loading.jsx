import loadingIcon from '../assets/arrow_path.svg'

export default function Loading() {
    return (
        <div className="flex gap-2 items-center my-4">
            <img className="w-6 animate-spin" src={loadingIcon}/>
            <p>Loading...</p>
        </div>
    );
}