import '../styles/Button.scss'

const Button = ({buttonText, onClick, prefixLogo, customClass, suffixLogo}) => {
  return (
   <div onClick={onClick} className={`flex w-fit  py-1.5 px-3.5 items-center rounded-md navbarButton text-white font-bold text-sm cursor-pointer button ${customClass}`}>
    {prefixLogo}
    <p className='flex text'>{buttonText}</p>
    {suffixLogo}
   </div>
  )
}

export default Button