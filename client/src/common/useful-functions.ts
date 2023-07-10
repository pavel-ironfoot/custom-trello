export const calculateTotalTime = (input: string): string => {
  const trimmedInput: string = input.replace(/^,/, '');
  const values: string[] = trimmedInput.split(',');

  let totalMinutes = 0;
  let totalHours = 0;
  let totalDays = 0;
  let totalMonths = 0;

  values.forEach((value: string) => {
    const [minutes, hours, days, months]: number[] = value.split(':').map(Number);
    totalMinutes += minutes;
    totalHours += hours;
    totalDays += days;
    totalMonths += months;
  });

  totalHours += Math.floor(totalMinutes / 60);
  totalMinutes %= 60;
  totalDays += Math.floor(totalHours / 24);
  totalHours %= 24;
  totalMonths += Math.floor(totalDays / 30);
  totalDays %= 30;

  const result: string = `${totalMinutes}:${totalHours}:${totalDays}:${totalMonths}`;

  return result;
};

export const checkSingleIdProperty = (obj:any) => {
  let count = 0;
  
  for (const key in obj) {
    if (key) {
      count++;
      if (count > 1) {
        return false;
      }
    }
  }
  
  return count === 1;
}


export const showCreationalDate = (miliseconds:number):string =>{
  const date = new Date(miliseconds);
  const min = date.getMinutes();
  const hours = date.getHours();

  const days = date.getDate();
  const month = date.getMonth()+1;
  const year = date.getFullYear();

  const dateToShow = `${min}:${hours} ${days}.${month}.${year}`;

  return dateToShow;
}

export const calculateTimeElapsed=(milliseconds: number): string => {
  const currentDate = new Date();
  const targetDate = new Date(milliseconds);

  const elapsedMilliseconds = currentDate.getTime() - targetDate.getTime();

  const minutes = Math.floor(elapsedMilliseconds / (1000 * 60)) % 60;
  const hours = Math.floor(elapsedMilliseconds / (1000 * 60 * 60)) % 24;
  const days = Math.floor(elapsedMilliseconds / (1000 * 60 * 60 * 24)) % 30;
  const months = Math.floor(elapsedMilliseconds / (1000 * 60 * 60 * 24 * 30));

  const formattedTime = `${minutes}:${hours}:${days}:${months}`;

  return formattedTime;
}

export const calculateTimeRemaining =(startDate: number, taskDuration: string): string=> {
  const currentDate = new Date();
  const startDateObj = new Date(startDate);

  const elapsedMilliseconds = currentDate.getTime() - startDateObj.getTime();
  const taskDurationParts = taskDuration.split(':');

  const taskMonths = parseInt(taskDurationParts[3], 10);
  const taskDays = parseInt(taskDurationParts[2], 10);
  const taskHours = parseInt(taskDurationParts[1], 10);
  const taskMinutes = parseInt(taskDurationParts[0], 10);

  const remainingMilliseconds =
    taskMonths * 30 * 24 * 60 * 60 * 1000 +
    taskDays * 24 * 60 * 60 * 1000 +
    taskHours * 60 * 60 * 1000 +
    taskMinutes * 60 * 1000 -
    elapsedMilliseconds;

  if (remainingMilliseconds < 0) {
    return "0:0:0:0";
  }

  const remainingMinutes = Math.floor(remainingMilliseconds / (1000 * 60)) % 60;
  const remainingHours = Math.floor(remainingMilliseconds / (1000 * 60 * 60)) % 24;
  const remainingDays = Math.floor(remainingMilliseconds / (1000 * 60 * 60 * 24)) % 30;
  const remainingMonths = Math.floor(remainingMilliseconds / (1000 * 60 * 60 * 24 * 30));

  const formattedTime = `${remainingMinutes}:${remainingHours}:${remainingDays}:${remainingMonths}`;

  return formattedTime;
}

export const getRandomColor=():string =>{
  const n1 = Math.floor(Math.random() * 256);
  const n2 = Math.floor(Math.random() * 256);
  const n3 = Math.floor(Math.random() * 256);
  const res = `rgb(${n1}, ${n2}, ${n3})`
  return res;
}

export const calculateAllRemaining=(posts:any)=>{
  let allrem = '';
  posts.map((elem:any) => {
    const remainingTime = calculateTimeRemaining(elem.timeNow, elem.duedate);
    allrem = allrem + ',' + remainingTime;
  })
  const alltime = calculateTotalTime(allrem)
  return alltime;
}

export const calculateAllEstimated = (posts:any) =>{
  let allest = '';
  posts.map((elem:any) => {
    const estimatedTime = calculateTimeElapsed(elem.timeNow);
    allest = allest + ',' + estimatedTime;
  })
  const allestimatedTime = calculateTotalTime(allest);
  return allestimatedTime;
}