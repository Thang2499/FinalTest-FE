import React from 'react'
import './childComponent.css'
const PositionChild = ({items,index}) => {
    const {code,name,des,isActive} = items
  return (
    <>

    <div className='flex pt-10 boder '>
    <span className='sttPositionChild'>{index+1}</span>

        <span className='maPositionChild'>{code}</span><br/>  

    <p className='namePositionChild'>{name}</p>
    <p className={isActive ? 'activePositionChild active' : ''}>
    {isActive ? 'Đang hoạt động' : 'Ngưng hoạt động'}
</p>
    <p className='desPositionChild'>{des}</p>

</div>
    </>
  )
}

export default PositionChild