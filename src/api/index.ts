class MockApi {
	private itemName: string;

	constructor(newItemName: string) {
		this.itemName = newItemName;
	}

	private findById (id: number, arr: Array<Employee | Workplace | WorkplaceRequest>) {
		return arr.find(obj => obj.id === id)
	}

	get(id?: number) {
		return new Promise<any>((resolve, reject) => {
			const res = localStorage.getItem(this.itemName);

			if (res) {
				const JSONRes = JSON.parse(res);
				if (id) {
					const item = this.findById(id, JSON.parse(res))
					item ? resolve(item) : reject(new Error(`${this.itemName}/${id} doesn't exist`))					
				}

				resolve(JSONRes)
			}

			reject(new Error(`${this.itemName} doesn't exist`))
		})
	}

	post(body: any) {
		return new Promise<number>((resolve, reject) => {
			this.get().then(items => {
				const id = items.length + 1;
				const newItems = [...items, {...body, id}];
				localStorage.setItem(this.itemName, JSON.stringify(newItems))
				resolve(id)
			})
		})
	}

	put(body: any, id: number) {
		return new Promise<void>((resolve, reject) => {
			this.get().then(items => {
				const newItems = items.map((item: any) => item.id === id ? body : item)
				localStorage.setItem(this.itemName, JSON.stringify(newItems))
				resolve();
			})
		})
	}

	delete(id: number) {
		return new Promise<void>((resolve, reject) => {
			this.get().then(items => {
				const newItems = items.filter((item: any) => item.id !== id)
				localStorage.setItem(this.itemName, JSON.stringify(newItems))
				resolve()
			})
		})
	}
}

const mockFetch = (itemName: string) => new MockApi(itemName);

export default mockFetch;
