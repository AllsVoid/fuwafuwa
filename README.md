## 项目说明

这是基于 [Fuwari](https://github.com/saicaca/fuwari) 二次定制的个人博客

本 README 仅说明在原 Fuwari 基础上本仓库做的**主要修改和新增功能**，方便以后升级、迁移或排查问题时参考。

---

## 站点配置（`src/config.ts`）

站点的基础信息和主题行为通过 `src/config.ts` 进行配置，类型定义位于 `src/types/config.ts`。

### `siteConfig`

重要字段说明：

- **基本信息**
  - `title`: 站点标题
  - `subtitle`: 副标题
  - `lang`: 站点语言（例如 `"zh_CN"`）
- **Live Photo**
  - `livephoto?: boolean`
    - 控制是否启用 LivePhotosKit 相关逻辑，配合自定义的 `::img` / Live Photo 支持使用。
- **主题色**
  - `themeColor.hue: number`
  - `themeColor.fixed: boolean`

### 新增：全局亚克力强度 `acrylic`

- 位置：`siteConfig.acrylic?: number`
- 含义：控制卡片与浮动面板的“亚克力”效果强度，取值范围 **0 ~ 1**：
  - `0`：不启用（与原始 Fuwari 接近，无模糊，纯色卡片）
  - `1`：最高强度的亚克力效果
  - 推荐使用 `0.xx` 做细调，例如：

```ts
export const siteConfig: SiteConfig = {
  // ...
  acrylic: 0.8,
};
```

实现方式（简述）：

- 在 `Layout.astro` 中将 `acrylic` 注入为全局 CSS 变量 `--acrylic-strength`。
- 在 `src/styles/main.css` 中对以下类增加了 `backdrop-filter` 与透明度混合：
  - `.card-base`：文章卡片、侧边栏卡片等
  - `.float-panel`：顶部设置面板、搜索面板等

> 如需完全关闭亚克力效果，将 `acrylic` 设为 `0` 即可。

### 新增：Banner 滚动行为 `fixedBanner`

- 位置：`siteConfig.fixedBanner?: boolean`
- 语义：
  - `true`（默认）：**当前行为**，Banner 是页面顶部的一块区域，随页面滚动，很快会被内容“顶出视口”。
  - `false`：**背景模式**，Banner 作为一张**固定在视口后面的背景图**，页面滚动时背景图一直在后面显示。

示例：

```ts
export const siteConfig: SiteConfig = {
  // ...
  fixedBanner: false, // 背景图固定在后面
};
```

实现方式（简述）：

- 在 `Layout.astro` 中根据 `fixedBanner` 给 `<body>` 添加 `banner-bg` 类。
- 在同文件底部的全局样式中，对 `.banner-bg #banner-wrapper` / `.banner-bg #banner` 施加：
  - `position: fixed; inset: 0; height: 100vh;` 等，使 Banner 成为始终在后面的全屏背景。

### Banner 配置

- `siteConfig.banner.enable`: 是否启用 Banner。
- `siteConfig.banner.src`: Banner 图片相对路径，指向 `src/assets`，例如：

```ts
banner: {
  enable: true,
  src: "assets/images/demo-banner.png", // 对应 src/assets/images/demo-banner.png
  videoSrc: "",
  position: "center",
  credit: {
    enable: false,
    text: "",
    url: "",
  },
},
```

---

## 图片使用约定与 `ImageWrapper`

项目中统一通过 `src/components/misc/ImageWrapper.astro` 来处理图片：

- 自动区分以下几类路径：
  - **public 下的静态资源**：以 `/` 开头，例如 `/assets/avatar.png`
  - **`src/assets` 下的资源**：相对路径，例如 `assets/images/demo-avatar.png`
- 对于 `src/assets` 下的资源，使用 `import.meta.glob` 进行动态导入，并结合 `astro:assets` 的 `Image` 组件进行优化。

---

## Live Photo 与自定义图片指令

项目扩展了 Fuwari 的图片能力，用于：

- 在 Markdown 中通过指令控制图片尺寸。
- 支持 Live Photo（静态图 + 视频）。

### Markdown 指令示例（见 `src/content/posts/img-rehype-test.md`）

```markdown
:::img{src="/src/assets/images/demo-banner.png" alt="有 size 的 M 图" size="M"}

:::img{src="/src/assets/images/demo-banner.png" alt="无 size，退化为普通 img"}

:::img{src="/livephoto/IMG_8723.JPEG" alt="实况测试" video="/livephoto/IMG_8723.MOV"}
```

实现相关逻辑主要在：

- `src/plugins/rehype-component-img-directive.mjs`
- `astro.config.mjs` 中的 `rehypeComponents` 配置。

---

## 运行与构建

基础命令与原 Fuwari 一致，例如：

```bash
pnpm install
pnpm dev    # 开发
pnpm build  # 构建
pnpm preview
```

如需升级上游 Fuwari 或调整这些自定义功能，建议先阅读：

- `src/config.ts`
- `src/types/config.ts`
- `src/layouts/Layout.astro`
- `src/styles/main.css`
- `src/components/misc/ImageWrapper.astro`
