import React from 'react'
import avatar from '../image/avatar.svg'
import './childComponent.css'
const TeacherChild = React.memo(({items}) => {
    const {degrees,userId,code,image,isActive} = items
  return (
    <div className='flex pt-10 boder '>
        <span>{code}</span>
        <div className='flex teacher '>
        {image? <img className='avatar' src={image}/>: <img className=' avatar' src={avatar}/>}
        <div className='text-font nameTeacher'>
            <span className='pt-0 pb-0 mt-0 mb-0'>{userId.name}</span><br/>
            <span className='pt-0 pb-0 mt-0 mb-0'>{userId.email}</span><br/>
            <span className='pt-0 pb-0 mt-0 mb-0'>{userId.phoneNumber}</span>
        </div>
        </div>
<div className='TTcongtac'>
        {degrees.map(items => <div className='p  text-font' key={items._id}>
            <span className='p'>Bậc: {items.type}</span><br/>
            <span className='p'>Chuyên ngành: {items.major}</span>
        </div>)}
</div>

        <p className='bomonChild text-font'>N/A</p>
        <p className='GVBMChild text-font'>Giáo viên bộ môn</p>
        <p className='address text-font'>{userId.address}</p>
        {isActive  ? <p className='isActive text-font'>Đang hoạt động</p> : <p>Ngưng hoạt động</p>}
        <button className='chitiet'>Chi tiết</button>
    </div>
  )
})

export default TeacherChild