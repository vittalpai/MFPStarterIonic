
// Call http://www.jsontest.com/ Mock Service
function getJsonTest() {
	MFP.Logger.warn('--> MFPStarterIonicAdapter getJsonTest')
	
	var input = {
		method: 'get',
		returnedContentType: 'json',
		path: '/'
	};
	return MFP.Server.invokeHttp(input);
}

// Local data mock
function getData() {
	MFP.Logger.warn('--> MFPStarterIonicAdapter getData')
	
	var mock = {
		user: 'MobileFirst User',
		email: 'mfpuser@ibm.com',
		product: 'IBM MobileFirst'
	};
	return mock;
}

// unprotected Hello world
function hello() {
	MFP.Logger.warn('--> MFPStarterIonicAdapter hello')
	
	return { result: "Hello from MFPStarterIonicAdapter" };
}

// send data
// http://mobilefirstplatform.ibmcloud.com/tutorials/en/foundation/8.0/application-development/resource-request/javascript/
// for get:  	resourceRequest.setQueryParameter("params", "['value1', 'value2']");
// for post:  	var formParams = {"params":"['value1', 'value2']"};
//				resourceRequest.sendFormParameters(formParams);
function postData(p1,p2) {
	MFP.Logger.warn('--> MFPStarterIonicAdapter postData')
	MFP.Logger.warn('--> MFPStarterIonicAdapter postData: ' + p1 + ' ' + p2) 
	
	var test = {
		para1: p1,
		para2: p2,
	};
	return test;
}
