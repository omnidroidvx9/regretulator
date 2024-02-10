export class DataUtility {    
    static async getJsonAsync(url) { 
        let data = await fetch(url);
        let json = await data.json();

        return json;
    }

    static async getDocumentAsync(url, domParserSupportedType) { 
        let data = await fetch(url);
        let htmlString = await data.text();
        let document = new DOMParser().parseFromString(htmlString, domParserSupportedType);

        return document;
    }
}