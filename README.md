<div align="center">
  <h1>🚀 create-pol-app</h1>
  <p><strong>สุดยอด CLI Tool จัดการโปรเจคอัจฉริยะ — เปลี่ยนเวลา Setup โปรเจคจากครึ่งชั่วโมง ให้พุ่งพรวดเหลือ 3 วินาที! ⚡</strong></p>
  <img src="https://img.shields.io/npm/v/create-pol-app?color=purple&label=npm" alt="npm package" />
  <img src="https://img.shields.io/badge/license-MIT-green.svg" alt="License MIT" />
</div>

---

## 🔥 ฟีเจอร์เด่น (Developer Experience)

- 🧠 **Smart Template Engine**: มี Engine เขียนขึ้นเอง รองรับตัวแปร, ลูป, เงื่อนไขแบบ Handlebars และ Syntax แบกกันชนพิเศษสำหรับ React/Vue (`{/* tpl:var */}`)
- 🎨 **Beautiful UI**: ตัวหนังสือไล่สี Gradient พร้อมกรอบตอบโต้สวยงาม และแอนิเมชันตอนโหลดโปรเจค พรีเมียมสุดๆ!
- 🏗️ **Monorepo Architecture**: รองรับการระเบิดร่างสร้างโฟลเดอร์ Backend/Frontend พร้อมกันด้วยเทคโนโลยี NPM Workspaces (`--fullstack`)
- 📦 **Multi-Package Manager**: เลือกลง Dependency ด้วย `npm`, `yarn`, `pnpm` หรือวิ่งผ่านความเร็วแสงแบบ `bun` ได้ดั่งใจ (`--pm`)
- 🧩 **Modular Add-ons มหาศาล**: เลือกรวมร่างฟีเจอร์ที่คุณอยากได้ ทั้ง Routing, Store, ORM หรือ Testing ได้อย่างอิสระ
- 🦕 **TypeScript First**: สั่งเปิดใช้งาน TypeScript (`--ts`) แปลงโครงสร้างโค้ดเป็น `.tsx/.ts` ให้ทันที!
- 🔍 **Dry Run Preview**: ดูรายการไฟล์ทั้งหมดก่อนสร้างจริง ด้วย `--dry-run` ไม่ต้องกลัวพลาด!
- 🔔 **Update Notifier**: แจ้งเตือนให้อัปเดตเวอร์ชันใหม่อัตโนมัติทุกครั้งที่รัน

---

## � ติดตั้งและใช้งานทันที (ผ่าน NPM)

ไม่ต้อง Clone โปรเจค แค่พิมพ์คำสั่งเดียวใน Terminal:
```bash
npx create-pol-app@latest my-app
```
(หรือพิมพ์ `npx create-pol-app` เฉยๆ ก็ได้ โปรแกรมจะป็อปอัพ UI ถามโต้ตอบให้เอง)

---

## 🎯 วิธีใช้งาน

### 🕹️ แบบ Interactive Mode (ตอบคำถามรัวๆ)
สำหรับคนขี้เกียจจำคำสั่ง พิมพ์แค่นี้จบ:
```bash
npx create-pol-app
```
จากนั้นระบบจะเด้งเมนูให้เลือก:
1. ตั้งชื่อโปรเจค
2. เลือก Framework (React, Vue, Node.js หรือ Fullstack Monorepo)
3. เลือกลูกเล่นเสริม (Tailwind, Zustand, Prisma, React Router ฯลฯ)
4. เลือก Package Manager ตัวโปรด
5. กดตกลง เปิด VSCode ลุยโค้ดได้เลย 🚀

### ⚡ แบบ Fast Mode (ใส่ Flags ให้ครบจบในบรรทัดเดียว)
```bash
npx create-pol-app <ชื่อโปรเจค> [flags]
```

**🔥 ตัวอย่างระดับเทพ (Frontend เต็มยศ):**
```bash
npx create-pol-app epic-frontend --react --ts --router --store --tailwind --test
```

**☁️ ตัวอย่างระดับเทพ (Backend API สกิลบอส):**
```bash
npx create-pol-app my-api --node --ts --prisma --eslint --docker --ci --env
```

