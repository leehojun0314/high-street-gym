import daisyui from 'daisyui';
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				alkatra: ['Alkatra', 'system-ui'],
			},
			backgroundColor: {
				primary: '#65c3c8',
				black: '#000000',
				white: '#ffffff',
				red: '#ff7272',
				grey: '#838383',
			},
			textColor: {
				primary: '#65c3c8',
				black: '#000000',
				white: '#ffffff',
				red: '#ff7272',
				grey: '#838383',
			},
			textDecorationColor: {
				primary: '#65c3c8',
				black: '#000000',
				white: '#ffffff',
				red: '#ff7272',
				grey: '#838383',
			},
		},
	},
	plugins: [daisyui],
	daisyui: {
		themes: ['cupcake'],
	},
};
