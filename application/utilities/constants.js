export class Constants {
	static domParserSupportedTypes = Object.freeze({
		textHtml : "text/html",
		textXml : 'text/xml',
		applicationXml : 'application/xml',
		applicationXhtmlXml : 'application/xhtml+xml',
		imageSvgXml : 'image/svg+xml'
	});
	
	static httpVerbs = Object.freeze({
		delete : 'DELETE',
		get : 'GET',
		patch : 'PATCH',
		post : 'POST',
		put : 'PUT'	
	});
	
	static regularExpressions  = Object.freeze({
		braces : /[{}]/g,
		token : /{.*?}/g
	});
	
	static strings = Object.freeze({
		blankSpace :  ' ',
		dot: '.',
		empty : ''
	});
	
	static tmpltrAttributes = Object.freeze({	
		if : 'data-tmpltr-if',
		for : 'data-tmpltr-for'
	})
} 