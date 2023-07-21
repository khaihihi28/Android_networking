// khai báo package sử dụng
const express = require('express');
// thư viện đọc body request
const bodyParser = require('body-parser');
// thư viện quản lý resource
const cors = require('cors');
// thư viện kết nối database mysql
const mysql = require('mysql');
// sử dụng .env
require('dotenv').config();

// sử dụng express để dựng server nodejs
const app = express();
// sử dụng thư viện cors và bodyParser
app.use(cors({ origin: '*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// tạo connection tới mysql
const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // tuỳ mỗi máy - mặc định là 3306
    user: process.env.DB_USER, // tuỳ mỗi bạn (theo xampp) - thường mặc định là root
    password: process.env.DB_PASSWORD, // tuỳ máy mỗi người
    database: process.env.DB_NAME
});

// api upload ảnh
app.post('/upload', (req, res) => {
    // kiểm tra xem dữ liệu gửi lên đủ không
    if (!req.body.image
        || !req.body.title
        || !req.body.copyright
        || !req.body.date
        || !req.body.explaination) {
        res.json({ status: false, message: "Lack of information!" })
    } else {
        try {
            const image = req.body.image;
            const title = req.body.title;
            const copyright = req.body.copyright;
            const date = req.body.date;
            const explaination = req.body.explaination;

            // quert insert dữ liệu
            const sql = `INSERT INTO 
        ImageTable (title, image, copyright, date, explaination)
        VALUES
        ('${title}', '${image}', '${copyright}', '${date}', '${explaination}')`;
            conn.query(sql, (err, result) => {
                if (err) throw err;
                console.log("1 record has been inserted");
                res.json({ status: true, message: "1 record has been inserted" });
            });
        } catch (error) {
            res.json({ status: false, message: error });
        }
    }
});

// TODO: api /get-image
app.get('/get-image', (req, res) => {
    // TODO: tự làm
    app.get('/get-image', (req, res) => {
        try {
            // Query dữ liệu từ database
            const sql = "SELECT * FROM ImageTable";
            conn.query(sql, (err, result) => {
                if (err) throw err;

                // Gửi dữ liệu trả về client
                res.json(result);
            });
        } catch (error) {
            res.json({ status: false, message: error });
        }
    });
})

// TODO: api /delete-image
app.delete('/delete-image', (req, res) => {
    // TODO: tự làm
    try {
        const id = req.body.id; // Lấy ID hình ảnh cần xóa từ request body

        // Query xóa dữ liệu từ database
        const sql = `DELETE FROM ImageTable WHERE id = ${id}`;
        conn.query(sql, (err, result) => {
            if (err) throw err;

            // Kiểm tra xem có bản ghi nào bị xóa không
            if (result.affectedRows === 0) {
                res.json({ status: false, message: "Không tìm thấy ảnh muốn xóa!!!" });
            } else {
                res.json({ status: true, message: "Xóa ảnh thành công!!!" });
            }
        });
    } catch (error) {
        res.json({ status: false, message: error });
    }
})

// TODO: api /update-image
app.put('/update-image', (req, res) => {
    // TODO: tự làm
    try {
        const id = req.body.id; // Lấy ID hình ảnh cần cập nhật từ request body
        const newTitle = req.body.title; // Lấy thông tin cần cập nhật từ request body
        const newExplaination = req.body.explaination;

        // Query cập nhật dữ liệu trong database
        const sql = `UPDATE ImageTable SET title = '${newTitle}', explaination = '${newExplaination}' WHERE id = ${id}`;
        conn.query(sql, (err, result) => {
            if (err) throw err;

            // Kiểm tra xem có bản ghi nào bị cập nhật không
            if (result.affectedRows === 0) {
                res.json({ status: false, message: "Không tìm thấy ảnh cần update" });
            } else {
                res.json({ status: true, message: "Update ảnh thành công!!!" });
            }
        });
    } catch (error) {
        res.json({ status: false, message: error });
    }
})

// port server node chạy
const port = process.env.NODE_PORT;

app.listen(port, () => {
    console.log(`server is listening at http://localhost:${port}`);
})


