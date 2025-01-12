/**
 * # Heading 1
 * 
 *According to MDN – 
  The Promise.all() accepts an array of promises and returns a promise 
  that resolves when all of the promises in the array are fulfilled or when 
  the iterable contains no promises. It rejects with the reason of the first 
  promise that rejects. 
 * 
 
 * 
 * ## Notes
 * After reading the definition of  Promise.all()  we can  break down the 
    problem in sub-problem and tackle it one by one. 
    ●  It will return a promise. 
    ●  The promise will resolve with the result of all the passed 
    promises or reject with the error message of the first failed 
    promise. 
    ●  The results are returned in the same order as the promises are in 
    the given array.
 */

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