interface Employee {
	id: number
	name: string
	role: string
	birthDate: Date
	accessCode?: string
}

interface Time {
	hours: number
	minutes: number
}

interface Workplace {
	id: number
	name: string
	employee: Employee | null
	devices: string[]
	isRemote: boolean
	opensAt: Time
	closesAt: Time
}

interface WorkplaceRequest {
	id: number
	name: string
	birthDate: Date
	role: string
	workplaceId: number
}

type ResponseSchemas = Employee | Workplace | WorkplaceRequest