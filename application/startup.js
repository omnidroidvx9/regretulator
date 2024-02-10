import { Constants } from './utilities/constants.js';
import { DataUtility } from './utilities/data-utility.js';
import { ElementUtility } from './utilities/element-utility.js';
import { Page } from './page.js';
import { Regretulator } from './regretulator.js';
import { Tmpltr } from './tmpltr.js'
	
let annualReturns = await DataUtility.getJsonAsync('data/sp-500-annual-returns.json');

let domParser = new DOMParser();
let regretulator = new Regretulator();
let page = new Page(ElementUtility, regretulator, annualReturns);
let tmpltr = new Tmpltr(Constants, domParser);

tmpltr.returns = annualReturns;
tmpltr.replaceTokensInLoops(document.body, tmpltr.returns);

page.addCalculateTotalReturns();