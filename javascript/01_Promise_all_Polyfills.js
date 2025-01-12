function _promiseAll(tasksList) {
    const result = [];
    let taskCompleted = 0;

    return new Promise((resolve, reject) => {
        tasksList.forEach((task, index) => {
            task.then(res => {
                result[index] = res;
                taskCompleted += 1;

                if (taskCompleted === tasksList.length) {
                    resolve(result);
                }

            }).catch(err => {
                reject(err);
            })

        })
    })
}

function task(delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (delay <= 500) {
                reject(delay);
            } else {
                resolve(delay);
            }
        }, delay * 1);
    })
}
const tasksList = [task(1000), task(2000), task(500)];

_promiseAll(tasksList).then(result => {
    console.log('Success!', result);
}).catch(err => {
    console.log('Reject', err);
})