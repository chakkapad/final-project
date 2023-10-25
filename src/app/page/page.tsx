"use client"; import React, { useState, useEffect } from "react";
import axios from "axios";
import './styles.css';

export default function App() {
    const [data, setData] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);

    useEffect(() => {
        axios
            .get("https://chakkapada.repl.co/products")
            .then((response) => {
                setData(response.data);
            });
    }, []);

    const textStyle = {
        fontSize: "24px",
        color: "black",
        margin: "30px 30px",
    };

    const handleSelect = (name) => {
        const selectedLocation = data.find((val) => val.name === name);

        const updatedComment = prompt("เพิ่มคอมเม้น:");
        if (updatedComment !== null) {
            selectedLocation.comment = updatedComment;

            // เพิ่มข้อมูลใน `selectedLocations`
            const updatedLocations = [...selectedLocations, selectedLocation];
            setSelectedLocations(updatedLocations);
        }
    };

    const handleEditComment = (name) => {
        const selectedLocation = selectedLocations.find((val) => val.name === name);
        if (selectedLocation) {
            const updatedComment = prompt("แก้ไขคอมเม้น:", selectedLocation.comment);
            if (updatedComment !== null) {
                // อัปเดตคอมเม้นของรายการที่คุณเลือก
                selectedLocation.comment = updatedComment;

                // สร้างรายการใหม่ที่ไม่ได้แก้ไข
                const updatedLocations = selectedLocations.map((location) => {
                    if (location.name === name) {
                        return selectedLocation;
                    }
                    return location;
                });

                // อัปเดต `selectedLocations` เพื่อใช้รายการใหม่
                setSelectedLocations(updatedLocations);
            }
        }
    };

    const handleDeleteLocation = (name) => {
        const selectedLocation = selectedLocations.find((val) => val.name === name);
        if (selectedLocation) {
            const updatedLocations = selectedLocations.filter((val) => val.name !== name);
            setSelectedLocations(updatedLocations);
        }
    };

    return (
        <div className="App">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous"></link>
            <div className="row">
                {data.map((val, idx) => (
                    <div key={idx} className="col">
                        <h3>{val.name}</h3>
                        <img src={val.Image} alt={val.name} />
                        <div className="image-text">
                            <p style={textStyle}>{val.company}</p>
                        </div>
                        <button onClick={() => handleSelect(val.name)}>เลือกสถานที่</button>
                    </div>
                ))}
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ลำดับ</th>
                        <th scope="col">ชื่อสถานที่</th>
                        <th scope="col">คอมเม้น</th>
                        <th scope="col">แก้ไข</th>
                        <th scope="col">ลบ</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedLocations.map((val, idx) => (
                        <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{val.name}</td>
                            <td>{val.comment}</td>
                            <td>
                                <button onClick={() => handleEditComment(val.name)}>แก้ไข</button>
                            </td>
                            <td>
                                <button onClick={() => handleDeleteLocation(val.name)}>ลบ</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
