import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function ProfilePage() {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    const nav = useNavigate();
    const [dataUser, setDataUser] = useState([]);
    const [msgPassword, setMsgPassword] = useState("ㅤ");
    const [msgNewPassword, setMsgNewPassword] = useState("ㅤ");
    const [msgConfirmPassword, setMsgConfirmPassword] = useState("ㅤ");
    const [msgFirstname, setMsgFirstname] = useState("ㅤ");
    const [msgLastname, setMsgLastname] = useState("ㅤ");
    const [msgFile, setMsgFile] = useState("ㅤ");
    const [msgCheckPass, setMsgCheckPass] = useState("ㅤ");
    const [password, setPassword] = useState("");
    const [newpassword, setNewPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [image, setImage] = useState(null);
    const checkout = () => {
        return (
            password
        );
    };
    const getDataUser = () => {
        axios.post("http://localhost:5000/user/getuserbyusername", {
            username: username,
        },
            {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }).then((res) => {
                console.log(res);
                setDataUser(res.data[0]);
            }).catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        getDataUser();
    }, []);
    const hendleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        if (firstname !== "") {
            formData.append('fname', firstname);
        } else {
            formData.append('fname', dataUser.fname);
        }
        if (lastname !== "") {
            formData.append('lname', lastname);
        } else {
            formData.append('lname', dataUser.lname);
        }
        if (image) {
            formData.append("image", image);
        } else {
            formData.append("image", dataUser.image);
        }
        if (newpassword === confirmpassword) {
            axios
                .put("http://localhost:5000/user/update", formData, {
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    console.log(res);
                    if (res.data.Status === false) {
                        setMsgCheckPass("รหัสผ่านไม่ถูกต้อง!!");
                        return Swal.fire({
                            icon: "error",
                            text: "รหัสผ่านไม่ถูกต้อง!!",
                        });
                    } else {
                        window.location.reload(false);
                        Swal.fire({
                            icon: "success",
                            text: "แก้ไขข้อมูลเสร็จสิ้น!!",
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            setMsgCheckPass("กรุณากรอกรหัสผ่านทั้ง 2 ช่อง ให้ตรงกัน!!");
        }
    };
    const Logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("LogedIn");
        localStorage.removeItem("username");
        return nav("/");
    };
    const inputpassword = (e) => {
        const value = e.target.value;
        const regex = /^[A-Za-z0-9]{6,}$/;
        const regex1 = /^(?!.*(012345|123456|234567|345678|456789|567890|678901|789012|890123|901234|abcde|bcdef|cdefg|defgh|efghi|fghij|ghijk|hijkl|ijklm|jklmn|klmno|lmnop|mnopq|nopqr|opqrs|pqrst|qrstu|rstuv|stuvw|tuvwx|uvwxy|vwxyz|ABCDE|BCDEF|CDEFG|DEFGH|EFGHI|FGHIJ|GHIJK|HIJKL|IJKLM|JKLMN|KLMNO|LMNOP|MNOPQ|NOPQR|OPQRS|PQRST|QRSTU|RSTUV|STUVW|TUVWX|UVWXY|VWXYZ)).{6,}$/;
        if (value !== '') {
            if (regex.test(value)) {
                if (regex1.test(value)) {
                    setPassword(value);
                    return setMsgPassword("ㅤ");
                } else {
                    return setMsgPassword("รหัสผ่านต้องไม่เรียงกัน เช่น abcdef, 123456 เป็นต้น");
                }
            } else {
                return setMsgPassword("กรุณาใช้ A-Z, a-z, 0-9 และความยาวตัวอักษร 6 ตัวขึ้นไป");
            }
        } else {
            setMsgPassword("ㅤ");
        }
    };
    const inputnewpassword = (e) => {
        const value = e.target.value;
        const regex = /^[A-Za-z0-9]{6,}$/;
        const regex1 = /^(?!.*(012345|123456|234567|345678|456789|567890|678901|789012|890123|901234|abcde|bcdef|cdefg|defgh|efghi|fghij|ghijk|hijkl|ijklm|jklmn|klmno|lmnop|mnopq|nopqr|opqrs|pqrst|qrstu|rstuv|stuvw|tuvwx|uvwxy|vwxyz|ABCDE|BCDEF|CDEFG|DEFGH|EFGHI|FGHIJ|GHIJK|HIJKL|IJKLM|JKLMN|KLMNO|LMNOP|MNOPQ|NOPQR|OPQRS|PQRST|QRSTU|RSTUV|STUVW|TUVWX|UVWXY|VWXYZ)).{6,}$/;
        if (value !== '') {
            if (regex.test(value)) {
                if (regex1.test(value)) {
                    setNewPassword(value);
                    return setMsgNewPassword("ㅤ");
                } else {
                    return setMsgNewPassword("รหัสผ่านต้องไม่เรียงกัน เช่น abcdef, 123456 เป็นต้น");
                }
            } else {
                return setMsgNewPassword("กรุณาใช้ A-Z, a-z, 0-9 และความยาวตัวอักษร 6 ตัวขึ้นไป");
            }
        } else {
            setMsgNewPassword("ㅤ");
        }
    };
    const inputconfirmpassword = (e) => {
        const value = e.target.value;
        const regex = /^[A-Za-z0-9]{6,}$/;
        const regex1 = /^(?!.*(012345|123456|234567|345678|456789|567890|678901|789012|890123|901234|abcde|bcdef|cdefg|defgh|efghi|fghij|ghijk|hijkl|ijklm|jklmn|klmno|lmnop|mnopq|nopqr|opqrs|pqrst|qrstu|rstuv|stuvw|tuvwx|uvwxy|vwxyz|ABCDE|BCDEF|CDEFG|DEFGH|EFGHI|FGHIJ|GHIJK|HIJKL|IJKLM|JKLMN|KLMNO|LMNOP|MNOPQ|NOPQR|OPQRS|PQRST|QRSTU|RSTUV|STUVW|TUVWX|UVWXY|VWXYZ)).{6,}$/;
        if (value !== '') {
            if (regex.test(value)) {
                if (regex1.test(value)) {
                    setConfirmPassword(value);
                    return setMsgConfirmPassword("ㅤ");
                } else {
                    return setMsgConfirmPassword("รหัสผ่านต้องไม่เรียงกัน เช่น abcdef, 123456 เป็นต้น");
                }
            } else {
                return setMsgConfirmPassword("กรุณาใช้ A-Z, a-z, 0-9 และความยาวตัวอักษร 6 ตัวขึ้นไป");
            }
        } else {
            setMsgConfirmPassword("ㅤ");
        }
    };
    const inputfirstname = (e) => {
        const value = e.target.value;
        const regex = /^[\u0E00-\u0E7FA-Za-z]{0,60}$/;
        if (value !== '') {
            if (regex.test(value)) {
                setFirstname(value);
                return setMsgFirstname("ㅤ");
            } else {
                return setMsgFirstname(`กรุณาใช้ภาษาไทยหรืออังกฤษเท่านั้น`);
            }
        } else {
            return setMsgFirstname("ㅤ");
        }
    };
    const inputlastname = (e) => {
        const value = e.target.value;
        const regex = /^[\u0E00-\u0E7FA-Za-z]{0,60}$/;
        if (value !== '') {
            if (regex.test(value)) {
                setLastname(value);
                return setMsgLastname("ㅤ");
            } else {
                return setMsgLastname(`กรุณาใช้ภาษาไทยหรืออังกฤษเท่านั้น`);
            }
        } else {
            return setMsgLastname("ㅤ");
        }
    };
    const inputimage = (e) => {
        const file = e.target.files[0];
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/bmp"];
        const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
        if (file) {
            if (allowedTypes.includes(file.type)) {
                if (file.size <= maxSizeInBytes) {
                    setImage(file);
                    return setMsgFile("ㅤ");
                } else {
                    return setMsgFile("ขนาดไฟล์เกิน 5 MB");
                }
            } else {
                return setMsgFile("รูปภาพต้องเป็นไฟล์ .jpg, .jpeg, .png, .bmp เท่านั้น");
            }
        }
    };

    return (
        <div>
            <div className='flex justify-between  text-4xl text-black bg-gray-300 px-5 py-5'>
                <div></div>
                <div className="ml-20 ">Profile</div>
                <div>
                    <button onClick={Logout} className="w-20 text-black px-5 bg-red-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Logout</button>
                </div>
            </div>
            <div className='flex justify-center flex-col items-center'>
                <h1 className='text-center text-xl pt-6 mb-5'>โปรไฟล์ผู้ใช้งาน</h1>
                <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow'>
                    <div>
                        <img className="rounded-3xl" src={`http://localhost:5000/image/${dataUser.image}`} alt="profile" />
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Image</label>
                        <input onChange={inputimage} type="file" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                        <p className='text-red-600 text-xs'>{msgFile}</p>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " readOnly value={dataUser.username} />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Firstname</label>
                        <input onChange={inputfirstname} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder={dataUser.fname} />
                        <div>
                            <p className='text-red-600 text-xs'>{msgFirstname}</p>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Lastname</label>
                        <input onChange={inputlastname} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder={dataUser.lname} />
                        <div>
                            <p className='text-red-600 text-xs'>{msgLastname}</p>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                        <input onChange={inputpassword} type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                        <div>
                            <p className='text-red-600 text-xs'>{msgPassword}</p>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">New Password</label>
                        <input onChange={inputnewpassword} type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                        <div>
                            <p className='text-red-600 text-xs'>{msgNewPassword}</p>
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Confirm New Password</label>
                        <input onChange={inputconfirmpassword} type="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                        <div>
                            <p className='text-red-600 text-xs'>{msgConfirmPassword}</p>
                        </div>
                    </div>
                    <div>
                        <p className='text-red-600 text-xs mb-4'>{msgCheckPass}</p>
                    </div>
                    <button disabled={!checkout()} onClick={hendleSubmit} type="editprofile" className="w-full text-black bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Edit Profile</button>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;