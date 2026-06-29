import { HugeiconsIcon } from '@hugeicons/react'
import { CenterFocusIcon, HistoryIcon, Home01Icon, Notification03Icon, Settings03FreeIcons, ShoppingCart01Icon, User03Icon, UserIcon, Wallet03FreeIcons, Wallet03Icon } from '@hugeicons/core-free-icons';


export default function Footer() {
    
    return (
        <footer className='max-w-80 flex justify-between gap-6 mx-auto fixed bottom-0 left-1/2 -translate-x-1/2'>
            <p className='flex flex-col items-center text-xs'> <HugeiconsIcon icon={Home01Icon} size={20} color='currentColor' />Home</p>
            <p className='flex flex-col items-center text-xs'> <HugeiconsIcon icon={Wallet03Icon} size={20} color='currentColor' /> Canvas</p>
            <button className='relative -top-3'> <HugeiconsIcon icon={CenterFocusIcon} size={30} /> </button>
            <p className='flex flex-col items-center text-xs'> <HugeiconsIcon icon={HistoryIcon} size={20} color='currentColor' /> History</p>
            <p className='flex flex-col items-center text-xs'> <HugeiconsIcon icon={User03Icon} size={20} color='currentColor' />Profile</p>
        </footer>
    )
}