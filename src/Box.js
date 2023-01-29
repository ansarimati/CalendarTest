import React from 'react'

export const Box = ({ className = '', num = '', events = [] }) => {
	const truncate = (str, n = 15) => {
		return (str.length > n) ? str.slice(0, n-1) + ' ...' : str;
	  };

	return (
		<div className={`Box ${className}`} >
			<div className='date'>{num}</div>
			<div className='event'>
				{events.map( (item, index)=> <div key={item + '_' + index} title={item}>{truncate(item)}</div>  )}
			</div>
		</div>
	)
}

