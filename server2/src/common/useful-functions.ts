export const mergeObjects = (obj1: any, obj2: any) => {
    const result = { ...obj1 };

    for (const prop in obj2) {
        if (obj2.hasOwnProperty(prop) && obj2[prop] !== '') {
            result[prop] = obj2[prop];
        }
    }
    return result;
}

export const getCurrentTime = (): string => {
    const currentDate: Date = new Date();
    const currentMinutes: number = currentDate.getMinutes();
    const currentHours: number = currentDate.getHours();
    const currentDays: number = currentDate.getDate();
    const currentMonths: number = currentDate.getMonth() + 1;

    const currentTime: string = `${currentMinutes}:${currentHours}:${currentDays}:${currentMonths}`;

    return currentTime;
}