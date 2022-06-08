# interviewTestNodeJS
run code: npm start


**API**
1. Tạo user(POST): http://localhost:5000/user/add
2. Tìm user bằng id (GET): http://localhost:5000/user/read?id=
3. Tìm users theo lastName. Sắp xếp giẩm dần theo firstName (GET): http://localhost:5000/user/search?name=
4. Tìm users gần userId nhất theo coordinate (GET) http://localhost:5000/user/locate?userId=&n=
5. Sửa thông tin user (PUT): http://localhost:5000/user/edit/:id
6. Xóa user (DELETE): http://localhost:5000/user/delete/:id
