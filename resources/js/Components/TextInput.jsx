import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, prefixIcon, suffixIcon, togglePassword,...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className='relative'>
            {prefixIcon && (
                <div className="absolute inset-y-0 left-0  flex items-center pl-3 h-10 text-gray-400">
                  {prefixIcon}
                </div>
              )}
            <input
                {...props}
                type={type}
                className={
                    'border focus:ring-0 focus:border-[#cc8a3f] rounded-md shadow-sm ' +
                    className
                }
                ref={input}
            />
            {suffixIcon && (
                <span className="absolute cursor-pointer hover:text-[#cc8a3f] text-gray-400 inset-y-0 right-0 flex items-center pr-3 h-10" onClick={togglePassword}>
                  {suffixIcon}
                </span>
              )}
        </div>
    );
});
