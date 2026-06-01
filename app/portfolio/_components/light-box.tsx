'use client'

import Color from "colorjs.io";
import { useEffect, useState } from "react";

function getColors(l: number, r: number) {
	l = l * 0.45;
	r = r * 0.45;
	const c = 1.0,
		f = 0.7,
		a = 0.1;

	return {
		box_top: Math.floor(0.5 + 255. * (l + r + a) * c),
		box_left: Math.floor(0.5 + 255. * (l + a) * c),
		box_right: Math.floor(0.5 + 255. * (r + a) * c),
		floor: Math.floor(0.5 + 255. * (l + r + a) * f),
		shadow_left: Math.floor(0.5 + 255. * (l + a) * f),
		shadow_right: Math.floor(0.5 + 255. * (r + a) * f),
		shadow_center: Math.floor(0.5 + 255. * a * f),
	};
}

export default function LightBox() {
	const [leftLuma, setLeftLuma] = useState("0.55");
	const [squareLuma, setSquareLuma] = useState("0.5");
	const [rightLuma, setRightLuma] = useState("1.0");
	const [leftChroma, setLeftChroma] = useState("0.6");
	const [squareChroma, setSquareChroma] = useState("0.5");
	const [rightChroma, setRightChroma] = useState("0.8");
	const [leftHue, setLeftHue] = useState("0.2");
	const [squareHue, setSquareHue] = useState("0.7");
	const [rightHue, setRightHue] = useState("0.85");

	const [leftStop, setLeftStop] = useState("");
	const [rightStop, setRightStop] = useState("");
	const [boxTop, setBoxTop] = useState("");
	const [boxLeft, setBoxLeft] = useState("");
	const [boxRight, setBoxRight] = useState("");
	const [floor, setFloor] = useState("");
	const [shadowLeft, setShadowLeft] = useState("");
	const [shadowCenter, setShadowCenter] = useState("");
	const [shadowRight, setShadowRight] = useState("");
	const [square, setSquare] = useState("");

	useEffect(() => {
		const v_leftLuma = 100. * parseFloat(leftLuma);
		const v_squareLuma = 100. * parseFloat(squareLuma);
		const v_rightLuma = 100. * parseFloat(rightLuma);
		const v_leftChroma = 100. * parseFloat(leftChroma);
		const v_squareChroma = 100. * parseFloat(squareChroma);
		const v_rightChroma = 100. * parseFloat(rightChroma);
		const v_leftHue = 360 * parseFloat(leftHue);
		const v_squareHue = 360 * parseFloat(squareHue);
		const v_rightHue = 360 * parseFloat(rightHue);

		const left = new Color("lch", [v_leftLuma, v_leftChroma, v_leftHue]);
		const right = new Color("lch", [v_rightLuma, v_rightChroma, v_rightHue]);
		const square = new Color("lch", [
			v_squareLuma,
			v_squareChroma,
			v_squareHue,
		]);

    // biome-ignore lint: non-null
		const reds = getColors(left.srgb_linear.r!, right.srgb_linear.r!);
    // biome-ignore lint: non-null
		const greens = getColors(left.srgb_linear.g!, right.srgb_linear.g!);
    // biome-ignore lint: non-null
		const blues = getColors(left.srgb_linear.b!, right.srgb_linear.b!);

		setLeftStop(left.toString());
		setRightStop(right.toString());
		setBoxLeft(`rgb(${reds.box_left} ${greens.box_left} ${blues.box_left})`);
		setBoxTop(`rgb(${reds.box_top} ${greens.box_top} ${blues.box_top})`);
		setBoxRight(
			`rgb(${reds.box_right} ${greens.box_right} ${blues.box_right})`,
		);
		setFloor(`rgb(${reds.floor} ${greens.floor} ${blues.floor})`);
		setShadowLeft(
			`rgb(${reds.shadow_left} ${greens.shadow_left} ${blues.shadow_left})`,
		);
		setShadowCenter(
			`rgb(${reds.shadow_center} ${greens.shadow_center} ${blues.shadow_center})`,
		);
		setShadowRight(
			`rgb(${reds.shadow_right} ${greens.shadow_right} ${blues.shadow_right})`,
		);

		setSquare(square.toString());
	}, [
		leftLuma,
		squareLuma,
		rightLuma,
		leftChroma,
		squareChroma,
		rightChroma,
		leftHue,
		squareHue,
		rightHue,
	]);

	return (
		<div className="bg-black pb-8">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				id="svg"
				version="1.1"
				viewBox="0 0 150 100"
			>
				<title>A diagram of two lights shining onto a box.</title>
				<defs id="defs4918">
					<linearGradient id="linearGradient5055">
						<stop
							id="left_stop"
							offset="0"
							stopColor={leftStop}
							stopOpacity={1}
						/>
						<stop
							id="stop5053"
							offset="1"
							stopColor="#000000"
							stopOpacity={0}
						/>
					</linearGradient>
					<linearGradient id="linearGradient5047">
						<stop
							id="right_stop"
							offset="0"
							stopColor={rightStop}
							stopOpacity={1}
						/>
						<stop
							id="stop5045"
							offset="1"
							stopColor="#000000"
							stopOpacity={0}
						/>
					</linearGradient>
					<linearGradient
						gradientUnits="userSpaceOnUse"
						y2="66.724945"
						x2="87.664406"
						y1="3.5157015"
						x1="97.286102"
						id="linearGradient5049"
						xlinkHref="#linearGradient5047"
					/>
					<linearGradient
						gradientUnits="userSpaceOnUse"
						y2="67.660385"
						x2="63.743786"
						y1="0.84300601"
						x1="47.841244"
						id="linearGradient5057"
						xlinkHref="#linearGradient5055"
					/>
					<clipPath id="clipPath6292" clipPathUnits="userSpaceOnUse">
						<ellipse
							ry="13.898015"
							rx="44.166286"
							cy="81.424767"
							cx="76.50589"
							id="mask"
							fill="#531515"
							strokeWidth={0}
						/>
					</clipPath>
				</defs>

				<g transform="translate(-30.238091,-82.473221)" id="background">
					<rect
						y="82.473221"
						x="30.238091"
						height="100"
						width="150"
						id="rect4926"
						fill="#000000"
						strokeWidth={0}
					/>
				</g>

				<g id="floor_group">
					<ellipse
						ry="13.8"
						rx="44.0"
						cy="81.424767"
						cx="76.50589"
						id="floor"
						fill={floor}
						strokeWidth={0}
					/>
				</g>

				<g id="layer10">
					<path
						clipPath="url(#clipPath6292)"
						id="shadow_left"
						d="M 60.670183,71.001257 22.985179,83.295653 32.606882,94.120069 75.370006,98.797286 92.93957,76.272392 Z"
						fill={shadowLeft}
						fillOpacity={0.97989953}
						stroke="#000000"
						strokeWidth={0}
						strokeLinecap="butt"
						strokeLinejoin="miter"
						strokeOpacity={1}
						opacity={1}
					/>
					<path
						clipPath="url(#clipPath6292)"
						id="shadow_right"
						d="M 91.861081,71.657661 129.54609,83.952057 119.92439,94.776473 77.161264,99.45369 59.591694,76.928796 Z"
						fill={shadowRight}
						fillOpacity={1}
						stroke="#000000"
						strokeWidth={0}
						strokeLinecap="butt"
						strokeLinejoin="miter"
						strokeOpacity={1}
					/>
					<path
						id="shadow_middle"
						clipPath="url(#clipPath6292)"
						d="M 59.591693,76.928794 92.93957,76.272392 75.370006,98.797286 Z"
						fill={shadowCenter}
						fillOpacity={1}
						stroke="#000000"
						strokeWidth={0}
						strokeLinecap="butt"
						strokeLinejoin="miter"
						strokeOpacity={1}
					/>
				</g>

				<g id="layer7">
					<g id="g4936" fill="#00ffff" strokeWidth={0}>
						<path
							id="box_top"
							d="M 59.591694,59.869521 76.34928,64.563683 92.939572,59.342257 76.314694,56.113726 Z"
							fill={boxTop}
							fillRule="evenodd"
							stroke="none"
							strokeLinejoin="round"
						/>
						<path
							id="box_right"
							d="M 76.28,64.563683 V 85.130257 L 92.939572,76.272392 V 59.342257 Z"
							fill={boxRight}
							fillRule="evenodd"
							stroke="none"
							strokeLinejoin="round"
						/>
						<path
							id="box_left"
							d="M 59.591694,59.869521 76.34928,64.563683 L 76.39928,85.130257 L 59.591694,76.928796 Z"
							fill={boxLeft}
							fillRule="evenodd"
							stroke="none"
							strokeLinejoin="round"
						/>
					</g>
					<path
						id="square_left"
						d="M 69.594864,75.289805 64.44494,73.30543 v -5.858629 l 5.197171,1.653646 z"
						fill={square}
						fillOpacity={1}
						stroke="#000000"
						strokeWidth={0}
						strokeLinecap="butt"
						strokeLinejoin="miter"
						strokeOpacity={1}
					/>
					<path
						id="square_right"
						d="m 82.692772,75.102499 0.01383,-5.937611 5.269722,-1.880094 -0.02771,5.470868 z"
						fill={square}
						fillOpacity={1}
						stroke="#000000"
						strokeWidth={0}
						strokeLinecap="butt"
						strokeLinejoin="miter"
						strokeOpacity={1}
					/>
				</g>

				<g id="layer8">
					<path
						id="path5026"
						d="M 9.2207986,10.999248 32.205977,81.959306 c 0,0 2.405425,8.018087 21.247928,11.225321 18.8425,3.207234 31.270535,2.138156 39.689524,1.202714 8.418991,-0.935445 21.515201,-4.677217 26.192411,-9.354434 C 124.01306,80.35569 115.99497,75.0103 115.99497,75.0103 L 17.907058,8.0592831 c 0,0 -3.741773,-3.8754081 -7.082642,-2.1381561 -3.3408694,1.7372518 -1.6036174,5.078121 -1.6036174,5.078121 z"
						fill="url(#linearGradient5057)"
						fillOpacity={1}
						stroke="#000000"
						strokeWidth={0}
						strokeLinecap="butt"
						strokeLinejoin="miter"
						strokeOpacity={1}
					/>
					<path
						id="path5026-7"
						d="m 144.16402,11.14785 -22.98518,70.960057 c 0,0 -2.40542,8.018089 -21.247927,11.225321 -18.8425,3.207231 -31.270535,2.138161 -39.689524,1.202716 -8.418991,-0.935444 -21.515206,-4.677219 -26.192416,-9.354436 -4.67721,-4.677217 3.34087,-10.022607 3.34087,-10.022607 L 135.47776,8.207885 c 0,0 3.74177,-3.8754084 7.08264,-2.138156 3.34087,1.737252 1.60362,5.078121 1.60362,5.078121 z"
						fill="url(#linearGradient5049)"
						fillOpacity={1}
						stroke="#000000"
						strokeWidth={0}
						strokeLinecap="butt"
						strokeLinejoin="miter"
						strokeOpacity={1}
					/>
				</g>
			</svg>

			<br />
			<div className="grid grid-cols-[auto_1fr_1fr_1fr] items-center gap-x-4 gap-y-2 px-4 text-white mx-4">
				<div />
				<div className="text-center font-medium">Left Lamp</div>
				<div className="text-center font-medium">Squares</div>
				<div className="text-center font-medium">Right Lamp</div>

				<div className="font-medium">Luma</div>
				<input
					type="range"
					min="0.0"
					max="1.0"
					step="0.01"
					value={leftLuma}
					onChange={(v) => setLeftLuma(v.target.value)}
				/>
				<input
					type="range"
					min="0.0"
					max="1.0"
					step="0.01"
					value={squareLuma}
					onChange={(v) => setSquareLuma(v.target.value)}
				/>
				<input
					type="range"
					min="0.0"
					max="1.0"
					step="0.01"
					value={rightLuma}
					onChange={(v) => setRightLuma(v.target.value)}
				/>

				<div className="font-medium">Chroma</div>
				<input
					type="range"
					min="0.0"
					max="1.0"
					step="0.01"
					value={leftChroma}
					onChange={(v) => setLeftChroma(v.target.value)}
				/>
				<input
					type="range"
					min="0.0"
					max="1.0"
					step="0.01"
					value={squareChroma}
					onChange={(v) => setSquareChroma(v.target.value)}
				/>
				<input
					type="range"
					min="0.0"
					max="1.0"
					step="0.01"
					value={rightChroma}
					onChange={(v) => setRightChroma(v.target.value)}
				/>

				<div className="font-medium">Hue</div>
				<input
					type="range"
					min="0.0"
					max="1.0"
					step="0.01"
					value={leftHue}
					onChange={(v) => setLeftHue(v.target.value)}
				/>
				<input
					type="range"
					min="0.0"
					max="1.0"
					step="0.01"
					value={squareHue}
					onChange={(v) => setSquareHue(v.target.value)}
				/>
				<input
					type="range"
					min="0.0"
					max="1.0"
					step="0.01"
					value={rightHue}
					onChange={(v) => setRightHue(v.target.value)}
				/>
			</div>
		</div>
	);
}
