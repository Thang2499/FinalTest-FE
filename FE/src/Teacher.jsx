import React, { useEffect, useState } from 'react'
import TeacherChild from './childComponent/TeacherChild';
import './App.css'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './childComponent/childComponent.css'
const Teacher = () => {
    const [data, setData] = useState([]);
    const [position, setPosition] = useState([]);
    const [query, setQuery] = useState({ page: 1, limit: 10 });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [identity, setIdentity] = useState('');
    const [dob, setDob] = useState('');
    const [idPosition, setIdPosition] = useState([]);
    const [educations, setEducations] = useState([
        { type: "", school: "", major: "", isGraduated: true, year: "" },
      ]);
      const handleInputChange = (index, e) => {
        const { name, value, type, checked } = e.target;
        const updatedEducations = [...educations];
        updatedEducations[index][name] = type === "checkbox" ? checked : value;
        setEducations(updatedEducations);
      };
    
      // const handleAddRow = () => {
      //   setEducations((prev) => [
      //     ...prev,
      //     { type: "", school: "", major: "", isGraduated: false, year: "" },
      //   ]);
      // };
    
      // const handleRemoveRow = (index) => {
      //   const updatedEducations = educations.filter((_, i) => i !== index);
      //   setEducations(updatedEducations);
      // };
      const handleCreate = async (event)=>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('phoneNumber', phoneNumber);
        formData.append('address', address);
        formData.append('identity', identity);
        formData.append('dob', dob);
        formData.append('idPosition', (idPosition)); 
      if (educations && educations.length > 0) {
        formData.append('degrees', JSON.stringify(educations.map(({ type, school, major, year }) => ({
            type, 
            school, 
            major, 
            year, 
            isGraduated: true
        }))));
    }
        try {
            const response = await fetch('http://localhost:8080/teachers/Addteachers', {
                method: 'POST',
                body: formData, 
            });
            if (!response.ok) {
              toast.error('Kiểm tra lại thông tin đăng ký')
                const errorData = await response.json();
                console.error('Error details:', errorData);
                throw new Error('Failed to add teacher');
              }
              const data = await response.json();
              toast.success("Tạo mới thành công");
        } catch (err) {
            console.error('Error adding teacher:', err);
        }
      }
    const moveToLeft = () => {
      if (query.page === 1) return
      setQuery(pre => ({
        ...pre,
        page: pre.page - 1
      }
      ))
    }
    const moveToRight = () => {
      setQuery(pre => ({
        ...pre,
        page: pre.page + 1
      }
      ))
    }
    const toggleForm = () => {
        setIsFormVisible(!isFormVisible); 
      };
    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios({
              url: 'http://localhost:8080/teachers/teachers',
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
              params: query,
            },
            )
            setData(res.data)
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, [query]);

      useEffect(() => {
        const fetchDataPosition = async () => {
          try {
            const res = await axios({
              url: 'http://localhost:8080/teachers/position',
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
            },
            )
            setPosition(res.data)
          } catch (err) {
            console.log(err);
          }
        };
        fetchDataPosition();
      }, []);
  return (
    <>
    <div className='taomoi'>
        <input type="text" placeholder='Tìm kiếm thông tin' />
        <button onClick={() => window.location.reload()}>Làm mới</button>
        <button onClick={toggleForm}>Tạo mới</button>
    </div>
      {isFormVisible && (
        <form className="form-overlay" onSubmit={handleCreate} encType="multipart/form-data">
          <div className="form-container ">
          <span type="button" onClick={toggleForm}className='buttonX'>X</span>
            <span>Tạo mới thông tin Giáo viên</span>
            <div className="form-content">
        {/* Thông tin cá nhân */}
        <div className="personal-info" >
          <div className="avatar">
            <label htmlFor="upload-avatar" className="avatar-label">
              <img
                src="https://via.placeholder.com/100"
                alt="Avatar"
                className="avatar-image"
              />
              <input type="file" id="upload-avatar" className="avatar-input"  />
              <p>Chọn ảnh</p>
            </label>
          </div>
          <div className="fields">
            <div className="field-group">
              <label>Họ và tên</label>
              <input type="text" placeholder="Nhập họ và tên" name='name' value={name}  onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field-group">
              <label>Ngày sinh</label>
              <input type="date" value={dob} name='dob'  onChange={(e) => setDob(e.target.value)} />
            </div>
            <div className="field-group">
              <label>Số điện thoại</label>
              <input type="text" placeholder="Nhập số điện thoại" name='phoneNumber'  value={phoneNumber}  onChange={(e) => setphoneNumber(e.target.value)} />
            </div>
            <div className="field-group">
              <label>Email</label>
              <input type="email" placeholder="example@school.edu.vn" name='email' value={email}  onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="field-group">
              <label>Số CCCD</label>
              <input type="text" placeholder="Nhập số CCCD" name='identity' value={identity}  onChange={(e) => setIdentity(e.target.value)} />
            </div>
            <div className="field-group">
              <label>Địa chỉ</label>
              <input type="text" placeholder="Địa chỉ thường trú" name='address' value={address}  onChange={(e) => setAddress(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Thông tin công tác */}
        <div className="work-info">
          <h3>Thông tin công tác</h3>
          <div className="field-group">
            <label>Vị trí công tác</label>
            <select name='idPosition'  onChange={(e) => setIdPosition(e.target.value)}>
              <option>Chọn các vị trí công tác</option>
              {position.map(item => <option key={item._id} value={item._id}  >{item.code}-{item.des}</option>)}
            </select>
          </div>
        </div>

        {/* Học vị */}
        <div className="education-info">
          <h3>Học vị</h3>
          <table>
        <thead>
          <tr>
            <th>Bậc</th>
            <th>Trường</th>
            <th>Chuyên ngành</th>
            <th>Trạng thái</th>
            <th>Tốt nghiệp</th>
          </tr>
        </thead>
        <tbody>
          {educations.map((edu, index) => (
            <tr key={index}>
              <td>
                <select
                  name="type"
                  value={edu.type}
                  onChange={(e) => handleInputChange(index, e)}
                >
                  <option >Chọn bậc</option>
                  <option value="Cử nhân">Cử nhân</option>
                  <option value="Thạc sĩ">Thạc sĩ</option>
                  <option value="Tiến sĩ">Tiến sĩ</option>
                </select>
              </td>
              <td>
                <input
                  type="text"
                  name="school"
                  value={edu.school}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Trường theo học"
                />
              </td>
              <td>
                <input
                  type="text"
                  name="major"
                  value={edu.major}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Chuyên ngành"
                />
              </td>
              <td>
                <label>
                  <input
                    type="checkbox"
                    name="isGraduated"
                    checked={edu.isGraduated}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                  Hoàn thành
                </label>
              </td>
              <td>
                <input
                  type="text"
                  name="year"
                  value={edu.year}
                  onChange={(e) => handleInputChange(index, e)}
                   placeholder="Năm"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
        </div>
      </div>
      {/* Nút Lưu */}
      <div className="form-actions">
        <button className="save-button" type='submit' >Lưu</button>
        </div>
          </div>
          <ToastContainer/>
        </form>
      )}
    <div className='flex mt-10 boder'>
        <span>Mã</span>
        <span className='teachers'>Giáo viên</span>
        <span className='trinhdo'>Trình độ</span>
        <span className='bomon'>Bộ môn</span>
        <span className='Tcongtac'>TT công tác</span>
        <span className='diachi'>Địa chỉ</span>
        <span className='trangthai'>Trạng thái</span>
        <span className='hanhdong'>Hành động</span>
    </div>
    <div>
        {data ? (<div>{data.map(item => (<TeacherChild key={item.id} items={item} />))}</div>) : <p>Loading...</p>}
      </div>
      <div className="pagination-container">
    <button onClick={moveToLeft}  disabled={query.page === 1}>Left</button>
    <span>{query.page}</span>
    <button onClick={moveToRight}>Right</button>
</div>
    </>
  )
}

export default Teacher