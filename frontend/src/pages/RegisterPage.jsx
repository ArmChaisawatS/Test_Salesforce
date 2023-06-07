import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function RegisterPage() {
    const [msgUser, setMsgUser] = useState("ㅤ");
    const [msgPassword, setMsgPassword] = useState("ㅤ");
    const [msgFirstname, setMsgFirstname] = useState("ㅤ");
    const [msgLastname, setMsgLastname] = useState("ㅤ");
    const [msgFile, setMsgFile] = useState("ㅤ");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [image, setImage] = useState(null);
    const nav = useNavigate();
    const checkout = () => {
        return (
            username &&
            password &&
            firstname &&
            lastname &&
            image
        );
    };
    const submitDB = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('fname', firstname);
        formData.append('lname', lastname);
        formData.append('image', image);
        axios.post("http://localhost:5000/user/register", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        }).then((res) => {
            console.log(res);
            if (res.data.Status === false) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Register failed',
                    showConfirmButton: false,
                    timer: 1500
                });
                return setMsgUser("username ถูกใช้งานไปแล้วกรุณาใช้ username อื่น");
            } else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Register Success',
                    showConfirmButton: false,
                    timer: 1500
                });
                return nav("/");
            }
        }).catch((err) => { console.log(err); });
    };
    const inputusername = (e) => {
        const value = e.target.value;
        const regex = /^[A-Za-z0-9_]{4,12}$/;
        if (value !== '') {
            if (regex.test(value)) {
                setUsername(value);
                return setMsgUser("ㅤ");
            } else {
                return setMsgUser(`กรุณาใช้ A-Z, a-z, 0-9, _ และความยาวตัวอักษร 4-12`);
            }
        } else {
            return setMsgUser("ㅤ");
        }
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
            <div className='flex justify-center text-4xl text-black bg-gray-300 py-5'>
                Register
            </div>
            <div className='flex justify-center flex-col items-center'>
                <h1 className='text-center text-xl pt-6 mb-5'>สมัครสมาชิก</h1>
                <div className='block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow'>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                            <input onChange={inputusername} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="username" />
                            <div>
                                <p className='text-red-600 text-xs'>{msgUser}</p>
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
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Firstname</label>
                            <input onChange={inputfirstname} type="text" placeholder="enter your firstname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                            <div>
                                <p className='text-red-600 text-xs'>{msgFirstname}</p>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Lastname</label>
                            <input onChange={inputlastname} type="text" placeholder="enter your lastname" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                            <div>
                                <p className='text-red-600 text-xs'>{msgLastname}</p>
                            </div>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Image</label>
                            <input onChange={inputimage} type="file" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " />
                            <p className='text-red-600 text-xs'>{msgFile}</p>
                        </div>
                        <button disabled={!checkout()} onClick={submitDB} type="submit" className="w-full text-black bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Sign up</button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default RegisterPage;