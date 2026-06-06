// Generates the brand Lottie animations used on the case-study pages.
// Run with: node scripts/gen-lottie.mjs
// Output: public/lottie/samora-voice.json, public/lottie/openinapp-links.json
//
// Authored programmatically so keyframe structures stay valid. These mirror
// the motifs built in LottieFiles Creator (audio equalizer + orbiting links).

import { writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, '..', 'public', 'lottie');
mkdirSync(outDir, { recursive: true });

// Electric cobalt brand accent (hsl(226 100% 66%) -> rgb 82,122,255) normalized.
const BRAND = [0.322, 0.478, 1, 1];
const BRAND_DIM = [0.298, 0.357, 0.78, 1];

// Smooth in/out easing handles shared across keyframes.
const EASE_IO = { i: { x: [0.5], y: [1] }, o: { x: [0.5], y: [0] } };

/** Build an animated property `k` array from [{ t, s }] frames with easing. */
function kf(frames) {
	return frames.map((f, idx) =>
		idx === frames.length - 1
			? { t: f.t, s: f.s }
			: { t: f.t, s: f.s, ...EASE_IO }
	);
}

const stat = (k) => ({ a: 0, k });
const anim = (k) => ({ a: 1, k });

function transform({ p = [0, 0], a = [0, 0], s = [100, 100], r = 0, o = 100 } = {}) {
	return {
		ty: 'tr',
		p: stat(p),
		a: stat(a),
		s: stat(s),
		r: stat(r),
		o: stat(o),
		sk: stat(0),
		sa: stat(0),
		nm: 'tr',
	};
}

function shapeLayer({ ind, nm, ks, shapes, op, parent }) {
	const layer = {
		ddd: 0,
		ind,
		ty: 4,
		nm,
		sr: 1,
		ks: {
			o: ks.o ?? stat(100),
			r: ks.r ?? stat(0),
			p: ks.p ?? stat([0, 0, 0]),
			a: ks.a ?? stat([0, 0, 0]),
			s: ks.s ?? stat([100, 100, 100]),
		},
		ao: 0,
		shapes,
		ip: 0,
		op,
		st: 0,
		bm: 0,
	};
	if (parent != null) layer.parent = parent;
	return layer;
}

function comp({ nm, w, h, op, layers }) {
	return {
		v: '5.7.4',
		fr: 30,
		ip: 0,
		op,
		w,
		h,
		nm,
		ddd: 0,
		assets: [],
		layers,
		markers: [],
	};
}

/* ----------------------------- Samora: voice ----------------------------- */
// A clean audio equalizer: bars that breathe like a live waveform. Each bar
// returns to its start height at the loop boundary, so the loop is seamless.
function samoraVoice() {
	const W = 320;
	const H = 200;
	const OP = 48;
	const baseY = 150;
	const barW = 16;
	const gap = 12;
	const barH = 120; // drawn height; scaled via layer.s.y
	const heights = [0.32, 0.62, 0.95, 0.55, 0.85, 0.45, 0.7];
	const peaks = [0.85, 0.42, 0.55, 0.95, 0.4, 0.78, 0.5];
	const peakAt = [16, 24, 12, 28, 20, 14, 26];
	const count = heights.length;
	const totalW = count * barW + (count - 1) * gap;
	const startX = (W - totalW) / 2 + barW / 2;

	const layers = heights.map((lo, i) => {
		const x = startX + i * (barW + gap);
		const loPct = lo * 100;
		const hiPct = peaks[i] * 100;
		return shapeLayer({
			ind: i + 1,
			nm: `bar-${i + 1}`,
			op: OP,
			ks: {
				p: stat([x, baseY, 0]),
				a: stat([0, 0, 0]),
				s: anim(
					kf([
						{ t: 0, s: [100, loPct, 100] },
						{ t: peakAt[i], s: [100, hiPct, 100] },
						{ t: OP, s: [100, loPct, 100] },
					])
				),
			},
			shapes: [
				{
					ty: 'gr',
					nm: `bar-grp-${i + 1}`,
					it: [
						{
							ty: 'rc',
							d: 1,
							s: stat([barW, barH]),
							p: stat([0, -barH / 2]),
							r: stat(barW / 2),
							nm: 'rect',
						},
						{
							ty: 'gf',
							o: stat(100),
							r: 1,
							t: 1,
							s: stat([0, -barH]),
							e: stat([0, 0]),
							g: {
								p: 3,
								k: stat([
									0, BRAND[0], BRAND[1], BRAND[2],
									0.5, BRAND[0], BRAND[1], BRAND[2],
									1, BRAND_DIM[0], BRAND_DIM[1], BRAND_DIM[2],
								]),
							},
							nm: 'grad',
						},
						transform(),
					],
				},
			],
		});
	});

	return comp({ nm: 'Samora Voice', w: W, h: H, op: OP, layers });
}

