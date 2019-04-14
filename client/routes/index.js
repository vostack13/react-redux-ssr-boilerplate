import Auth from '';

export default [
	{
		path: '/',
		exact: true,
		...Auth,

		// routes: [
		// 	{
		// 		...LogIn
		// 	}
		// ]
	},
];