const initialEmployees : Array<Employee> = [
	{
		id: 1,
		name: 'Зубенко Михаил Петрович',
		role: 'администратор',
		birthDate: new Date(1989, 10, 22),
		accessCode: '567890'
	},

	{
		id: 2,
		name: 'Никулина Екатерина Марсельевна',
		role: 'сотрудник',
		birthDate: new Date(1999, 2, 18),
		accessCode: '153629'
	},

	{
		id: 3,
		name: 'Вишняков Максим Платонович',
		role: 'сотрудник',
		birthDate: new Date(1998, 1, 17)
	}
]

const initialWorkplaces : Array<Workplace> = [
	{
		id: 1,
		name: 'Первое Рабочее место',
		employee: initialEmployees[0],
		devices: [],
		isRemote: false,
		opensAt: {
			hours: 9,
			minutes: 0
		},
		closesAt: {
			hours: 18,
			minutes: 0
		},
	},

	{
		id: 2,
		name: 'Второе Рабочее место',
		employee: null,
		devices: [],
		isRemote: false,
		opensAt: {
			hours: 12,
			minutes: 0
		},
		closesAt: {
			hours: 22,
			minutes: 0
		},
	},

	{
		id: 3,
		name: 'Третье Рабочее место',
		employee: initialEmployees[1],
		devices: [],
		isRemote: false,
		opensAt: {
			hours: 8,
			minutes: 0
		},
		closesAt: {
			hours: 19,
			minutes: 0
		},
	},

	{
		id: 4,
		name: 'Четвёртое Рабочее место',
		employee: null,
		devices: [],
		isRemote: false,
		opensAt: {
			hours: 10,
			minutes: 0
		},
		closesAt: {
			hours: 19,
			minutes: 0
		},
	},
	{
		id: 1,
		name: 'Первое Рабочее место',
		employee: initialEmployees[0],
		devices: [],
		isRemote: false,
		opensAt: {
			hours: 9,
			minutes: 0
		},
		closesAt: {
			hours: 18,
			minutes: 0
		},
	},

	{
		id: 2,
		name: 'Второе Рабочее место',
		employee: null,
		devices: [],
		isRemote: false,
		opensAt: {
			hours: 12,
			minutes: 0
		},
		closesAt: {
			hours: 22,
			minutes: 0
		},
	},

	{
		id: 3,
		name: 'Третье Рабочее место',
		employee: initialEmployees[1],
		devices: [],
		isRemote: false,
		opensAt: {
			hours: 8,
			minutes: 0
		},
		closesAt: {
			hours: 19,
			minutes: 0
		},
	},

	{
		id: 4,
		name: 'Четвёртое Рабочее место',
		employee: null,
		devices: [],
		isRemote: false,
		opensAt: {
			hours: 10,
			minutes: 0
		},
		closesAt: {
			hours: 19,
			minutes: 0
		},
	},
	{
		id: 1,
		name: 'Первое Рабочее место',
		employee: initialEmployees[0],
		devices: [],
		isRemote: false,
		opensAt: {
			hours: 9,
			minutes: 0
		},
		closesAt: {
			hours: 18,
			minutes: 0
		},
	},

	{
		id: 2,
		name: 'Второе Рабочее место',
		employee: null,
		devices: [],
		isRemote: false,
		opensAt: {
			hours: 12,
			minutes: 0
		},
		closesAt: {
			hours: 22,
			minutes: 0
		},
	},

	{
		id: 3,
		name: 'Третье Рабочее место',
		employee: initialEmployees[1],
		devices: [],
		isRemote: false,
		opensAt: {
			hours: 8,
			minutes: 0
		},
		closesAt: {
			hours: 19,
			minutes: 0
		},
	},

	{
		id: 4,
		name: 'Четвёртое Рабочее место',
		employee: null,
		devices: [],
		isRemote: false,
		opensAt: {
			hours: 10,
			minutes: 0
		},
		closesAt: {
			hours: 19,
			minutes: 0
		},
	}
]

const initialRequests : Array<WorkplaceRequest> = [

]

const hashAccessCodes = () => new Promise<string[]>((resolve) => {
	const worker = new window.Worker('./hash-worker.js')
	const hashes: string[] = []

	worker.onmessage = (event: MessageEvent<string>) => {
		hashes.push(event.data)
		if (hashes.length === initialEmployees.length) {
			resolve(hashes)
			worker.terminate()
		}
	}

	for (const employee of initialEmployees) {
		worker.postMessage(employee.accessCode)
	}
})

const initializeLocalStorage = () => {
	if (!localStorage.getItem('__DID_PAGE_EVER_LOAD__')) {
		hashAccessCodes().then(hashes => {
			const employeesWithHashes = initialEmployees.map((employee, index) => ({
				...employee, accessCode: employee.accessCode ? hashes[index] : undefined 
			}))
			localStorage.setItem('employees', JSON.stringify(employeesWithHashes))
		})
		
		localStorage.setItem('workplaces', JSON.stringify(initialWorkplaces))
		localStorage.setItem('requests', JSON.stringify(initialRequests))

		localStorage.setItem(
			'__DID_PAGE_EVER_LOAD__',
			'aHR0cHM6Ly9lbmNyeXB0ZWQtdGJuMC5nc3RhdGljLmNvbS9pbWFnZXM/cT10Ym46QU5kOUdjUWlGYms5emVyOHJwUkF1WVRiLVgzQjhRX0p3bkJ3cFg4N1N0M2JzSjdDRzBUQmVydExIcW9rUHBQM1RRajRWeS1fSXVNJnVzcXA9Q0FV'
		)
	}
}

export default initializeLocalStorage
