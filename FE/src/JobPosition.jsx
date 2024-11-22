import React, { useEffect, useState } from 'react'
import axios from 'axios'
import PositionChild from './childComponent/PositionChild'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './childComponent/childComponent.css'
const JobPosition = () => {
    const [data, setData] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [activeStatus, setActiveStatus] = useState("active");
    const [name,setName] = useState('');
    const [code,setcode] = useState('');
    const [des,setDes] = useState('');
    const handleClick = (status, event) => {
        event.preventDefault(); 
        setActiveStatus(status);
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios({
                    url: 'http://localhost:8080/teachers/position',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                },
                )
                setData(res.data)
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [])
    const toggleForm = () => {
        setIsFormVisible(!isFormVisible);
    };
    const handCreatePosition = async ()=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('code', code);
        formData.append('des', des);
        try {
            const response = await fetch('http://localhost:8080/teachers/Addposition', {
                method: 'POST',
                body: formData, 
            });
      
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error details:', errorData);
                throw new Error('Failed to add Position');
            }
           
            const data = await response.json();
            console.log('teacher added successfully:', data);
            if (data.message === "Vị trí đã tồn tại") {
                toast.error("Vị trí đã tồn tại!"); 
            } else {
                toast.error("Đã xảy ra lỗi!"); 
            }
        } catch (err) {
            console.error('Error adding Position:', err);
        }
    }
    return (
        <>
            <div className='taomoiPosition'>
                <button onClick={() => window.location.reload()}>Làm mới</button>
                <button onClick={toggleForm}>Tạo mới</button>
            </div>
            {isFormVisible && (
                <form className="form-overlays" encType="multipart/form-data">
                    <div className="form-containers ">
                        <div className='pagePosition'>

                        <span type="button" onClick={toggleForm} className='buttonX'>X</span>
                        <span>Vị trí công tác</span><br />
                        <label>Mã</label><br />
                        <input className='inputWidth' type="text" name="code" value={code} onChange={e=>setcode(e.target.value)} /><br />
                        <label>Tên</label><br />
                        <input className='inputWidth' type="text" name="name" value={name} onChange={e=>setName(e.target.value)} /><br />
                        <label>Mô tả</label><br />
                        <textarea className='inputWidth' type="text" name="des" value={des} onChange={e=>setDes(e.target.value)} />
                        <div className="button-toggle">
                            <div className="button-toggle">
                                <button
                                    type="button"
                                    className={activeStatus === "active" ? "btn active" : "btn"}
                                    onClick={(e) => handleClick("active", e)}
                                    >
                                    Đang hoạt động
                                </button>
                                <button
                                    type="button"
                                    className={activeStatus === "inactive" ? "btn active" : "btn"}
                                    onClick={(e) => handleClick("inactive", e)}
                                    >
                                    Ngưng hoạt động
                                </button>
                                    </div>
                            </div>
                        </div>
                        <ToastContainer/>
                    </div>
                    <button className="savebutton" type='submit' onClick={handCreatePosition} >Lưu</button>
                </form>
            )}
            <div>
                <div className='flex boder flex-around'>
                    <span className='STT'>STT</span>
                    <span className='maPosition'>Mã</span>
                    <span className='namePosition'>Tên</span>
                    <span className='statusPosition'>Trạng thái</span>
                    <span className='desPosition'>Mô tả</span>

                </div>

                {data ? data.map((item, index) => <PositionChild key={item._id} items={item} index={index} />)
                    : <p>Loading...</p>}
            </div>
        </>
    )
}

export default JobPosition