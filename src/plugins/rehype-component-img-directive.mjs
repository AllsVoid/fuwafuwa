/// <reference types="mdast" />
import { h } from "hastscript";

/** 支持的 size：S(小) / M(中) / L(大)，或 small / medium / large */
const SIZE_MAP = {
	S: "s",
	M: "m",
	L: "l",
	small: "s",
	medium: "m",
	large: "l",
};

/**
 * 处理文章中的 img 节点。
 * 仅当存在 size 属性时（即通过 ::img{...} 指令）才包裹并应用尺寸样式；
 * 普通 Markdown 图片无 size，直接返回原 img，使用默认样式。
 *
 * @param {Record<string, unknown> | undefined} properties - 节点属性（含 src, alt, size 等）
 * @param {import('mdast').RootContent[]} _children - 子节点（img 无子节点）
 * @returns {import('hast').Element} 原 img 或包裹后的 div
 */
export function ImgDirectiveComponent(properties, _children) {
	const props = properties ?? {};
	const sizeRaw = props.size;
	if (sizeRaw == null || sizeRaw === "") {
		// 普通图片：直接透传属性
		return h("img", props);
	}

	const size = SIZE_MAP[sizeRaw] ?? String(sizeRaw).toLowerCase();
	const normalized = SIZE_MAP[size] ?? (["s", "m", "l"].includes(size) ? size : "m");

	// 同时兼容 class 和 className
	const {
		size: _drop,
		class: classAttr,
		className,
		...imgProps
	} = props;

	let customClass = "";
	if (Array.isArray(className)) {
		customClass = className.join(" ");
	} else if (typeof className === "string") {
		customClass = className;
	} else if (typeof classAttr === "string") {
		customClass = classAttr;
	}

	const wrapClass = ["custom-md-img", `custom-md-img--${normalized}`];
	if (customClass) wrapClass.push(customClass);

	return h("div", { class: wrapClass.join(" ") }, [h("img", imgProps)]);
}
