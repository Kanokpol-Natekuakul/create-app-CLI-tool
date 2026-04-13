<div align="center">
  <h1>🚀 create-app</h1>
  <p><strong>CLI Tool จัดการโปรเจคอัจฉริยะ — ร่นเวลา Setup โปรเจคจาก 30 นาทีเหลือแค่ 3 วินาที! ⚡</strong></p>
</div>

---

## 🔥 ฟีเจอร์เด่น (Premium Developer Experience)

- 🧠 **Smart Template Engine**: มี Engine เขียนขึ้นเอง รองรับตัวแปร, ลูป, เงื่อนไขแบบ Handlebars และ Syntax แบกกันชนพิเศษสำหรับ React/Vue (`{/* tpl:var */}`)
- 🎨 **Beautiful UI**: ตัวหนังสือไล่สี Gradient พร้อมกรอบตอบโต้สวยงาม และแอนิเมชันตอนโหลดโปรเจค พรีเมียมสุดๆ!
- 📦 **Multi-Package Manager**: เลือกลง Dependency ด้วย `npm`, `yarn`, `pnpm` หรือความเร็วแสงแบบ `bun` ได้ดั่งใจ (`--pm`)
- 🐙 **Auto Git**: สั่ง `git init` และเขียน `Initial commit` พร้อมไฟล์ `.gitignore` ให้อัตโนมัติ (`--git`)
- 💻 **Auto Editor**: สร้างเสร็จปุ๊บ เปิด VSCode ลุยโค้ดต่อปั๊บ (`--open`)
- 🧩 **Modular Add-ons**: เลือกติดตั้ง Tailwind, ESLint, Prettier แยกกันได้ หรือจะมัดรวมกันก็ไม่มีปัญหา
- 🦕 **TypeScript First**: สั่งเปิดใช้งาน TypeScript (`--ts`) แปลงไฟล์จาก `.jsx/.js` เป็น `.tsx/.ts` ให้ทันที ไม่ต้องทำ Template ซ้ำซ้อน!
- 🐳 **Docker Ready**: สั่ง `--docker` เพื่อปลุกเสก `Dockerfile` และ `docker-compose.yml` เอาไปรันขึ้น Server ได้เลย
- 🐶 **Husky & Lint-Staged**: ผูก Git Hook ล็อคความสะอาดของโค้ดก่อน Commit ด้วย `--husky`

---

## 📦 ติดตั้งใช้งาน

โคลนโปรเจคนี้ลงเครื่อง แล้วทำเป็น Global Command ได้เลย ง่ายกว่านี้ไม่มีแล้ว:

```bash
# 1. เข้าไปที่โฟลเดอร์โปรเจค
cd path/to/project

# 2. Install dependencies ของ CLI
npm install

# 3. Link เป็น global command
npm link
```

เสร็จแล้ว! ตอนนี้คุณสามารถเรียกคำสั่ง `create-app` ได้จาก **ทุกที่หนในคอมพิวเตอร์ของคุณ** ✅

---

## 🎯 วิธีใช้งาน

### 🕹️ แบบ Interactive Mode (ตอบคำถามรัวๆ)

เหมาะสำหรับคนขี้เกียจจำคำสั่ง พิมพ์แค่นี้จบ:

```bash
create-app
```
ระบบจะมี UI สวยๆ เด้งมาให้เลือกเลย:
1. ตั้งชื่อโปรเจค
2. เลือก Framework/Stack (React, Vue, Node)
3. เลือกลูกเล่นต่างๆ (TS, Tailwind, Linter, Docker, Husky)
4. เลือก Package Manager ตัวโปรด (npm, yarn, pnpm, bun)
5. กดตกลง เปิด VSCode 🚀

### ⚡ แบบ Fast Mode (ใส่ Flags ให้ครบจบในบรรทัดเดียว)

```bash
create-app <ชื่อโปรเจค> [flags]
```

**ตัวอย่างสุดโหด (เอาทุกอย่าง):**
```bash
create-app my-epic-app --react --ts --tailwind --eslint --prettier --git --docker --husky --pm bun --open
```

**ตัวอย่างประหยัดเวลา:**
```bash
# Node.js API + Docker
create-app my-api --node --docker --pm yarn

# Vue 3 แบบไวๆ เปิด VSCode เลย
create-app my-vue-app --vue --open
```

---

## 📋 แฟล็กทั้งหมดที่รองรับ (Stacks & Add-ons)

### Stacks (เลือกได้ 1 อย่าง)
| Flag       | Framework            | รายละเอียด           |
|------------|--------------------|----------------------|
| `--react`  | React + Vite       | SPA, JSX, Hot Reload |
| `--vue`    | Vue + Vite         | SFC, Hot Reload      |
| `--node`   | Node.js + Express  | REST API, CORS, dotenv |

### Add-ons (ใส่ได้รัวๆ)
| Flag         | Add-on       | รายละเอียด                  |
|--------------|--------------|----------------------------|
| `--ts`       | TypeScript   | เปลี่ยนเป็นโปรเจค TS อัตโนมัติ (`.tsx`, `tsconfig`) |
| `--tailwind` | Tailwind CSS | Utility-first CSS framework |
| `--eslint`   | ESLint       | จับบั๊กตัวอักษรผิด (ปรับ Rule ตาม Stack) |
| `--prettier` | Prettier     | Code formatting สวยงาม |
| `--docker`   | Docker       | สร้าง `Dockerfile` และ Compose |
| `--husky`    | Husky        | จัดการ Pre-commit Hooks (จัดระเบียบโค้ดก่อน git push) |

### Options อรรถประโยชน์
| Flag           | รายละเอียด           |
|----------------|----------------------|
| `--git`        | `git init` + `git commit` ปฐมฤกษ์ |
| `--pm <name>`  | เปลี่ยน Package Manager (`npm`, `yarn`, `pnpm`, `bun`)|
| `--open`       | หลังติดตั้งเสร็จ สั่ง `code .` เปิด VSCode ให้เลย |
| `--no-install` | ข้ามการลง Dependency (สร้างแค่ไฟล์เฉยๆ) |

---

## 🔧 โครงสร้างโปรเจคของ CLI นี้

```text
CLI/
├── bin/create-app.js             ← Entry point สำหรับคำสั่ง
├── src/
│   ├── cli.js                    ← มันสมอง! ประมวลผลแฟล็ก & สั่งการ
│   ├── engine/templateEngine.js  ← ❤️ หัวใจหลัก: ระบบแปลงตัวแปลขั้นเทพ
│   ├── generator/scaffolder.js   ← ประกอบร่างก๊อปปี้ไฟล์
│   ├── installer/installer.js    ← อนิเมชันปิงปอง + npm runner
│   ├── installer/git.js          ← Auto Git module
│   ├── addons/                   ← รวมของเล่น! TS, Tailwind, Docker, Husky ฯลฯ
│   └── utils/logger.js           ← ระบบแต่งสี UI แสนจะละมุน
├── templates/
│   ├── react/                    ← โครงร่าง React
│   ├── vue/                      ← โครงร่าง Vue
│   └── node/                     ← โครงร่าง Node.js
└── package.json
```
