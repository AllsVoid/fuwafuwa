---
title: Markdown Extended Features
published: 2024-05-01
updated: 2024-11-29
description: 'Read more about Markdown features in Fuwari'
image: ''
tags: [Demo, Example, Markdown, Fuwari]
category: 'Examples'
draft: false 
---

## GitHub Repository Cards
You can add dynamic cards that link to GitHub repositories, on page load, the repository information is pulled from the GitHub API. 

::github{repo="Fabrizz/MMM-OnSpotify"}

Create a GitHub repository card with the code `::github{repo="<owner>/<repo>"}`.

```markdown
::github{repo="saicaca/fuwari"}
```

## 图片尺寸指令 ::img

通过 `::img` 指令可以指定文章内图片的显示尺寸；不使用时，图片使用默认样式（由主题 prose 与 `.custom-md img` 控制）。

语法：`::img{src="图片路径" alt="描述" size="S|M|L"}`，其中 `size` 可选：

- **S**（小）：最大宽度约 40%
- **M**（中）：最大宽度约 65%
- **L**（大）：最大宽度 100%

也可写为 `small` / `medium` / `large`。`alt` 可选。

示例（将路径替换为你自己的图片）：

```markdown
::img{src="/images/example.jpg" alt="示例" size="S"}
::img{src="/images/example.jpg" size="M"}
::img{src="/images/example.jpg" alt="大图" size="L"}
```

普通 Markdown 图片 `![alt](url)` 不受影响，仍使用默认样式。

## Admonitions

Following types of admonitions are supported: `note` `tip` `important` `warning` `caution`

:::note
Highlights information that users should take into account, even when skimming.
:::

:::tip
Optional information to help a user be more successful.
:::

:::important
Crucial information necessary for users to succeed.
:::

:::warning
Critical content demanding immediate user attention due to potential risks.
:::

:::caution
Negative potential consequences of an action.
:::

### Basic Syntax

```markdown
:::note
Highlights information that users should take into account, even when skimming.
:::

:::tip
Optional information to help a user be more successful.
:::
```

### Custom Titles

The title of the admonition can be customized.

:::note[MY CUSTOM TITLE]
This is a note with a custom title.
:::

```markdown
:::note[MY CUSTOM TITLE]
This is a note with a custom title.
:::
```

### GitHub Syntax

> [!TIP]
> [The GitHub syntax](https://github.com/orgs/community/discussions/16925) is also supported.

```
> [!NOTE]
> The GitHub syntax is also supported.

> [!TIP]
> The GitHub syntax is also supported.
```

### Spoiler

You can add spoilers to your text. The text also supports **Markdown** syntax.

The content :spoiler[is hidden **ayyy**]!

```markdown
The content :spoiler[is hidden **ayyy**]!

```