export const base64ToHex = (str: string): string => {
	const hex:string[] = [];

	for (let i = 0, bin = atob(str.replace(/[ \r\n]+$/, "")); i < bin.length; ++i) {
		let tmp = bin.charCodeAt(i).toString(16);
		if (tmp.length === 1) tmp = "0" + tmp;
		hex[hex.length] = tmp;
	}

	return hex.join("");
};

type EnumItem = { title: string; value: number };

export function getStringFromEnum(id: number | string, array: EnumItem[]): string | undefined {
    const getObj = array.find((item) => item.value === id);
    return getObj?.title;
}