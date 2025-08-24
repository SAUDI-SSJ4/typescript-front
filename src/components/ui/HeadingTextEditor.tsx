import React, { useEffect, useMemo, useState } from "react";
import { Bold } from "lucide-react";
import { Input } from "@/components/ui/input";

interface HeadingTextEditorProps {
	value?: string; // HTML string like <h1 style="...">Text</h1> or plain text
	onChange: (html: string) => void;
	placeholder?: string;
	disabled?: boolean;
	error?: boolean;
	className?: string;
	name?: string;
	label?: string;
	// Optional fixed tag. Defaults to h1 to keep this editor focused on headings only
	tag?: "h1" | "h2" | "h3";
}

function escapeHtml(unsafe: string): string {
	return unsafe
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/\"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

function parseInitialValue(htmlOrText?: string): { text: string; color: string; fontSize: number; isBold: boolean } {
	if (!htmlOrText) {
		return { text: "", color: "#1f2937", fontSize: 32, isBold: true };
	}

	// If it's an HTML heading, try to parse style and text
	if (/<h[1-3][\s\S]*>/i.test(htmlOrText)) {
		const temp = document.createElement("div");
		temp.innerHTML = htmlOrText;
		const heading = temp.querySelector("h1, h2, h3") as HTMLElement | null;
		if (heading) {
			const style = heading.getAttribute("style") || "";
			const colorMatch = style.match(/color:\s*([^;]+)/i);
			const sizeMatch = style.match(/font-size:\s*(\d+)px/i);
			const weightMatch = style.match(/font-weight:\s*(\d+)/i);
			return {
				text: heading.textContent || "",
				color: colorMatch ? colorMatch[1].trim() : "#1f2937",
				fontSize: sizeMatch ? Number(sizeMatch[1]) : 32,
				isBold: weightMatch ? Number(weightMatch[1]) >= 600 : true,
			};
		}
	}

	// Otherwise treat as plain text
	return { text: htmlOrText, color: "#1f2937", fontSize: 32, isBold: true };
}

const sizeOptions = [16, 18, 20, 24, 28, 32, 40, 48, 56, 64, 72];

const HeadingTextEditor: React.FC<HeadingTextEditorProps> = ({
	value = "",
	onChange,
	placeholder = "اكتب العنوان هنا...",
	disabled = false,
	error = false,
	className = "",
	name,
	label,
	tag = "h1",
}) => {
	const initial = useMemo(() => parseInitialValue(value), [value]);
	const [text, setText] = useState<string>(initial.text);
	const [color, setColor] = useState<string>(initial.color);
	const [fontSize, setFontSize] = useState<number>(initial.fontSize);
	const [isBold, setIsBold] = useState<boolean>(initial.isBold);

	useEffect(() => {
		// Re-parse when external value changes (e.g., editing existing content)
		const parsed = parseInitialValue(value);
		setText(parsed.text);
		setColor(parsed.color);
		setFontSize(parsed.fontSize);
		setIsBold(parsed.isBold);
	}, [value]);

	const emitChange = (nextText = text, nextColor = color, nextSize = fontSize, nextBold = isBold) => {
		const weight = nextBold ? 700 : 400;
		const safeText = escapeHtml(nextText);
		const html = `<${tag} style="font-size: ${nextSize}px; color: ${nextColor}; font-weight: ${weight}; line-height: 1.2; margin: 0;">${safeText}</${tag}>`;
		onChange(html);
	};

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setText(e.target.value);
		emitChange(e.target.value);
	};

	const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setColor(e.target.value);
		emitChange(text, e.target.value);
	};

	const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const next = Number(e.target.value);
		setFontSize(next);
		emitChange(text, color, next);
	};

	const toggleBold = () => {
		setIsBold((prev) => {
			const next = !prev;
			emitChange(text, color, fontSize, next);
			return next;
		});
	};

	return (
		<div className={`w-full ${className}`}>
			{label && (
				<label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
					{label}
				</label>
			)}

			<div className={`border rounded-lg overflow-hidden ${error ? "border-red-500" : "border-gray-300"} ${disabled ? "opacity-50" : ""}`}>
				{/* Toolbar */}
				<div className="bg-gray-50 px-2 py-1.5">
					<div className="flex flex-wrap items-center gap-1">
						{/* Bold */}
						<button
							type="button"
							onClick={toggleBold}
							disabled={disabled}
							className={`p-1.5 text-gray-600 hover:text-blue-600 hover:bg-white rounded transition-colors disabled:cursor-not-allowed`}
							title="عريض"
						>
							<Bold className="w-3 h-3" />
						</button>

						{/* Color (no text label) */}
						<input
							type="color"
							value={color}
							onChange={handleColorChange}
							disabled={disabled}
							className="w-6 h-6 border border-gray-300 rounded cursor-pointer disabled:cursor-not-allowed"
							title="لون العنوان"
						/>

						{/* Size (no text label) */}
						<select
							value={fontSize}
							onChange={handleSizeChange}
							disabled={disabled}
							className="px-2 py-1 text-xs border border-gray-300 rounded bg-white focus:border-blue-500 disabled:cursor-not-allowed"
						>
							{sizeOptions.map((s) => (
								<option key={s} value={s}>{s}px</option>
							))}
						</select>
					</div>
				</div>

				{/* Input (single line) */}
				<div className="relative bg-white">
					<Input
						type="text"
						value={text}
						onChange={handleTextChange}
						disabled={disabled}
						placeholder={placeholder}
						className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-6 py-8"
						style={{
							fontSize: `${fontSize}px`,
							fontWeight: isBold ? 700 as any : 400 as any,
							color,
							lineHeight: 1.2,
							direction: "rtl" as const,
							textAlign: "right" as const,
						}}
						onKeyDown={(e) => {
							// Prevent new lines; keep heading as single line
							if (e.key === "Enter") e.preventDefault();
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default HeadingTextEditor;


