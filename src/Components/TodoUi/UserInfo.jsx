import React, { useContext, useState } from 'react'
import { fetchApiFormData } from '../../helpers/api';
import { userStatusContext } from '../../TodoApp'

export const UserInfo = () => {

  const { userData, setUserData } = useContext(userStatusContext);
  const [updatingImage, setUpdatingImage] = useState(false);

  const handleChangeAvatar = async (e) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    setUpdatingImage(true);
    const resp = await fetchApiFormData('users/setAvatar', 'PUT', formData);
    if (!resp.ok) {
      setUpdatingImage(false);
      return alert(resp.msg)
    }
    setUserData({ ...userData, avatar: resp.newUrl });
    setUpdatingImage(false);
  }

  return (
    <div className='container-todoui__user-info'>
      <div className='container-todoui__user-info__input-file-img'>
        <input type="file" onChange={handleChangeAvatar} />
        <img src={updatingImage ? 'https://dakshyainternational.com.np/wp-content/uploads/2018/10/updating.gif' : userData.avatar} alt='user avatar' />
      </div>
      <div className='container-todoui__user-info__info'>
        <h2>Welcome <b>{userData.name}</b></h2>
        <small>You have <b>{userData.todos.length}</b> tasks</small>
      </div>
    </div>
  )
}
