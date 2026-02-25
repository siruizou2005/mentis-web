# 教材帮手 — AI 教研资源平台

面向教师的公益 AI 教研资源平台官网，展示项目愿景、核心功能、适用场景与开发进度。

[English](./README.md)

## 技术栈

- **前端**：React 19 + TypeScript + Vite
- **动效**：Motion (Framer Motion 后继)
- **后端**：Node.js + Express
- **数据存储**：JSON 文件（服务器本地）

## 功能特性

- **首页 Hero**：项目愿景、四大方向卡片
- **核心亮点**：备课效率、教育公平、公益承诺
- **核心功能**：六大致力方向介绍
- **工作原理**：四步流水线说明
- **教材目录树**：可交互树形展示
- **适用人群**：四类教师画像
- **开发路线图**：Phase 01–04 里程碑
- **早期关注**：邮箱采集，存储至服务器本地

## 环境要求

- Node.js >= 18
- npm >= 9

## 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

| 命令 | 说明 |
|------|------|
| `npm run dev` | 仅启动前端（Vite），访问 http://localhost:5173 |
| `npm run server` | 仅启动后端 API，端口 3001 |
| `npm run dev:full` | 同时启动前端 + 后端，推荐 |

```bash
# 推荐：前端与后端一起运行
npm run dev:full
```

开发模式下，Vite 会将 `/api` 请求代理到 `http://localhost:3001`。

### 构建

```bash
npm run build
```

产物输出到 `dist/` 目录。

### 本地预览构建结果

```bash
npm run preview
```

### 代码检查

```bash
npm run lint
```

## 项目结构

```
├── public/              # 静态资源
├── server/              # 后端服务
│   ├── index.js         # Express 入口，邮箱采集 API
│   └── data/            # 数据目录（emails.json 自动生成）
├── src/
│   ├── components/      # 页面组件
│   │   ├── Navbar.tsx   # 导航栏
│   │   ├── Hero.tsx     # 首屏
│   │   ├── Highlights.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── TreeVisualization.tsx
│   │   ├── Personas.tsx
│   │   ├── Roadmap.tsx
│   │   ├── CTA.tsx      # 行动号召与邮箱表单
│   │   └── ParticleCanvas.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css        # 全局样式与 CSS 变量
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## 后端 API

### POST /api/early-access

早期关注邮箱采集接口。

**请求体：**

```json
{ "email": "user@example.com" }
```

**响应：**

成功：
```json
{ "ok": true }
```

失败：
```json
{ "ok": false, "message": "错误信息" }
```

**数据存储**：`server/data/emails.json`，格式示例：

```json
[
  { "email": "user@example.com", "timestamp": "2026-02-20T12:00:00.000Z" }
]
```

## 部署

### 方式一：静态站点 + 独立 API 服务

1. **前端**：`npm run build` 后，将 `dist/` 部署到 Nginx、Vercel、Netlify 等
2. **后端**：将 `server/` 部署到 Node 运行环境（如 VPS、Railway、Render），执行 `node server/index.js`
3. **跨域**：若前后端域名不同，需在前端将 API 请求指向后端地址，或通过 Nginx 反向代理统一域名

### 方式二：同一服务器

使用 Nginx 反向代理：

- `/` → 前端静态文件
- `/api` → 代理到 Node 服务（如 `http://127.0.0.1:3001`）

后端端口可通过环境变量配置：

```bash
PORT=3001 node server/index.js
```

## 声明

本平台「教材帮手」与天星教育旗下产品「天星教材帮」无任何关联，二者为独立项目。

## 许可证

Private.