**🏰 ตัวอย่างระดับตำนาน (Fullstack Monorepo พร้อบครบ):**
```bash
npx create-pol-app my-monorepo --fullstack --pm pnpm --open
```

---

## 📋 แฟล็กทั้งหมดที่รองรับ (Stacks & Add-ons)

### 🚀 Stacks (หัวใจหลัก - เลือกได้ 1 อย่าง หรือใช้ Fullstack)
| Flag         | Framework            | รายละเอียด           |
|--------------|--------------------|----------------------|
| `--react`    | React + Vite       | SPA, JSX, Hot Reload |
| `--vue`      | Vue + Vite         | SFC, Hot Reload      |
| `--node`     | Node.js + Express  | REST API, CORS, dotenv |
| `--fullstack`| Monorepo + Workspaces| สร้าง Root Workspace คลุม Frontend (React/Vue) และ Backend (Node.js) ไว้ใต้โฟลเดอร์ร่มเดียวกัน! |

### 🧩 Add-ons ตัวจบงาน (ใส่ได้รัวๆ)
| Flag         | ฟีเจอร์หลัก       | รายละเอียด                  |
|--------------|--------------|----------------------------|
| `--router`   | Routing      | วางระบบเปลี่ยนหน้าเว็บอัตโนมัติ (React Router DOM / Vue Router) แถมหน้า Home / About |
| `--store`    | Store / State | วางระบบแชร์ข้อมูลข้ามหน้าจอ (Zustand สำหรับ React / Pinia สำหรับ Vue) |
| `--prisma`   | Prisma ORM   | จัดการฐานข้อมูล (SQLite พร้อมปั้นให้) และสคริปต์ db:push สำหรับโหมด Backend |
| `--test`     | Testing Framework | ติดตั้ง Vitest / Testing Library คลุมสคริปต์จับบั๊กคอมโพเนนต์ |
| `--ci`       | GitHub Actions | สร้างไฟล์ `ci.yml` จัดการ Build/Lint/Test อัตโนมัติทุกครั้งที่ Push |
| `--tailwind` | Tailwind CSS | Utility-first CSS framework มาแรงสุดในยุคนี้ |
| `--eslint`   | ESLint       | จัดการ Rule ดักโค้ดพังก่อนเพื่อนร่วมทีมมาเห็น |
| `--prettier` | Prettier     | ฟอร์แมตโค้ดจัดหน้าสวยงามในปุ่มเดียว |
| `--docker`   | Docker       | เสก `Dockerfile` และ `docker-compose.yml` พร้อมขึ้นคลาวด์ |
| `--husky`    | Husky / Lint-Staged| สั่งตรวจความเรียบร้อยของโค้ดก่อนใครจะกด Git Commit โค้ดเน่าๆ |
| `--env`      | Environment Vars | สร้างไฟล์ `.env.example` อัตโนมัติ (JWT Secret สุ่มให้ + ค่า VITE_ สำหรับ Frontend) |

### 🛠 Tools / Options อรรถประโยชน์
| Flag           | รายละเอียด           |
|----------------|----------------------|
| `--ts`         | เปิดโหมด TypeScript (ใช้คู่ได้กับทุก Framework สร้างเป็น `.tsx/.ts` ทันที) |
| `--pm <name>`  | ล็อคเป้า Package Manager (มีให้เลือก `npm`, `yarn`, `pnpm`, `bun`) |
| `--git`        | สั่งรัน `git init` และเขียน Initial commit ผูกโปรเจคอัตโนมัติ |
| `--open`       | สร้างเสร็จสั่งยิงโชว์บน Visual Studio Code ขึ้นมาเลย |
| `--no-install` | สั่งให้ระบบ "ข้ามขั้นตอนโหลด npm install" ไปก่อน (ใช้เทสไวๆ) |
| `--dry-run`  | แสดงรายการไฟล์ที่จะถูกสร้าง โดยไม่สร้างจริง (ใช้ตรวจสอบก่อนตัดสินใจ) |

---

<div align="center">
  <p>Made with ❤️ for Developers</p>
</div>
