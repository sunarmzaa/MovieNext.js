# เว็บ Next.js รับข้อมูลผ่าน Endpoint 
 เทคโนโลยีที่ใช้ node + next/reactjs ข้อดีคือ SEO friendly และตอบสนองแบบ Single Page Application โดยไม่ข้อ refresh หน้า

## หลักการสำคัญ
1. จ่ายข้อมูล json จาก database ผ่าน node.js ที่อยู่ใน folder ที่ชื่อ server แบบไม่ใช้โครงสร้าง Next.js ที่มีใน folder pages/api/

script จะรันตามข้อมูลด้านล่าง...เวลาสร้าง localhost:3000

```javascript
"scripts": {
  "dev": "node server/index.js",
}
```
2. จ่ายข้อมูล json แบบโครงสร้าง Next.js โดยผ่าน folder pages/api/v1/posts.js เป็นต้น url ตัวอย่างจะได้ http://localhost/api/v1/posts
3. folder ชื่อ actions/index.js ทำหน้าที่ฟังชั่นใช้งานกับหน้าต่างๆ เช่น อยากดึงก็ import { getPosts } from '../actions' แล้ว map ข้อมูลปกติ
4. Next.js สะดวกเวลารับพารามิเตอร์บน url  

```javascript
static async getInitialProps({ query }) {
  const movie = await getMoviesById(query.id)
  return { movie }
}
```
5. ภายใต้แบรนด์ Next.js ไม่ต้องกังวล Router และการบริการไฟล์อื่นๆ เช่น next/router, next/link, next/image เป็นต้น 
