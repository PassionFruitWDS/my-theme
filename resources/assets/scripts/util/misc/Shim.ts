function isCSSStyleSheet(sheet: StyleSheet): sheet is CSSStyleSheet {
	return ((sheet.type === 'text/css')
		&& ((sheet as CSSStyleSheet).insertRule !== undefined)
		&& ((sheet as CSSStyleSheet).removeRule !== undefined)
		&& ((sheet as CSSStyleSheet).cssRules !== undefined)
		&& ((sheet as CSSStyleSheet).ownerRule !== undefined));
}

function isCSSStyleRule(rule: CSSRule): rule is CSSStyleRule {
	return (rule.type === CSSRule.STYLE_RULE);
}

export default class Shim {

	public set height(value: string) {
		this.styleRule.style.height = value;
	}

	protected readonly styleRule: CSSStyleRule;

	public set width(value: string) {
		this.styleRule.style.width = value;
	}

	constructor(parent: HTMLElement, baseStyle: Partial<CSSStyleDeclaration>) {
		if (parent.id === '') {
			throw Error('Parent lacks an element id.');
		}

		const styleElement = document.createElement('style');
		styleElement.setAttribute('style', 'text/css');
		styleElement.setAttribute('rel', 'stylesheet');
		parent.append(styleElement);
		if (isCSSStyleSheet(styleElement.sheet)) {
			const ruleIndex = styleElement.sheet.insertRule('* {}');
			const rule = styleElement.sheet.cssRules[ruleIndex];
			if (isCSSStyleRule(rule)) {
				this.styleRule = rule;
			} else {
				throw TypeError('Expected CSSRule to be of type CSSStyleRule. Error likely caused by incompatible browser DOM implementation.');
			}
		} else {
			throw TypeError('Expected StyleSheet to be of type CSSStyleSheet. Error likely caused by incompatible browser DOM implementation.');
		}

		this.styleRule.selectorText = `#${parent.id}::before`;
		Object.assign(this.styleRule.style, baseStyle);
	}

	public insert(): void {
		this.styleRule.style.content = '""';
	}

	public remove(): void {
		this.styleRule.style.content = '';
	}

	public setSize(
		width: string,
		height: string,
	): void {
		this.width = width;
		this.height = height;
	}

}
