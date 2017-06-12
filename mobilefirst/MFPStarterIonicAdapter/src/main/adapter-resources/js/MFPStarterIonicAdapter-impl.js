
// Call http://www.jsontest.com/ Mock Service
function getJsonTest() {
	var input = {
		method: 'get',
		returnedContentType: 'json',
		path: '/'
	};
	return MFP.Server.invokeHttp(input);
}

// Local data mock
function getData() {
	var mock = {
		user: 'Michael Hoffmann',
		email: 'mhoff@de.ibm.com',
		product: 'IBM MobileFirst'
	};
	return mock;
}

// unprotected Hello world
function hello() {
	return { result: "Hello from MFPStarterIonicAdapter" };
}