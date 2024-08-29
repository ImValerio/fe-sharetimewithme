interface Schedule {
    instanceId: string
    username: string
    binaryWeeks: string[]
    backupWeeks?: string[]
    creationDate?: string
}

interface GenerateInstance {
    instanceId: string
}