/* --------------------------- OpenInApp: links ---------------------------- */
// A central app tile with three link-nodes orbiting it on connecting spokes.
// Rotation 0 -> 360 loops perfectly; the core gently pulses.
function openinappLinks() {
	const W = 300;
	const H = 300;
	const OP = 120;
	const cx = W / 2;
	const cy = H / 2;
	const radius = 96;

	// Orbit group: one rotating layer holding 3 spokes + 3 nodes.
	const orbitShapes = [];
	for (let i = 0; i < 3; i++) {
		const ang = (i * 120 * Math.PI) / 180;
		const nx = Math.cos(ang) * radius;
		const ny = Math.sin(ang) * radius;
		// spoke (thin line center -> node)
		orbitShapes.push({
			ty: 'gr',
			nm: `spoke-${i + 1}`,
			it: [
				{
					ty: 'sh',
					d: 1,
					ks: stat({
						c: false,
						v: [
							[0, 0],
							[nx, ny],
						],
						i: [
							[0, 0],
							[0, 0],
						],
						o: [
							[0, 0],
							[0, 0],
						],
					}),
					nm: 'path',
				},
				{
					ty: 'st',
					c: stat(BRAND),
					o: stat(34),
					w: stat(2),
					lc: 2,
					lj: 2,
					nm: 'stroke',
				},
				transform(),
			],
		});
	}
	for (let i = 0; i < 3; i++) {
		const ang = (i * 120 * Math.PI) / 180;
		const nx = Math.cos(ang) * radius;
		const ny = Math.sin(ang) * radius;
		orbitShapes.push({
			ty: 'gr',
			nm: `node-${i + 1}`,
			it: [
				{
					ty: 'el',
					d: 1,
					s: stat([22, 22]),
					p: stat([nx, ny]),
					nm: 'dot',
				},
				{ ty: 'fl', c: stat(BRAND), o: stat(100), nm: 'fill' },
				transform(),
			],
		});
	}

	const orbit = shapeLayer({
		ind: 1,
		nm: 'orbit',
		op: OP,
		ks: {
			p: stat([cx, cy, 0]),
			a: stat([0, 0, 0]),
			r: anim(
				kf([
					{ t: 0, s: [0] },
					{ t: OP, s: [360] },
				]).map((k, idx, arr) =>
					// linear rotation for a constant spin
					idx === arr.length - 1
						? k
						: { ...k, i: { x: [1], y: [1] }, o: { x: [0], y: [0] } }
				)
			),
		},
		shapes: orbitShapes,
	});

	// Faint static guide ring.
	const ring = shapeLayer({
		ind: 2,
		nm: 'guide-ring',
		op: OP,
		ks: { p: stat([cx, cy, 0]) },
		shapes: [
			{
				ty: 'gr',
				nm: 'ring-grp',
				it: [
					{
						ty: 'el',
						d: 1,
						s: stat([radius * 2, radius * 2]),
						p: stat([0, 0]),
						nm: 'ring',
					},
					{
						ty: 'st',
						c: stat(BRAND),
						o: stat(16),
						w: stat(1.5),
						lc: 1,
						lj: 1,
						nm: 'stroke',
					},
					transform(),
				],
			},
		],
	});

	// Pulsing core tile.
	const core = shapeLayer({
		ind: 3,
		nm: 'core',
		op: OP,
		ks: {
			p: stat([cx, cy, 0]),
			a: stat([0, 0, 0]),
			s: anim(
				kf([
					{ t: 0, s: [100, 100, 100] },
					{ t: 60, s: [112, 112, 100] },
					{ t: OP, s: [100, 100, 100] },
				])
			),
		},
		shapes: [
			{
				ty: 'gr',
				nm: 'core-grp',
				it: [
					{
						ty: 'rc',
						d: 1,
						s: stat([54, 54]),
						p: stat([0, 0]),
						r: stat(16),
						nm: 'tile',
					},
					{ ty: 'fl', c: stat(BRAND), o: stat(100), nm: 'fill' },
					transform(),
				],
			},
		],
	});

	// Expanding emanation ring from the core (opacity returns to 0 -> seamless).
	const pulse = shapeLayer({
		ind: 4,
		nm: 'pulse',
		op: OP,
		ks: {
			p: stat([cx, cy, 0]),
			a: stat([0, 0, 0]),
			o: anim(
				kf([
					{ t: 0, s: [60] },
					{ t: 40, s: [0] },
					{ t: OP, s: [0] },
				])
			),
			s: anim(
				kf([
					{ t: 0, s: [40, 40, 100] },
					{ t: 40, s: [150, 150, 100] },
					{ t: OP, s: [150, 150, 100] },
				])
			),
		},
		shapes: [
			{
				ty: 'gr',
				nm: 'pulse-grp',
				it: [
					{
						ty: 'el',
						d: 1,
						s: stat([60, 60]),
						p: stat([0, 0]),
						nm: 'ring',
					},
					{
						ty: 'st',
						c: stat(BRAND),
						o: stat(100),
						w: stat(3),
						lc: 1,
						lj: 1,
						nm: 'stroke',
					},
					transform(),
				],
			},
		],
	});

	// Render order: core + nodes on top, guide ring + pulse behind.
	return comp({
		nm: 'OpenInApp Links',
		w: W,
		h: H,
		op: OP,
		layers: [orbit, core, ring, pulse],
	});
}

const targets = [
	['samora-voice.json', samoraVoice()],
	['openinapp-links.json', openinappLinks()],
];

for (const [name, data] of targets) {
	const path = join(outDir, name);
	writeFileSync(path, JSON.stringify(data));
	console.log('wrote', path);
}
