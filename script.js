const SpeechRecognize = window.SpeechRecognition || window.webkitSpeechRecognition; /* ตรวจเช็ค Browser ว่ารองรับรูปแบบ Speech Recognition แบบใด */

const recognize = new SpeechRecognize();  // สร้างตัวแปรเก็บเสียง
const btn = document.querySelector('.control'); // สร้างตัวแปรสำหรับควบคุม

function recordVoice() { // ตรวจเช็คสถานะปุ่ม
    const isRecord = btn.classList.contains('record');


    // เงื่อนไขเปลี่ยนสีปุ่มและข้อความ
    if (isRecord) {
        recognize.start(); // เริ่มอัด
        btn.classList.remove('record'); // เอา record ออก
        btn.classList.add('pause'); // ใส่ pause เข้าไป
        btn.innerText = "Pause"; // แสดงข้อความ Pause ในปุ่ม 
    } else {  // สลับกันกับ if
        recognize.stop();
        btn.classList.remove('pause');
        btn.classList.add('record');
        btn.innerText = "Record";
    }
}
function setVoicetoText(e) {
    let message = document.querySelector('.message'); // รับค่าจาก class message 
    message.innerText += e.results[0][0].transcript; // ดึงค่าจาก transcript มาแสดงผล
}

// สร้างฟัก์ชันให้รับเสียงได้ต่อเนื่อง
function continueRecord() {
    const isPause = btn.classList.contains('pause');  

    if (isPause) {  
        recognize.start();
    }
}

function setUpVoice() {
    recognize.lang = "th-TH"; // set ให้ ภาษาไทยเป็นภาษาเริ่มต้นในการรับค่า
    btn.addEventListener('click', recordVoice); // รับค่าจากการคลิ๊กเมาส์
    recognize.addEventListener('result', setVoicetoText); // รับค่าจากฟังก์ชัน 
    recognize.addEventListener('end', continueRecord); // รับค่าจากฟังก์ชัน 
}

setUpVoice();