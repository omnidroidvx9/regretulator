export class Tmpltr {	
	constructor(constants, domParser) {
		this.constants = constants;
		this.domParser = domParser;
	}	

	createElementWithTokensReplaced(html, tokens, tokenValues) {
		let element;		
			
		for (let i = 0; i < tokens.length; i++) {							
			html = this.replaceToken(html, tokens[i], tokenValues[i]);
			element = this.domParser.parseFromString(html, this.constants.domParserSupportedTypes.textHtml).body.firstElementChild;				
		}	
		
		return element;
	}		
	
	elementHasLoop(element) {		
		return element.dataset.tmpltrFor ? true : false;
	}	

	executeLoop(element, array) {				
		let loop = element.dataset.tmpltrFor;			
		let itemName = loop.split(this.constants.strings.blankSpace).at(1);		
		let tokens = this.getTokens(element);		
		let tokensWithoutBraces = tokens.map((token) => this.removeBraces(token));
		let parentElement = element.parentElement;			
		
		element.removeAttribute(this.constants.tmpltrAttributes.for);		
		parentElement.removeChild(element);		

		for (let item of array) {									
			let tokensWithObjectNameReplaced = tokensWithoutBraces.map((token) => token.replaceAll(itemName, Object.keys({item})[0]));				
			let tokenValues = tokensWithObjectNameReplaced.map((token) => { try { return eval(token); } catch { return `{${token}}`; }}); 						
			let html = this.getOuterHtml(element);	
			let newElement = this.createElementWithTokensReplaced(html, tokens, tokenValues);									
			let elementsWithLoop = this.getElementsWithLoop(newElement, []);	

			parentElement.append(newElement);		
			this.executeLoops(elementsWithLoop, item);		
		}				
	}			

	executeLoops(elements, object) {		
		for(let element of elements) {				
			let propertyName = this.getArrayNameFromLoop(element);
			let array = object[propertyName];
						
			this.executeLoop(element, array); 							
		}
	}	

	getArrayNameFromLoop(element) {
		return element.dataset.tmpltrFor.split(this.constants.strings.dot).at(-1);
	}

	getElementsWithLoop(element, elements) {
		for(let child of element.children) {			
			this.tryAddElementWithLoopToArray(child, elements)	
		}

		return elements;
	}	

	getOuterHtml(element) {
		return element.outerHTML;
	}
	
	getTokens(element) {			
		return element.outerHTML.match(this.constants.regularExpressions.token); 
	}	

	getTokenValue(token) {		
		let tokenWithoutBraces = this.removeBraces(token);
		let tokenValue = this.tryGetTokenValue(token, tokenWithoutBraces);					

		return tokenValue;
	}	
	
	removeBraces(token) {		
		return token.replace(this.constants.regularExpressions.braces, this.constants.strings.empty);
	}		

	replaceToken(html, token, tokenValue) {	
		return html.replace(token, tokenValue);				
	}	

	replaceTokens(element) {			
		let tokens = this.getTokens(element);				
		let html = this.getOuterHtml(element);	

		for(let token of tokens) {				
			let tokenValue = this.getTokenValue(token);
			html = this.replaceToken(html, token, tokenValue);
		}			
		
		element.outerHTML = html;		
	}		

	replaceTokensInLoops(element, array) {	
		let elementsWithLoop = this.getElementsWithLoop(element, []);	
		
		for(let elementWithLoop of elementsWithLoop) {			
			this.executeLoop(elementWithLoop, array);				
		}	
	}	

	tryAddElementWithLoopToArray(element, elements) {
		if(this.elementHasLoop(element)) {
			elements.push(element);			
		} 
		
		this.getElementsWithLoop(element, elements);
	}	

	tryGetTokenValue(token, tokenWithoutBraces) {			
		try {			
			return eval(tokenWithoutBraces);
		} catch {			
			return token;
		}			
	}				
}