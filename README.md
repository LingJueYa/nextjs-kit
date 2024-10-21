# Next.js 开发套件

这是一个功能丰富的 Next.js 开发套件,集成了多种常用工具和库,旨在提高开发效率。

## 主要特性

- 使用 TypeScript 进行类型安全的开发
- 采用 TailwindCSS 进行快速样式设计
- 集成 Shadcn UI 组件库
- 使用 Prisma ORM 进行数据库操作
- 集成 OpenAI API 支持
- 使用 Next-auth 进行身份验证和用户管理
- 表单处理使用 React Hook Form
- 日期国际化支持 (internationalized/date)
- 使用 Valtio 进行状态管理
- 集成 Resend 用于邮件发送
- 引入 usehooks-ts 和 ahooks 实用 hooks
- 使用 Zod 进行数据验证
- 集成 AWS S3 SDK 用于文件存储
- 使用 React Query 进行数据获取和缓存

## 安装

```bash
npm install
# 或
yarn install
```

## Prisma 数据库操作

### 初始化 Prisma

```bash
npx prisma init
```

### 生成 Prisma 客户端

```bash
npx prisma generate
```

### 创建数据库迁移

在修改 schema 后使用:

```bash
npx prisma migrate dev --name <migration-name>
```

### 推送架构更改到数据库

仅用于开发环境,不创建迁移记录:

```bash
 sudo npx prisma db push
```

### 查看数据库内容

```bash
npx prisma studio
```

### 格式化 schema 文件

```bash
npx prisma format
```

## 开发

```bash
npm run dev
# 或
yarn dev
```

## 构建

```bash
npm run build
# 或
yarn build
```

## 部署

详细的部署说明请参考 [Next.js 部署文档](https://nextjs.org/docs/deployment)。

## 贡献

欢迎提交 issues 和 pull requests 来改进这个开发套件。

## 许可证

[MIT](LICENSE)

