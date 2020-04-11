class Fun {
	constructor() {

	}
	navigateTo(url) {
		uni.navigateTo({
			url: url
		})
	}
}

let fun = new Fun();
export default fun;